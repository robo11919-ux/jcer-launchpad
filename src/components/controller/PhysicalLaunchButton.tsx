import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

interface PhysicalLaunchButtonProps {
  onPress: () => void;
  disabled?: boolean;
  stage: "READY" | "LAUNCHING" | "COMPLETED";
}

export function PhysicalLaunchButton({
  onPress,
  disabled = false,
  stage,
}: PhysicalLaunchButtonProps) {
  const isLaunching = stage === "LAUNCHING";
  const isCompleted = stage === "COMPLETED";

  return (
    <div className="relative flex flex-col items-center justify-center py-2 sm:py-4 select-none w-full max-w-xs sm:max-w-sm mx-auto">
      {/* Ambient Pulsing Glow on Floor/Surface */}
      <motion.div
        className="pointer-events-none absolute h-56 w-56 sm:h-72 sm:w-72 rounded-full"
        style={{
          background: isLaunching
            ? "radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(227,27,35,0.15) 45%, transparent 70%)"
            : isCompleted
              ? "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 65%)"
              : "radial-gradient(circle, rgba(227,27,35,0.35) 0%, rgba(227,27,35,0.1) 45%, transparent 70%)",
        }}
        animate={{
          scale: [0.95, 1.08, 0.95],
          opacity: [0.6, 0.95, 0.6],
        }}
        transition={{
          duration: isLaunching ? 1.5 : 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Outer Metallic Beveled Base Ring (Fluid Scaling: 220px on small mobile -> 290px on desktop) */}
      <div
        className="relative flex items-center justify-center rounded-full p-3 sm:p-5"
        style={{
          width: "clamp(215px, 66vw, 290px)",
          height: "clamp(215px, 66vw, 290px)",
          background:
            "linear-gradient(145deg, #E2E8F0 0%, #94A3B8 25%, #475569 50%, #94A3B8 75%, #CBD5E1 100%)",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.85), inset 0 3px 6px rgba(255,255,255,0.9), inset 0 -4px 8px rgba(0,0,0,0.7)",
        }}
      >
        {/* Inner Chamfer / Recess Trench */}
        <div
          className="relative flex h-full w-full items-center justify-center rounded-full"
          style={{
            background:
              "linear-gradient(180deg, #1E293B 0%, #0F172A 50%, #020617 100%)",
            boxShadow:
              "inset 0 10px 20px rgba(0,0,0,0.9), inset 0 2px 4px rgba(0,0,0,0.95), 0 1px 2px rgba(255,255,255,0.2)",
          }}
        >
          {/* Physical 3D Push Button Core (Fluid Scaling: 165px -> 220px) */}
          <motion.button
            type="button"
            disabled={disabled || isLaunching || isCompleted}
            onClick={onPress}
            whileHover={!disabled && !isLaunching && !isCompleted ? { scale: 1.02 } : {}}
            whileTap={
              !disabled && !isLaunching && !isCompleted
                ? { y: 6, scale: 0.98 }
                : {}
            }
            animate={{
              y: isLaunching ? 6 : 0,
            }}
            transition={{ type: "spring", stiffness: 450, damping: 20 }}
            className={`group relative flex items-center justify-center rounded-full outline-none transition-all ${
              disabled || isLaunching || isCompleted
                ? "cursor-not-allowed opacity-95"
                : "cursor-pointer active:cursor-grabbing"
            }`}
            style={{
              width: "clamp(165px, 51vw, 222px)",
              height: "clamp(165px, 51vw, 222px)",
              // 3D Extrusion Side Shadow
              boxShadow: isLaunching
                ? "0 4px 10px rgba(0,0,0,0.8), inset 0 -4px 12px rgba(0,0,0,0.7)"
                : "0 12px 24px rgba(0,0,0,0.9), 0 5px 10px rgba(96,5,8,0.8), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -6px 14px rgba(0,0,0,0.6)",
              background:
                "radial-gradient(circle at 50% 35%, #FF4D55 0%, #E31B23 42%, #B80E16 75%, #7D050C 100%)",
            }}
          >
            {/* Top Glossy Curved Glass Reflection Sheen */}
            <div
              className="pointer-events-none absolute inset-x-3 top-2 h-20 sm:h-24 rounded-t-full opacity-60 mix-blend-screen"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
              }}
            />

            {/* Inner Ring Glow */}
            <div className="pointer-events-none absolute inset-2 rounded-full border border-white/20" />

            {/* Button Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-2">
              {isLaunching ? (
                <div className="flex flex-col items-center gap-1.5">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/20"
                  >
                    <Rocket className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow" />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    ACTIVE
                  </span>
                </div>
              ) : isCompleted ? (
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-amber-200">
                    LAUNCHED
                  </span>
                  <span className="text-xl sm:text-2xl font-black uppercase tracking-[0.1em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    LIVE
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span
                    className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-[0.12em] text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]"
                    style={{
                      textShadow:
                        "0 2px 4px rgba(0,0,0,0.9), 0 -1px 1px rgba(255,255,255,0.4)",
                    }}
                  >
                    LAUNCH
                  </span>
                </div>
              )}
            </div>
          </motion.button>
        </div>
      </div>

      {/* Subtitle Caption Below Physical Button */}
      <div className="mt-3 sm:mt-4 text-center px-2">
        <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.28em] text-[#D4AF37] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          Official System Launch
        </p>
        <p className="mt-0.5 text-[10px] sm:text-[11px] text-[#94A3B8]">
          {isLaunching
            ? "Ceremony sequence executing..."
            : isCompleted
              ? "Admission ERP is active on LED display"
              : "Press to initiate formal inauguration"}
        </p>
      </div>
    </div>
  );
}
