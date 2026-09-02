import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface FlowerPetalsProps {
  active: boolean;
  onCelebrationEnd?: () => void;
}

interface PetalData {
  id: number;
  xStart: number;
  xDrift: number;
  yEnd: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  rotationStart: number;
  rotationEnd: number;
  rotateYStart: number;
  rotateYEnd: number;
  depth: number;
}

// Organic petal palette: crimson rose, soft coral pink, golden marigold, jasmine white
const PETAL_COLORS = [
  "#E11D48", // Rose Red
  "#FB7185", // Soft Pink
  "#FDA4AF", // Blush Pink
  "#F59E0B", // Soft Gold Marigold
  "#FDE047", // Champagne Gold
  "#FFFBEB", // Jasmine White
] as const;

export function FlowerPetals({ active, onCelebrationEnd }: FlowerPetalsProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }

    // IMMEDIATELY start flower petal shower (0ms delay)
    setVisible(true);

    // Continuous shower lasts for 5.5s, then gracefully cleans up
    const finishTimer = setTimeout(() => {
      setVisible(false);
      if (onCelebrationEnd) {
        onCelebrationEnd();
      }
    }, 5500);

    return () => {
      clearTimeout(finishTimer);
    };
  }, [active, onCelebrationEnd]);

  // Continuous shower of 60 petals staggered across waves over 5 seconds
  const petals: PetalData[] = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const color: string = PETAL_COLORS[i % PETAL_COLORS.length] ?? "#E11D48";
      const depth = 0.6 + ((i * 17) % 40) / 100;
      const size = (13 + ((i * 7) % 12)) * depth;
      const wave = Math.floor(i / 12); // 5 continuous waves
      const waveDelay = wave * 0.85;   // waves enter every 0.85s

      return {
        id: i,
        xStart: 2 + ((i * 27) % 96), // distribute across 2% - 98% width
        xDrift: ((i % 7) - 3) * 45,   // natural wind drift -135px to +135px
        yEnd: 106 + (i % 12),
        size,
        color,
        delay: waveDelay + ((i % 12) * 0.07), // continuous staggered stream
        duration: 2.3 + ((i * 3) % 8) * 0.12, // 2.3s to 3.2s fall duration
        rotationStart: ((i * 47) % 360),
        rotationEnd: ((i * 47) % 360) + 220 + ((i % 5) * 40),
        rotateYStart: (i * 35) % 180,
        rotateYEnd: ((i * 35) % 180) + 360,
        depth,
      };
    });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="flower-petals-overlay"
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {petals.map((p) => (
            <motion.div
              key={p.id}
              className="absolute will-change-transform"
              style={{
                left: `${p.xStart}%`,
                top: "-40px",
                width: p.size,
                height: p.size * 1.35,
                zIndex: p.depth > 0.8 ? 42 : 41,
                filter: p.depth < 0.75 ? "blur(0.5px)" : "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
                opacity: p.depth < 0.75 ? 0.75 : 0.95,
              }}
              initial={{
                y: "-40px",
                x: 0,
                rotate: p.rotationStart,
                rotateY: p.rotateYStart,
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                y: ["-40px", `${p.yEnd}vh`],
                x: [0, p.xDrift * 0.4, p.xDrift, p.xDrift * 0.8],
                rotate: [p.rotationStart, p.rotationEnd],
                rotateY: [p.rotateYStart, p.rotateYEnd],
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 0.95, 0.9],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: [0.25, 0.46, 0.45, 0.94], // Natural gravity glide
              }}
            >
              {/* Organic Curved Flower Petal SVG */}
              <svg
                viewBox="0 0 30 40"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id={`petalGrad-${p.id}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                    <stop offset="40%" stopColor={p.color} stopOpacity="1" />
                    <stop offset="100%" stopColor={p.color} stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* Natural curved petal silhouette */}
                <path
                  d="M15 0 C25 8, 30 22, 22 35 C17 40, 13 40, 8 35 C0 22, 5 8, 15 0 Z"
                  fill={`url(#petalGrad-${p.id})`}
                />

                {/* Subtle petal spine highlight */}
                <path
                  d="M15 4 Q16 20 15 34"
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
