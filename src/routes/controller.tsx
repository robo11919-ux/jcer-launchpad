import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Radio, RotateCcw, Rocket, X, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useRealtimeControl } from "@/hooks/useRealtimeControl";
import { TOTAL_DURATION } from "@/lib/launch";

export const Route = createFileRoute("/controller")({
  head: () => ({
    meta: [
      { title: "Launch Control | JCER Admission ERP" },
      {
        name: "description",
        content:
          "Official mobile launch control panel for the inauguration of the JCER Admission ERP System.",
      },
      { property: "og:title", content: "JCER Admission ERP — Official Launch Control" },
      {
        property: "og:description",
        content: "Mobile control panel used to officially launch the JCER Admission ERP System.",
      },
    ],
  }),
  component: Controller,
});

type Stage = "READY" | "LAUNCHING" | "COMPLETED";

function Controller() {
  const [stage, setStage] = useState<Stage>("READY");
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmLaunch, setConfirmLaunch] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { connected, screenOnline, sendCommand } = useRealtimeControl();

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const doLaunch = async () => {
    setConfirmLaunch(false);
    setStage("LAUNCHING");
    const ok = await sendCommand("LAUNCH");
    if (!ok) {
      setStage("READY");
      return;
    }
    timer.current = setTimeout(() => setStage("COMPLETED"), TOTAL_DURATION);
  };

  const doReset = async () => {
    setConfirmReset(false);
    setMenuOpen(false);
    if (timer.current) clearTimeout(timer.current);
    await sendCommand("RESET");
    setStage("READY");
  };

  return (
    <main className="min-h-screen bg-navy text-ceremony-light">
      <header className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
            Jain College of Engineering &amp; Research
          </p>
          <h1 className="mt-2 text-xl font-extrabold tracking-tight">JCER ADMISSION ERP</h1>
          <p className="text-sm text-ceremony-light/60">Official Launch Control</p>
        </div>
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="rounded-xl border border-white/15 p-2.5"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <section className="px-5 py-6">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
          <span
            className={`h-3 w-3 rounded-full ${
              stage === "COMPLETED"
                ? "bg-gold"
                : screenOnline && connected
                  ? "bg-emerald-400"
                  : "bg-red-400"
            }`}
          />
          <div>
            <p className="text-sm font-bold uppercase tracking-wider">
              {stage === "LAUNCHING"
                ? "Launch in Progress"
                : stage === "COMPLETED"
                  ? "System Officially Launched"
                  : screenOnline
                    ? "System Ready"
                    : "Awaiting Launch Screen"}
            </p>
            <p className="text-xs text-ceremony-light/60">
              {screenOnline ? "Launch Display Connected" : "Launch Display Not Connected"}
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <AnimatePresence mode="wait">
            {stage === "COMPLETED" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl border border-gold/40 bg-white/5 px-6 py-12"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
                  <Check className="h-8 w-8 text-gold" />
                </div>
                <p className="mt-5 text-lg font-extrabold uppercase tracking-wide">
                  System Officially Launched
                </p>
                <p className="mt-2 text-sm text-ceremony-light/60">Live ERP Portal Active</p>
              </motion.div>
            ) : (
              <motion.button
                key="launch"
                disabled={stage === "LAUNCHING"}
                onClick={() => setConfirmLaunch(true)}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full overflow-hidden rounded-3xl px-6 py-14 text-2xl font-extrabold uppercase tracking-[0.16em] shadow-[0_20px_60px_rgba(30,78,140,0.55)] disabled:opacity-70"
                style={{
                  backgroundColor: "var(--institutional)",
                  border: "1px solid rgba(201,162,39,0.5)",
                }}
              >
                {stage === "LAUNCHING" ? (
                  <span className="flex flex-col items-center gap-4">
                    Launch in Progress
                    <span className="h-1.5 w-48 overflow-hidden rounded-full bg-white/20">
                      <motion.span
                        className="block h-full bg-gold"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: TOTAL_DURATION / 1000, ease: "linear" }}
                      />
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <Rocket className="h-6 w-6" /> Launch System
                  </span>
                )}
              </motion.button>
            )}
          </AnimatePresence>

          <p className="mt-6 text-xs text-ceremony-light/40">
            One press starts the full ceremony sequence.
          </p>
        </div>
      </section>

      {/* Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              className="absolute right-0 top-0 h-full w-72 border-l border-white/10 bg-navy p-5"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-widest text-gold">Menu</p>
                <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-8 space-y-2">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-left text-sm font-semibold"
                >
                  <Rocket className="h-4 w-4 text-gold" /> Launch Control
                </button>
                <button
                  onClick={() => setConfirmReset(true)}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-left text-sm font-semibold"
                >
                  <RotateCcw className="h-4 w-4 text-gold" /> Reset Ceremony
                </button>
                <Link
                  to="/status"
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-left text-sm font-semibold"
                >
                  <Radio className="h-4 w-4 text-gold" /> System Status
                </Link>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm launch */}
      <Modal
        open={confirmLaunch}
        title="Confirm Official Launch"
        body="Are you ready to launch the JCER Admission ERP System?"
        confirmLabel="🚀 Launch Now"
        onCancel={() => setConfirmLaunch(false)}
        onConfirm={doLaunch}
      />

      {/* Confirm reset */}
      <Modal
        open={confirmReset}
        title="Reset Ceremony"
        body="Are you sure you want to reset the official launch ceremony? This will return the launch screen to its initial state."
        confirmLabel="Reset Ceremony"
        onCancel={() => setConfirmReset(false)}
        onConfirm={doReset}
      />
    </main>
  );
}

function Modal({
  open,
  title,
  body,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm rounded-3xl bg-white p-6 text-navy"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
          >
            <h3 className="text-lg font-extrabold">{title}</h3>
            <p className="mt-2 text-sm text-navy/70">{body}</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl border border-navy/15 py-3 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl py-3 text-sm font-bold text-white"
                style={{ backgroundColor: "var(--institutional)" }}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
