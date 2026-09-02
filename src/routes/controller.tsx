import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { ControllerHeader } from "@/components/controller/ControllerHeader";
import { ConnectionStatus } from "@/components/controller/ConnectionStatus";
import { PhysicalLaunchButton } from "@/components/controller/PhysicalLaunchButton";
import { CeremonyProgress } from "@/components/controller/CeremonyProgress";
import { CeremonyStatus } from "@/components/controller/CeremonyStatus";
import { ResetControl } from "@/components/controller/ResetControl";
import { FullscreenControl } from "@/components/controller/FullscreenControl";
import { useRealtimeControl } from "@/hooks/useRealtimeControl";
import { TOTAL_DURATION } from "@/lib/launch";

export const Route = createFileRoute("/controller")({
  head: () => ({
    meta: [
      { title: "Launch Controller | JCER Admission ERP" },
      {
        name: "description",
        content:
          "Official executive remote-control console for the inauguration of the JCER Admission ERP System.",
      },
      {
        property: "og:title",
        content: "JCER Admission ERP — Official Launch Control",
      },
      {
        property: "og:description",
        content:
          "Executive mobile remote control for the JCER Admission ERP launch ceremony.",
      },
    ],
  }),
  component: Controller,
});

type Stage = "READY" | "LAUNCHING" | "COMPLETED";

function Controller() {
  const [stage, setStage] = useState<Stage>("READY");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { row, connected, screenOnline, syncMode, isCloudConfigured, sendCommand } =
    useRealtimeControl({
      onCommand: (command) => {
        if (command === "RESET" || command === "READY") {
          if (timer.current) clearTimeout(timer.current);
          setStage("READY");
          setIsSubmitting(false);
        }
      },
    });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // ONE PRESS = IMMEDIATE LAUNCH
  const handleImmediateLaunch = async () => {
    if (stage === "LAUNCHING" || isSubmitting) return;

    setIsSubmitting(true);
    setStage("LAUNCHING");

    try {
      // 1. Send launch command immediately via Supabase Realtime
      const ok = await sendCommand("LAUNCH");
      if (!ok) {
        setStage("READY");
        setIsSubmitting(false);
        return;
      }

      // 2. Schedule completion state after ceremony duration
      timer.current = setTimeout(() => {
        setStage("COMPLETED");
        setIsSubmitting(false);
      }, TOTAL_DURATION);
    } catch (err) {
      console.error("[Controller] Immediate launch error:", err);
      setStage("READY");
      setIsSubmitting(false);
    }
  };

  const handleResetCeremony = async () => {
    if (timer.current) clearTimeout(timer.current);
    await sendCommand("RESET");
    setStage("READY");
    setIsSubmitting(false);
  };

  const currentPhaseName =
    stage === "LAUNCHING"
      ? "ACTIVE"
      : stage === "COMPLETED"
        ? "LIVE"
        : row?.command === "LAUNCH"
          ? "ACTIVE"
          : "READY";

  return (
    <main className="min-h-[100dvh] w-full bg-[#07111F] text-[#F8FAFC] flex flex-col justify-between selection:bg-[#D4AF37]/30 font-sans overflow-x-hidden">
      {/* Top Header */}
      <ControllerHeader
        onResetClick={() => handleResetCeremony()}
        screenOnline={screenOnline}
      />

      {/* Main Console Container */}
      <div className="mx-auto w-full max-w-lg px-4 sm:px-5 py-3 sm:py-5 flex-1 flex flex-col justify-between space-y-4 sm:space-y-6">
        {/* 1. Connection Status Strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ConnectionStatus
            screenOnline={screenOnline}
            connected={connected}
            isCloudConfigured={isCloudConfigured}
            stage={stage}
          />
        </motion.div>

        {/* 2. Main Centerpiece: 3D Physical Launch Button (Direct Single Action) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center justify-center my-auto py-1 sm:py-3 w-full"
        >
          <PhysicalLaunchButton
            onPress={handleImmediateLaunch}
            disabled={!screenOnline && isCloudConfigured && !connected}
            stage={stage}
          />
        </motion.div>

        {/* 3. Realtime Sequence Progress (Visible during Launch & Completion) */}
        <CeremonyProgress stage={stage} />

        {/* 4. Fullscreen Controls (Prominent Fullscreen Toggle & Combined Launch) */}
        <FullscreenControl
          onLaunchInFullscreen={handleImmediateLaunch}
          disabled={stage === "LAUNCHING" || isSubmitting}
        />

        {/* 5. Telemetry Status Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <CeremonyStatus
            currentPhase={currentPhaseName}
            sequenceId={row?.sequence_id ?? 0}
            syncMode={syncMode}
            screenOnline={screenOnline}
          />
        </motion.div>

        {/* 6. Secondary Reset Control */}
        <div className="pt-1 pb-1">
          <ResetControl
            onConfirmReset={handleResetCeremony}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#07111F]/90 px-4 sm:px-5 py-2.5 sm:py-3 text-center text-[9px] sm:text-[10px] text-[#94A3B8]">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-2">
          <span className="truncate">JCER ERP Launch Control · Direct Action Console</span>
          <span className="shrink-0 flex items-center gap-1 sm:gap-1.5 font-bold uppercase tracking-wider text-[#D4AF37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            {syncMode === "CLOUD_REALTIME" ? "REALTIME" : "LOCAL"}
          </span>
        </div>
      </footer>
    </main>
  );
}
