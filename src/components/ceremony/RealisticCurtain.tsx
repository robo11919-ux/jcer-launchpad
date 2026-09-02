import { motion } from "framer-motion";
import { TIMINGS } from "@/lib/launch";

interface RealisticCurtainProps {
  open: boolean;
  onOpenComplete?: (() => void) | undefined;
}

// Left & Right Vertical Velvet Drapes (Matching Reference Image)
function VelvetPanel({
  side,
  open,
  onAnimationComplete,
}: {
  side: "left" | "right";
  open: boolean;
  onAnimationComplete?: (() => void) | undefined;
}) {
  const isLeft = side === "left";

  return (
    <motion.div
      className="absolute top-0 h-full will-change-transform select-none overflow-hidden"
      style={{
        width: "50.5%", // 1% center overlap guarantees zero gap when closed on any aspect ratio
        [side]: 0,
        zIndex: isLeft ? 32 : 31,
        boxShadow: isLeft
          ? "inset -40px 0 90px rgba(0,0,0,0.85), 25px 0 60px rgba(0,0,0,0.8)"
          : "inset 40px 0 90px rgba(0,0,0,0.85), -25px 0 60px rgba(0,0,0,0.8)",
      }}
      initial={false}
      animate={{
        x: open ? (isLeft ? "-102%" : "102%") : "0%",
      }}
      transition={{
        duration: TIMINGS.curtain / 1000,
        ease: "linear",
      }}
      onAnimationComplete={() => {
        if (isLeft && open && onAnimationComplete) {
          onAnimationComplete();
        }
      }}
    >
      {/* 1. Base Velvet Crimson Foundation */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #610710 0%, #4A050C 50%, #290206 100%)",
        }}
      />

      {/* 2. Repetitive Volumetric Cylindrical Fluting (Sinusoidal highlight & shadow curves) */}
      <div
        className="absolute inset-0 opacity-95"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #1A0204 0px,
            #2C0307 8px,
            #4A050C 20px,
            #720A14 36px,
            #9D1521 48px,
            #B81C2A 56px,
            #9D1521 64px,
            #720A14 76px,
            #4A050C 92px,
            #2C0307 104px,
            #1A0204 112px
          )`,
          backgroundSize: "112px 100%",
        }}
      />

      {/* 3. Global Overhead Stage Spotlight illumination across upper center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLeft
            ? "radial-gradient(ellipse 90% 75% at 100% 25%, rgba(255, 70, 85, 0.28) 0%, rgba(180, 20, 30, 0.1) 45%, transparent 75%)"
            : "radial-gradient(ellipse 90% 75% at 0% 25%, rgba(255, 70, 85, 0.28) 0%, rgba(180, 20, 30, 0.1) 45%, transparent 75%)",
        }}
      />

      {/* 4. Top Drop Shadow Cast by Valance */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
        }}
      />

      {/* 5. Bottom Stage Hemline Shadow */}
      <div
        className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 45%, transparent 100%)",
        }}
      />

      {/* 6. Natural Center Seam Shadow */}
      <div
        className={`absolute inset-y-0 ${isLeft ? "right-0 w-8" : "left-0 w-8"} pointer-events-none`}
        style={{
          background: isLeft
            ? "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.6) 100%)"
            : "linear-gradient(270deg, transparent 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </motion.div>
  );
}

// Elegant Top Stage Valance Header with Fluid Responsive Warm Champagne/Gold Typography
export function StageValance({ open }: { open: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-0 z-40 h-14 sm:h-16 md:h-20 overflow-hidden select-none"
      initial={false}
      animate={{
        y: open ? "-105%" : "0%",
        opacity: open ? 0 : 1,
      }}
      transition={{
        duration: TIMINGS.curtain / 1000,
        ease: "linear",
      }}
    >
      {/* Valance Header Band */}
      <div
        className="absolute inset-0 flex items-center justify-center pb-1.5 sm:pb-2 px-3 sm:px-6"
        style={{
          background: "linear-gradient(180deg, #1A0204 0%, #4A050C 60%, #260205 100%)",
          boxShadow: "0 8px 26px rgba(0,0,0,0.85)",
        }}
      >
        {/* Single Line Centered Ceremonial Header with Fluid clamp() sizing */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-center max-w-full">
          {/* Main ERP Title in Warm Champagne Ivory */}
          <span
            className="font-extrabold uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] truncate"
            style={{
              color: "#F7EAD0",
              fontSize: "clamp(10px, 1.35vw, 17px)",
              letterSpacing: "clamp(0.12em, 0.22vw, 0.24em)",
            }}
          >
            JCER SMART ERP SYSTEM
          </span>

          {/* Elegant Gold Separator Dot */}
          <span
            className="select-none font-medium opacity-80 shrink-0"
            style={{
              color: "#E5B869",
              fontSize: "clamp(10px, 1.35vw, 17px)",
            }}
          >
            •
          </span>

          {/* Subtitle in Refined Muted Champagne Gold */}
          <span
            className="font-semibold uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] truncate"
            style={{
              color: "#E5B869",
              fontSize: "clamp(9px, 1.15vw, 15px)",
              letterSpacing: "clamp(0.14em, 0.25vw, 0.28em)",
            }}
          >
            INAUGURATION CEREMONY
          </span>
        </div>
      </div>

      {/* Scalloped Swags Across Width */}
      <div className="absolute inset-x-0 -bottom-2.5 flex justify-between w-full pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="relative h-5 w-full rounded-b-full shadow-[0_3px_8px_rgba(0,0,0,0.6)]"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, #7A0B15 0%, #4A050C 50%, #200204 100%)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function RealisticCurtain({ open, onOpenComplete }: RealisticCurtainProps) {
  return (
    <div
      className={`absolute inset-0 z-30 overflow-hidden select-none ${
        open ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {/* Left Curtain Panel */}
      <VelvetPanel
        side="left"
        open={open}
        onAnimationComplete={onOpenComplete}
      />

      {/* Right Curtain Panel */}
      <VelvetPanel side="right" open={open} />

      {/* Top Stage Valance with Single-Line Header */}
      <StageValance open={open} />
    </div>
  );
}
