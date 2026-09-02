import { motion } from "framer-motion";
import { Check, CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { TIMINGS, TOTAL_DURATION } from "@/lib/launch";

interface CeremonyProgressProps {
  stage: "READY" | "LAUNCHING" | "COMPLETED";
}

const STEPS = [
  { id: 1, label: "10-Second Countdown", duration: TIMINGS.countdown },
  { id: 2, label: "Grand Theatre Curtain Opening", duration: TIMINGS.curtain },
  { id: 3, label: "Inaugural Flower Petal Celebration", duration: TIMINGS.celebration },
  { id: 4, label: "ERP Portal Live On Screen", duration: 0 },
];

export function CeremonyProgress({ stage }: CeremonyProgressProps) {
  const isLaunching = stage === "LAUNCHING";
  const isCompleted = stage === "COMPLETED";

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (!isLaunching) {
      if (isCompleted) setActiveStepIndex(STEPS.length);
      else setActiveStepIndex(0);
      return;
    }

    // Step milestone timers
    const t1 = TIMINGS.countdown;
    const t2 = t1 + TIMINGS.curtain;
    const t3 = t2 + TIMINGS.celebration;

    const timer1 = setTimeout(() => setActiveStepIndex(1), t1);
    const timer2 = setTimeout(() => setActiveStepIndex(2), t2);
    const timer3 = setTimeout(() => setActiveStepIndex(3), t3);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isLaunching, isCompleted]);

  if (stage === "READY") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0D1B2A]/90 p-4 sm:p-5 shadow-xl backdrop-blur-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
          ) : (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </motion.div>
          )}
          <h4 className="text-xs font-black uppercase tracking-wider text-white">
            {isCompleted
              ? "Ceremony Successfully Concluded"
              : "Ceremony Sequence Active"}
          </h4>
        </div>
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
          {isCompleted ? "100% COMPLETE" : "IN PROGRESS"}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 sm:mt-4 h-1.5 w-full overflow-hidden rounded-full bg-black/40 border border-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-[#D4AF37] to-[#22C55E]"
          initial={{ width: "0%" }}
          animate={{ width: isCompleted ? "100%" : "100%" }}
          transition={
            isLaunching
              ? { duration: TOTAL_DURATION / 1000, ease: "linear" }
              : { duration: 0.5 }
          }
        />
      </div>

      {/* Steps List */}
      <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
        {STEPS.map((step, index) => {
          const isDone = isCompleted || activeStepIndex > index;
          const isCurrent = isLaunching && activeStepIndex === index;

          return (
            <div
              key={step.id}
              className={`flex items-center justify-between rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs transition-colors ${
                isCurrent
                  ? "bg-[#12243A] border border-cyan-400/40 text-cyan-200"
                  : isDone
                    ? "text-[#F8FAFC]/90"
                    : "text-[#94A3B8]/40"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-black ${
                    isDone
                      ? "bg-[#22C55E] text-black"
                      : isCurrent
                        ? "bg-cyan-400 text-black animate-pulse"
                        : "bg-white/10 text-white/50"
                  }`}
                >
                  {isDone ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : step.id}
                </span>
                <span className={`font-semibold truncate ${isCurrent ? "text-white" : ""}`}>
                  {step.label}
                </span>
              </div>

              <span className="shrink-0 text-[9px] sm:text-[10px] uppercase tracking-wider font-bold">
                {isDone ? (
                  <span className="text-[#22C55E]">Done</span>
                ) : isCurrent ? (
                  <span className="text-cyan-400 animate-pulse">Running</span>
                ) : (
                  <span className="text-white/30">Queued</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
