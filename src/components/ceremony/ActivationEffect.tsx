import { AnimatePresence, motion } from "framer-motion";

export function ActivationEffect({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[0, 0.6, 1.2, 1.8].map((delay) => (
            <motion.span
              key={delay}
              className="absolute rounded-full border"
              style={{ borderColor: "rgba(120,200,255,0.55)", width: "18vw", height: "18vw" }}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 6, opacity: [0, 0.55, 0] }}
              transition={{ duration: 2.4, delay, ease: "easeOut", repeat: Infinity }}
            />
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(90,180,255,0.35) 0%, rgba(60,140,255,0.12) 40%, transparent 70%)",
            }}
            animate={{ opacity: [0.3, 0.85, 0.4], scale: [0.9, 1.1, 0.95] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-y-0 w-[40vw]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(150,215,255,0.22), transparent)",
            }}
            initial={{ x: "-60vw" }}
            animate={{ x: "120vw" }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.p
            className="relative text-[clamp(1rem,1.9vw,2rem)] font-semibold uppercase tracking-[0.55em] text-ceremony-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{ textShadow: "0 0 28px rgba(120,200,255,0.8)" }}
          >
            Launch Sequence Initiated
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
