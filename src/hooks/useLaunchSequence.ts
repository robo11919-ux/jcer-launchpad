import { useCallback, useEffect, useRef, useState } from "react";
import { TIMINGS, type ScreenPhase } from "@/lib/launch";

export function useLaunchSequence() {
  const [phase, setPhase] = useState<ScreenPhase>("READY");
  const [iframeReady, setIframeReady] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setPhase("READY");
  }, [clearTimers]);

  const startLaunch = useCallback(() => {
    clearTimers();
    // 1. Enter 5-second circular countdown phase
    setPhase("COUNTDOWN");

    // 2. When countdown finishes (5.5s), start opening the curtains
    after(TIMINGS.countdown, () => {
      setPhase("OPENING_CURTAIN");
    });
  }, [after, clearTimers]);

  // Direct animation event: Immediately called when curtains reach 100% open
  const handleCurtainsFullyOpened = useCallback(() => {
    setPhase("CELEBRATING");
  }, []);

  // Direct celebration event: Called when 5.5s petal shower concludes
  const handleCelebrationComplete = useCallback(() => {
    setPhase("LIVE");
  }, []);

  // Clean up timers on unmount
  useEffect(() => clearTimers, [clearTimers]);

  const isCurtainOpen =
    phase === "OPENING_CURTAIN" ||
    phase === "CELEBRATING" ||
    phase === "LIVE";

  const isCelebrating = phase === "CELEBRATING";

  return {
    phase,
    isCurtainOpen,
    isCelebrating,
    iframeReady,
    setIframeReady,
    startLaunch,
    handleCurtainsFullyOpened,
    handleCelebrationComplete,
    reset,
  };
}
