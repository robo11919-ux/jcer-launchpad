import { Monitor, Radio, Server, Activity } from "lucide-react";
import type { SyncMode } from "@/hooks/useRealtimeControl";

interface CeremonyStatusProps {
  currentPhase: string;
  sequenceId: number;
  syncMode: SyncMode;
  screenOnline: boolean;
}

export function CeremonyStatus({
  currentPhase,
  sequenceId,
  syncMode,
  screenOnline,
}: CeremonyStatusProps) {
  const items = [
    {
      icon: Activity,
      label: "Phase",
      value: currentPhase,
      color: "text-[#D4AF37]",
    },
    {
      icon: Radio,
      label: "Seq ID",
      value: `#${sequenceId}`,
      color: "text-white",
    },
    {
      icon: Server,
      label: "Sync",
      value: syncMode === "CLOUD_REALTIME" ? "REALTIME" : "LOCAL",
      color: syncMode === "CLOUD_REALTIME" ? "text-[#22C55E]" : "text-amber-400",
    },
    {
      icon: Monitor,
      label: "LED Screen",
      value: screenOnline ? "ONLINE" : "OFFLINE",
      color: screenOnline ? "text-[#22C55E]" : "text-red-400",
    },
  ];

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0D1B2A]/70 p-3 sm:p-4 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-2.5">
        <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#94A3B8]">
          Ceremony Telemetry
        </h4>
        <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#D4AF37]" />
      </div>

      <div className="mt-2.5 sm:mt-3 grid grid-cols-2 gap-2 sm:gap-2.5">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl sm:rounded-2xl border border-white/5 bg-[#12243A]/60 p-2 sm:p-3"
          >
            <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] text-[#94A3B8] font-medium truncate">
              <item.icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 text-[#D4AF37]" />
              <span className="truncate">{item.label}</span>
            </div>
            <p className={`mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-black tracking-wide truncate ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
