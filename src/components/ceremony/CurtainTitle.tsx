import { motion } from "framer-motion";

export function CurtainTitle({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center text-center"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* soft spotlight */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,235,190,0.16) 0%, rgba(255,235,190,0.05) 35%, transparent 65%)",
        }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.03, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative px-8">
        <p className="text-[clamp(0.8rem,1.15vw,1.3rem)] font-medium uppercase tracking-[0.5em] text-ceremony-light/85">
          Jain College of Engineering &amp; Research
        </p>

        <div className="mx-auto mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-[14vw] bg-gradient-to-r from-transparent to-gold/70" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-[14vw] bg-gradient-to-l from-transparent to-gold/70" />
        </div>

        <h1 className="mt-8 text-[clamp(2.5rem,6vw,6.5rem)] font-extrabold leading-none tracking-tight text-ceremony-light drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]">
          ADMISSION ERP SYSTEM
        </h1>

        <div className="mx-auto mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-[10vw] bg-gradient-to-r from-transparent to-gold/60" />
          <p className="text-[clamp(0.85rem,1.4vw,1.6rem)] font-semibold uppercase tracking-[0.42em] text-gold">
            Official Launch Ceremony
          </p>
          <span className="h-px w-[10vw] bg-gradient-to-l from-transparent to-gold/60" />
        </div>
      </div>
    </motion.div>
  );
}
