import { motion } from "framer-motion";
import { TIMINGS } from "@/lib/launch";

const CINEMATIC = [0.65, 0, 0.35, 1] as const;

const fabric =
  "repeating-linear-gradient(90deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.12) 14px, rgba(255,255,255,0.09) 34px, rgba(0,0,0,0.18) 54px, rgba(0,0,0,0.55) 72px)";

function Panel({ side, open }: { side: "left" | "right"; open: boolean }) {
  return (
    <motion.div
      className="absolute top-0 h-full will-change-transform"
      style={{
        width: "51%",
        [side]: 0,
        backgroundColor: "var(--curtain)",
        backgroundImage: fabric,
        boxShadow:
          side === "left"
            ? "inset -60px 0 90px rgba(0,0,0,0.65), 20px 0 60px rgba(0,0,0,0.55)"
            : "inset 60px 0 90px rgba(0,0,0,0.65), -20px 0 60px rgba(0,0,0,0.55)",
      }}
      initial={false}
      animate={{
        x: open ? (side === "left" ? "-102%" : "102%") : "0%",
        scaleX: open ? 0.92 : 1,
      }}
      transition={{ duration: TIMINGS.curtain / 1000, ease: CINEMATIC }}
    >
      {/* soft ambient fabric breathing */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.05), rgba(0,0,0,0.25) 45%, rgba(255,255,255,0.04))",
        }}
        animate={{ opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* valance shadow at top */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0))",
        }}
      />
    </motion.div>
  );
}

export function Curtain({ open }: { open: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <Panel side="left" open={open} />
      <Panel side="right" open={open} />
    </div>
  );
}
