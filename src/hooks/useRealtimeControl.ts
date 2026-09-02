import { useCallback, useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import {
  HEARTBEAT_MS,
  LAUNCH_ROW_ID,
  PRESENCE_TIMEOUT_MS,
  type LaunchCommand,
  type LaunchControlRow,
} from "@/lib/launch";

interface Options {
  /** Fired once per distinct sequence_id for a LAUNCH/RESET command. */
  onCommand?: (command: LaunchCommand, sequenceId: number) => void;
  /** When true, this client publishes a heartbeat as the launch screen. */
  isScreen?: boolean;
}

export type SyncMode = "CLOUD_REALTIME" | "LOCAL_BROADCAST";

export function useRealtimeControl({ onCommand, isScreen = false }: Options = {}) {
  const [row, setRow] = useState<LaunchControlRow | null>(null);
  const [connected, setConnected] = useState(false);
  const [screenOnline, setScreenOnline] = useState(false);
  const lastSequence = useRef<number | null>(null);
  const handler = useRef(onCommand);
  handler.current = onCommand;

  const syncMode: SyncMode = isSupabaseConfigured ? "CLOUD_REALTIME" : "LOCAL_BROADCAST";

  const dispatch = useCallback((next: LaunchControlRow, initial: boolean) => {
    setRow(next);
    if (initial) {
      // Never replay an old command that occurred before this client mounted.
      lastSequence.current = next.sequence_id;
      return;
    }
    if (lastSequence.current === next.sequence_id) return;
    lastSequence.current = next.sequence_id;
    handler.current?.(next.command, next.sequence_id);
  }, []);

  // 1. Local BroadcastChannel backup (for same-device cross-tab testing)
  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) return;
    const bc = new BroadcastChannel("jcer-launch-sync");

    bc.onmessage = (event) => {
      const data = event.data as { type: string; payload: LaunchControlRow; timestamp?: string };
      if (data?.type === "CONTROL_UPDATE" && data.payload) {
        dispatch(data.payload, false);
      } else if (data?.type === "SCREEN_HEARTBEAT" && !isScreen) {
        setScreenOnline(true);
      }
    };

    return () => {
      bc.close();
    };
  }, [dispatch, isScreen]);

  // 2. Supabase Cloud Realtime Channel (Primary cross-device synchronization)
  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    let cancelled = false;

    // Initial state query from Supabase Postgres
    void (async () => {
      try {
        const { data, error } = await supabase
          .from("launch_control")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (!cancelled && data && !error) {
          dispatch(data as LaunchControlRow, true);
        }
      } catch (err) {
        console.warn("[RealtimeControl] Initial state fetch error:", err);
      }
    })();

    // Subscribe to Postgres Realtime changes on launch_control
    let channel: ReturnType<typeof supabase.channel> | null = null;
    try {
      channel = supabase
        .channel("launch-control-realtime")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "launch_control" },
          (payload) => {
            const next = payload.new as LaunchControlRow;
            if (!next?.id) return;
            dispatch(next, false);
          },
        )
        .subscribe((status) => {
          setConnected(status === "SUBSCRIBED");
        });
    } catch (err) {
      console.warn("[RealtimeControl] Realtime subscription error:", err);
    }

    return () => {
      cancelled = true;
      if (channel) {
        void supabase.removeChannel(channel);
      }
    };
  }, [dispatch]);

  // 3. Screen Heartbeat publisher (every 4 seconds)
  useEffect(() => {
    if (!isScreen) return;

    const beat = async () => {
      const now = new Date().toISOString();

      // Local broadcast beat
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        try {
          const bc = new BroadcastChannel("jcer-launch-sync");
          bc.postMessage({ type: "SCREEN_HEARTBEAT", timestamp: now });
          bc.close();
        } catch {}
      }

      // Cloud Supabase beat
      if (isSupabaseConfigured) {
        try {
          const rowId = row?.id ?? LAUNCH_ROW_ID;
          await supabase
            .from("launch_control")
            .update({ screen_last_seen: now })
            .eq("id", rowId as any);
        } catch (err) {
          console.warn("[Heartbeat] Screen heartbeat update notice:", err);
        }
      }
    };

    beat();
    const timer = setInterval(beat, HEARTBEAT_MS);
    return () => clearInterval(timer);
  }, [isScreen, row?.id]);

  // 4. Controller Heartbeat evaluator (now - screen_last_seen < 15 seconds)
  useEffect(() => {
    const evaluate = () => {
      const seen = row?.screen_last_seen;
      if (seen) {
        const diff = Date.now() - new Date(seen).getTime();
        setScreenOnline(diff < PRESENCE_TIMEOUT_MS);
      }
    };

    evaluate();
    const timer = setInterval(evaluate, 2000);
    return () => clearInterval(timer);
  }, [row?.screen_last_seen]);

  // 5. Send Command Action (Principal Controller trigger)
  const sendCommand = useCallback(
    async (command: LaunchCommand) => {
      const nextSequence = (row?.sequence_id ?? 0) + 1;
      const now = new Date().toISOString();
      const rowId = row?.id ?? LAUNCH_ROW_ID;

      const updatedRow: LaunchControlRow = {
        id: rowId,
        command,
        sequence_id: nextSequence,
        screen_last_seen: row?.screen_last_seen ?? null,
        updated_at: now,
      };

      // 1. Broadcast locally for instant local dev tabs
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        try {
          const bc = new BroadcastChannel("jcer-launch-sync");
          bc.postMessage({ type: "CONTROL_UPDATE", payload: updatedRow });
          bc.close();
        } catch {}
      }

      // 2. Primary: Update Supabase Postgres to trigger Realtime on all remote devices
      if (isSupabaseConfigured) {
        try {
          const { error } = await supabase
            .from("launch_control")
            .update({
              command,
              sequence_id: nextSequence,
              updated_at: now,
            })
            .eq("id", rowId as any);

          if (error) {
            console.warn("[RealtimeControl] DB update fallback upsert:", error);
            await supabase.from("launch_control").upsert(updatedRow as any);
          }
          return true;
        } catch (err) {
          console.error("[RealtimeControl] Error sending command to Supabase:", err);
          return true;
        }
      }

      return true;
    },
    [row?.id, row?.sequence_id, row?.screen_last_seen],
  );

  return {
    row,
    connected,
    screenOnline,
    syncMode,
    isCloudConfigured: isSupabaseConfigured,
    sendCommand,
  };
}
