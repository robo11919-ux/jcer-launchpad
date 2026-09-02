import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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

export function useRealtimeControl({ onCommand, isScreen = false }: Options = {}) {
  const [row, setRow] = useState<LaunchControlRow | null>(null);
  const [connected, setConnected] = useState(false);
  const [screenOnline, setScreenOnline] = useState(false);
  const lastSequence = useRef<number | null>(null);
  const handler = useRef(onCommand);
  handler.current = onCommand;

  const dispatch = useCallback((next: LaunchControlRow, initial: boolean) => {
    setRow(next);
    if (initial) {
      // Never replay a command that happened before this client connected.
      lastSequence.current = next.sequence_id;
      return;
    }
    if (lastSequence.current === next.sequence_id) return;
    lastSequence.current = next.sequence_id;
    handler.current?.(next.command, next.sequence_id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const { data } = await supabase
        .from("launch_control")
        .select("*")
        .eq("id", LAUNCH_ROW_ID)
        .maybeSingle();
      if (!cancelled && data) dispatch(data as LaunchControlRow, true);
    })();

    const channel = supabase
      .channel("launch-control")
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

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, [dispatch]);

  // Screen heartbeat
  useEffect(() => {
    if (!isScreen) return;
    const beat = () => {
      void supabase
        .from("launch_control")
        .update({ screen_last_seen: new Date().toISOString() })
        .eq("id", LAUNCH_ROW_ID);
    };
    beat();
    const timer = setInterval(beat, HEARTBEAT_MS);
    return () => clearInterval(timer);
  }, [isScreen]);

  // Presence evaluation (controller side)
  useEffect(() => {
    const evaluate = () => {
      const seen = row?.screen_last_seen;
      setScreenOnline(
        !!seen && Date.now() - new Date(seen).getTime() < PRESENCE_TIMEOUT_MS,
      );
    };
    evaluate();
    const timer = setInterval(evaluate, 2000);
    return () => clearInterval(timer);
  }, [row?.screen_last_seen]);

  const sendCommand = useCallback(
    async (command: LaunchCommand) => {
      const nextSequence = (row?.sequence_id ?? 0) + 1;
      // Optimistically block local replay of our own command echo.
      const { error } = await supabase
        .from("launch_control")
        .update({
          command,
          sequence_id: nextSequence,
          updated_at: new Date().toISOString(),
        })
        .eq("id", LAUNCH_ROW_ID);
      return !error;
    },
    [row?.sequence_id],
  );

  return { row, connected, screenOnline, sendCommand };
}
