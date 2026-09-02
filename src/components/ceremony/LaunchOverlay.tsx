import { AnimatePresence, motion } from "framer-motion";
import { Particles } from "./Particles";

export function LaunchOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          style={{ backgroundColor: "rgba(11,31,58,0.78)" }}
        >
          <Particles count={18} color="rgba(255,255,255,0.35)" />

          <motion.div
            className="absolute inset-y-0 w-[45vw]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
            }}
            initial={{ x: "-60vw" }}
            animate={{ x: "120vw" }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
          />

          <motion.div
            className="relative px-8"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-[clamp(1.6rem,3.4vw,3.6rem)] font-bold uppercase tracking-[0.2em] text-ceremony-light">
              Admission ERP System
            </h2>
            <p className="mt-4 text-[clamp(2.4rem,6.4vw,7rem)] font-extrabold uppercase leading-none tracking-tight text-gold drop-shadow-[0_0_40px_rgba(201,162,39,0.45)]">
              Officially Launched
            </p>
            <div className="mx-auto mt-8 h-px w-[36vw] bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <p className="mt-8 text-[clamp(0.8rem,1.3vw,1.4rem)] font-medium uppercase tracking-[0.42em] text-ceremony-light/90">
              Jain College of Engineering &amp; Research
            </p>
            <p className="mt-4 text-[clamp(0.7rem,1vw,1.05rem)] uppercase tracking-[0.35em] text-ceremony-light/60">
              Empowering Digital Admissions
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
