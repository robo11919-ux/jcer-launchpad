import { createFileRoute } from "@tanstack/react-router";
import { Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";

import { RealisticCurtain } from "@/components/ceremony/RealisticCurtain";
import { CountdownTimer } from "@/components/ceremony/CountdownTimer";
import { FlowerPetals } from "@/components/ceremony/FlowerPetals";
import { useLaunchSequence } from "@/hooks/useLaunchSequence";
import { useRealtimeControl } from "@/hooks/useRealtimeControl";
import { LIVE_ERP_URL } from "@/lib/launch";
import { isBrowserFullscreen, toggleBrowserFullscreen } from "@/lib/fullscreen";

export const Route = createFileRoute("/screen")({
  head: () => ({
    meta: [
      { title: "Inauguration Ceremony | JCER Admission ERP" },
      {
        name: "description",
        content:
          "Official stage curtain inauguration ceremony for the JCER Admission ERP System.",
      },
      {
        property: "og:title",
        content: "JCER Admission ERP — Official Inauguration",
      },
      {
        property: "og:description",
        content:
          "Auditorium theatre curtain launch display for the JCER Admission ERP.",
      },
    ],
  }),
  component: LaunchScreen,
});

function LaunchScreen() {
  const {
    phase,
    isCurtainOpen,
    isCelebrating,
    setIframeReady,
    startLaunch,
    handleCurtainsFullyOpened,
    handleCelebrationComplete,
    reset,
  } = useLaunchSequence();

  const [isFullscreen, setIsFullscreen] = useState(false);

  // Synchronize fullscreen state across all standard & vendor-prefixed browser events
  useEffect(() => {
    const updateFsState = () => {
      setIsFullscreen(isBrowserFullscreen());
    };

    updateFsState();

    document.addEventListener("fullscreenchange", updateFsState);
    document.addEventListener("webkitfullscreenchange", updateFsState);
    document.addEventListener("mozfullscreenchange", updateFsState);
    document.addEventListener("MSFullscreenChange", updateFsState);

    return () => {
      document.removeEventListener("fullscreenchange", updateFsState);
      document.removeEventListener("webkitfullscreenchange", updateFsState);
      document.removeEventListener("mozfullscreenchange", updateFsState);
      document.removeEventListener("MSFullscreenChange", updateFsState);
    };
  }, []);

  // Direct user-gesture click handler for Fullscreen
  const handleToggleFullscreen = async () => {
    await toggleBrowserFullscreen();
  };

  // Supabase Realtime synchronization with Sequence ID deduplication
  useRealtimeControl({
    isScreen: true,
    onCommand: (command) => {
      if (command === "LAUNCH") {
        startLaunch();
      } else if (command === "RESET" || command === "READY") {
        reset();
      }
    },
  });

  // Emergency keyboard shortcuts (Space to launch, R to reset, F to toggle fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        if (phase === "READY") {
          startLaunch();
        }
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        reset();
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        void toggleBrowserFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, startLaunch, reset]);

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-black select-none font-sans cursor-default">
      {/* Layer 1 — The Actual Live Admission ERP Website */}
      <iframe
        src={LIVE_ERP_URL}
        title="JCER Admission ERP System"
        className="absolute inset-0 h-full w-full border-0 z-10"
        onLoad={() => setIframeReady(true)}
        allow="fullscreen; clipboard-read; clipboard-write"
      />

      {/* Layer 2 — Realistic Red Theatre Stage Curtains */}
      <RealisticCurtain
        open={isCurtainOpen}
        onOpenComplete={handleCurtainsFullyOpened}
      />

      {/* Layer 3 — Premium 5-Second Circular Countdown Timer */}
      <CountdownTimer active={phase === "COUNTDOWN"} />

      {/* Layer 4 — Post-Reveal Elegant Flower Petals Celebration Shower */}
      <FlowerPetals
        active={isCelebrating}
        onCelebrationEnd={handleCelebrationComplete}
      />

      {/* Pure Subtle Icon Fullscreen Control (Zero border/background, opacity: 0.3 -> 1 on hover) */}
      <button
        type="button"
        onClick={handleToggleFullscreen}
        aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        className="absolute top-5 right-5 z-50 p-2 bg-transparent border-none shadow-none outline-none opacity-30 hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
      >
        {isFullscreen ? (
          <Minimize2 className="h-5 w-5 text-cyan-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
        ) : (
          <Maximize2 className="h-5 w-5 text-cyan-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
        )}
      </button>
    </main>
  );
}
