import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import portalAsset from "@/assets/jcer-portal-reveal.png.asset.json";
import { ActivationEffect } from "@/components/ceremony/ActivationEffect";
import { Curtain } from "@/components/ceremony/Curtain";
import { CurtainTitle } from "@/components/ceremony/CurtainTitle";
import { LaunchOverlay } from "@/components/ceremony/LaunchOverlay";
import { Particles } from "@/components/ceremony/Particles";
import { useRealtimeControl } from "@/hooks/useRealtimeControl";
import { LIVE_ERP_URL, TIMINGS, type ScreenPhase } from "@/lib/launch";

export const Route = createFileRoute("/screen")({
  head: () => ({
    meta: [
      { title: "Launch Screen | JCER Admission ERP Ceremony" },
      {
        name: "description",
        content:
          "Cinematic LED-screen launch experience for the official inauguration of the JCER Admission ERP System.",
      },
      { property: "og:title", content: "JCER Admission ERP — Official Launch Screen" },
      {
        property: "og:description",
        content: "Full-screen ceremony display for the JCER Admission ERP launch.",
      },
    ],
  }),
  component: LaunchScreen,
});

function LaunchScreen() {
  const [phase, setPhase] = useState<ScreenPhase>("READY");
  const [iframeReady, setIframeReady] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setShowIframe(false);
    setIframeReady(false);
    setPhase("READY");
  }, [clearTimers]);

  const startLaunch = useCallback(() => {
    clearTimers();
    setPhase("ACTIVATING");

    const tCurtain = TIMINGS.activation;
    const tReveal = tCurtain + TIMINGS.curtain;
    const tAnnounce = tReveal + TIMINGS.reveal;
    const tLive = tAnnounce + TIMINGS.announcement;

    after(tCurtain, () => {
      setPhase("OPENING_CURTAIN");
      setShowIframe(true); // begin loading live site behind the screenshot
    });
    after(tReveal, () => setPhase("REVEAL"));
    after(tAnnounce, () => setPhase("OFFICIALLY_LAUNCHED"));
    after(tLive, () => setPhase("LIVE"));
  }, [after, clearTimers]);

  const { row } = useRealtimeControl({
    isScreen: true,
    onCommand: (command) => {
      if (command === "LAUNCH") startLaunch();
      if (command === "RESET" || command === "READY") reset();
    },
  });

  useEffect(() => clearTimers, [clearTimers]);

  // Emergency keyboard backup (technical team only)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (phase === "READY") startLaunch();
      }
      if (e.key.toLowerCase() === "r") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, startLaunch, reset]);

  // Fallback: if the live site cannot be embedded, navigate the browser to it.
  useEffect(() => {
    if (phase !== "LIVE") return;
    if (iframeReady) return;
    const t = setTimeout(() => {
      if (!iframeReady) window.location.href = LIVE_ERP_URL;
    }, TIMINGS.transition + 4000);
    return () => clearTimeout(t);
  }, [phase, iframeReady]);

  const curtainOpen =
    phase === "OPENING_CURTAIN" ||
    phase === "REVEAL" ||
    phase === "OFFICIALLY_LAUNCHED" ||
    phase === "LIVE";

  const liveVisible = phase === "LIVE" && iframeReady;

  return (
    <main className="fixed inset-0 overflow-hidden bg-navy text-ceremony-light select-none">
      {/* Layer 1 — live ERP website (loads hidden, fades in last) */}
      {showIframe && (
        <motion.iframe
          src={LIVE_ERP_URL}
          title="JCER Admission ERP"
          className="absolute inset-0 h-full w-full border-0"
          style={{ zIndex: 20 }}
          onLoad={() => setIframeReady(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: liveVisible ? 1 : 0 }}
          transition={{ duration: TIMINGS.transition / 1000, ease: "easeInOut" }}
        />
      )}

      {/* Layer 2 — static portal screenshot revealed behind the curtain */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ opacity: liveVisible ? 0 : 1 }}
        transition={{ duration: TIMINGS.transition / 1000, ease: "easeInOut" }}
      >
        <img
          src={portalAsset.url}
          alt="JCER Digital Portal landing page"
          className="h-full w-full object-cover object-top"
          draggable={false}
        />
      </motion.div>

      {/* Layer 3 — theatre curtains */}
      <Curtain open={curtainOpen} />

      {/* Ambient ready-state details */}
      <AnimatePresence>
        {phase === "READY" && (
          <motion.div
            key="ambient"
            className="absolute inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Particles />
          </motion.div>
        )}
      </AnimatePresence>

      <CurtainTitle visible={phase === "READY"} />
      <ActivationEffect active={phase === "ACTIVATING"} />
      <LaunchOverlay visible={phase === "OFFICIALLY_LAUNCHED"} />

      {/* Invisible diagnostics for the technical team */}
      <span className="pointer-events-none absolute bottom-1 right-2 z-[60] text-[10px] text-white/5">
        {phase} · seq {row?.sequence_id ?? "-"}
      </span>
    </main>
  );
}
