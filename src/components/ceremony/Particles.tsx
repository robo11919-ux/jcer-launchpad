import { motion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  count?: number;
  color?: string;
  className?: string;
}

export function Particles({ count = 22, color = "rgba(201,162,39,0.5)", className }: Props) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 97) % 100,
        size: 1.5 + ((i * 13) % 4),
        delay: (i * 0.73) % 8,
        duration: 12 + ((i * 5) % 9),
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            bottom: "-5%",
            width: d.size,
            height: d.size,
            backgroundColor: color,
          }}
          animate={{ y: ["0vh", "-105vh"], opacity: [0, 0.9, 0] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
