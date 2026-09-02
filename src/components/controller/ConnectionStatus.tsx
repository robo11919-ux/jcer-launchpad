import { motion } from "framer-motion";
import { Monitor } from "lucide-react";

interface ConnectionStatusProps {
  screenOnline: boolean;
  connected: boolean;
  isCloudConfigured: boolean;
  stage: "READY" | "LAUNCHING" | "COMPLETED";
}

export function ConnectionStatus({
  screenOnline,
  connected,
  isCloudConfigured,
  stage,
}: ConnectionStatusProps) {
  const isOk = stage === "COMPLETED" || (screenOnline && (connected || !isCloudConfigured));

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0D1B2A]/90 p-3 sm:p-3.5 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between gap-2.5 sm:gap-3">
        {/* Left Indicator & Text */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          <div className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
            {isOk && (
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"
                animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <span
              className={`relative inline-flex h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${
                stage === "COMPLETED"
                  ? "bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"
                  : isOk
                    ? "bg-[#22C55E] shadow-[0_0_8px_#22C55E]"
                    : "bg-red-500 shadow-[0_0_8px_#EF4444]"
              }`}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#F8FAFC] truncate">
              {stage === "LAUNCHING"
                ? "Ceremony In Progress"
                : stage === "COMPLETED"
                  ? "System Live"
                  : screenOnline
                    ? "System Ready"
                    : "System Standby"}
            </p>
            <p className="text-[10px] sm:text-[11px] text-[#94A3B8] truncate">
              {stage === "LAUNCHING"
                ? "LED ceremony sequence active"
                : stage === "COMPLETED"
                  ? "Admission ERP officially live"
                  : screenOnline
                    ? "Launch Display Connected"
                    : "Awaiting connection from LED display"}
            </p>
          </div>
        </div>

        {/* Right Badge */}
        <div className="shrink-0 flex items-center">
          <span
            className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider sm:tracking-widest ${
              stage === "COMPLETED"
                ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30"
                : isOk
                  ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                  : "bg-red-500/15 text-red-400 border border-red-500/30"
            }`}
          >
            <Monitor className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            <span>
              {stage === "COMPLETED"
                ? "LIVE"
                : screenOnline
                  ? "CONNECTED"
                  : "WAITING"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
