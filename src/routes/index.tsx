import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MonitorPlay,
  Smartphone,
  Radio,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { LIVE_ERP_URL } from "@/lib/launch";
import { useRealtimeControl } from "@/hooks/useRealtimeControl";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JCER Admission ERP — Official Launch Ceremony Hub" },
      {
        name: "description",
        content:
          "Ceremony console for the official launch of the Jain College of Engineering & Research Admission ERP System.",
      },
      {
        property: "og:title",
        content: "JCER Admission ERP — Official Launch Ceremony",
      },
      {
        property: "og:description",
        content:
          "Open the LED launch screen or the Principal's mobile launch control panel.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { connected, screenOnline } = useRealtimeControl();

  return (
    <main className="min-h-screen bg-[#071324] text-ceremony-light flex flex-col justify-between selection:bg-gold/30">
      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/40 px-5 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_#C9A227]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">
              Jain College of Engineering &amp; Research
            </p>
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl text-white">
            ADMISSION ERP SYSTEM
          </h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.35em] text-gold/90">
            Official Inauguration &amp; Launch Ceremony
          </p>
        </div>

        {/* Live Connectivity Badge */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  connected ? "bg-emerald-400" : "bg-red-400"
                }`}
              />
              <span className="text-white/80">
                Realtime Cloud:{" "}
                <strong className="text-white">
                  {connected ? "Connected" : "Connecting..."}
                </strong>
              </span>
            </div>
            <span className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  screenOnline ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
              <span className="text-white/80">
                LED Screen:{" "}
                <strong className="text-white">
                  {screenOnline ? "Online" : "Awaiting /screen"}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Launchpad Route Selection Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {/* LED Display Screen */}
          <Link
            to="/screen"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:border-gold/60 hover:shadow-[0_20px_50px_rgba(201,162,39,0.15)] active:scale-[0.99]"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl group-hover:bg-gold/20 transition-all" />
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 text-gold border border-gold/40">
                  <MonitorPlay className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                  Device 2 · LED Screen
                </span>
              </div>
              <h2 className="mt-5 text-xl font-extrabold text-white group-hover:text-gold transition-colors">
                Launch Screen (/screen)
              </h2>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Fullscreen 16:9 cinematic presentation for large LED displays &amp; projectors with velvet curtains and reveal sequence.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gold">
              <span>Open LED Screen</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>

          {/* Principal Remote Control */}
          <Link
            to="/controller"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#1E4E8C]/30 to-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_20px_50px_rgba(30,78,140,0.3)] active:scale-[0.99]"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl group-hover:bg-cyan-400/20 transition-all" />
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                  <Smartphone className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  Device 1 · Mobile
                </span>
              </div>
              <h2 className="mt-5 text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                Mobile Control (/controller)
              </h2>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Executive remote control for the Principal to trigger the official launch ceremony via Supabase Realtime.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-cyan-300">
              <span>Open Mobile Controller</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        </div>

        {/* Secondary Links & ERP Site */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            to="/status"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <Radio className="h-5 w-5 text-gold" />
            <div className="text-left">
              <p className="text-sm font-bold text-white">System Diagnostics</p>
              <p className="text-xs text-white/50">Pre-event connectivity and telemetry check</p>
            </div>
          </Link>

          <a
            href={LIVE_ERP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <div className="text-left">
                <p className="text-sm font-bold text-white">Live ERP Portal</p>
                <p className="text-xs text-white/50">jcererp-system.pages.dev</p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-white/40" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 px-6 py-4 text-center text-xs text-white/40">
        Jain College of Engineering &amp; Research, Belagavi · Official Launch Ceremony System
      </footer>
    </main>
  );
}
