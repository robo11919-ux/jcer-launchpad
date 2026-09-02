import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  active: boolean;
}

const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CountdownTimer({ active }: CountdownTimerProps) {
  const [count, setCount] = useState<number>(10);

  useEffect(() => {
    if (!active) {
      setCount(10);
      return;
    }

    setCount(10);

    // 10-second sequence: 10 at 0s, 9 at 1s, ..., 1 at 9s, 0 at 10s
    const timers = [
      setTimeout(() => setCount(9), 1000),
      setTimeout(() => setCount(8), 2000),
      setTimeout(() => setCount(7), 3000),
      setTimeout(() => setCount(6), 4000),
      setTimeout(() => setCount(5), 5000),
      setTimeout(() => setCount(4), 6000),
      setTimeout(() => setCount(3), 7000),
      setTimeout(() => setCount(2), 8000),
      setTimeout(() => setCount(1), 9000),
      setTimeout(() => setCount(0), 10000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="countdown-overlay"
          className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center select-none p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Circular Countdown Container (Fluid: 150px -> 220px on 4K) */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width: "clamp(150px, 15vw, 220px)",
              height: "clamp(150px, 15vw, 220px)",
            }}
          >
            {/* Dark Translucent Glass Backdrop */}
            <div className="absolute inset-0 rounded-full bg-black/65 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.85)] border border-white/10" />

            {/* SVG Animated Circular Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 transform"
              viewBox="0 0 160 160"
            >
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={RADIUS}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="4"
              />

              {/* Animated Cyan/Teal Progress Stroke (10 seconds duration) */}
              <motion.circle
                cx="80"
                cy="80"
                r={RADIUS}
                fill="none"
                stroke="#06B6D4"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: CIRCUMFERENCE }}
                transition={{ duration: 10, ease: "linear" }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))",
                }}
              />
            </svg>

            {/* Large Crisp Center Number */}
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                className="relative z-10 font-bold tracking-tight text-white font-mono leading-none"
                style={{
                  fontSize: count >= 10 ? "clamp(2.8rem, 5.2vw, 4.5rem)" : "clamp(3.5rem, 6.5vw, 5.5rem)",
                  textShadow: "0 2px 16px rgba(0,0,0,0.9)",
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.25 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
