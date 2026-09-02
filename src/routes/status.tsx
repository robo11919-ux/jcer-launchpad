import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Radio,
  Monitor,
  Smartphone,
  Server,
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  Wifi,
  Laptop,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRealtimeControl } from "@/hooks/useRealtimeControl";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "System Diagnostics | JCER Launch Ceremony" },
      {
        name: "description",
        content:
          "Pre-event connectivity check for the JCER Admission ERP launch ceremony: controller, launch display, and Supabase realtime link.",
      },
      {
        property: "og:title",
        content: "JCER Launch Ceremony — System Diagnostics",
      },
      {
        property: "og:description",
        content:
          "Live connectivity status for the JCER Admission ERP launch ceremony.",
      },
    ],
  }),
  component: StatusPage,
});

function StatusDot({ ok, warn }: { ok: boolean; warn?: boolean }) {
  const color = ok ? "bg-emerald-400" : warn ? "bg-amber-400" : "bg-red-400";
  return (
    <span className="relative flex h-3 w-3">
      {ok && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
      )}
      <span className={`relative inline-flex h-3 w-3 rounded-full ${color}`} />
    </span>
  );
}

function StatusPage() {
  const { row, connected, screenOnline, syncMode, isCloudConfigured, sendCommand } =
    useRealtimeControl();

  const [screenshotStatus, setScreenshotStatus] = useState<"checking" | "loaded" | "failed">("checking");

  useEffect(() => {
    const img = new Image();
    img.src = "/jcer-portal-reveal.png";
    img.onload = () => setScreenshotStatus("loaded");
    img.onerror = () => setScreenshotStatus("failed");
  }, []);

  const ceremonyStatusText =
    row?.command === "LAUNCH"
      ? "Launched / Active"
      : row?.command === "RESET"
        ? "Reset / Standby"
        : "Ready";

  const diagnostics = [
    {
      icon: Server,
      label: "Supabase Configuration",
      value: isCloudConfigured ? "Configured" : "Missing / Not Set",
      detail: isCloudConfigured
        ? "VITE_SUPABASE_URL & Publishable Key present"
        : "Configure environment variables in .env for cross-device sync",
      ok: isCloudConfigured,
      warn: !isCloudConfigured,
    },
    {
      icon: Wifi,
      label: "Realtime Connection",
      value: isCloudConfigured
        ? connected
          ? "Connected"
          : "Connecting..."
        : "Disabled (Local Mode)",
      detail: isCloudConfigured
        ? connected
          ? "PostgreSQL Realtime WebSocket channel subscribed"
          : "Connecting to Supabase realtime socket..."
        : "Using BroadcastChannel fallback for same-device tabs",
      ok: isCloudConfigured ? connected : true,
      warn: isCloudConfigured && !connected,
    },
    {
      icon: isCloudConfigured ? Wifi : Laptop,
      label: "Synchronization Mode",
      value: isCloudConfigured ? "Cloud Realtime" : "Local Broadcast Mode",
      detail: isCloudConfigured
        ? "Two-Device Sync (Phone ↔ LED Screen) is ACTIVE"
        : "Local Dev Mode: Same-device sync only",
      ok: isCloudConfigured,
      warn: !isCloudConfigured,
    },
    {
      icon: Monitor,
      label: "Screen Heartbeat",
      value: screenOnline ? "Connected" : "Offline",
      detail: screenOnline
        ? `Last seen: ${row?.screen_last_seen ? new Date(row.screen_last_seen).toLocaleTimeString() : "Active"}`
        : "Open /screen on the LED display laptop",
      ok: screenOnline,
      warn: !screenOnline,
    },
    {
      icon: ImageIcon,
      label: "Portal Screenshot Asset",
      value: screenshotStatus === "loaded" ? "Loaded" : screenshotStatus === "failed" ? "Failed" : "Checking...",
      detail: "/jcer-portal-reveal.png (16:9 1080p preview behind curtains)",
      ok: screenshotStatus === "loaded",
      warn: screenshotStatus !== "loaded",
    },
    {
      icon: Radio,
      label: "Ceremony Command State",
      value: ceremonyStatusText,
      detail: `Sequence ID: ${row?.sequence_id ?? 0}`,
      ok: true,
      warn: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#071324] text-ceremony-light px-5 py-10 flex flex-col justify-between selection:bg-gold/30">
      <div className="mx-auto w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-3.5">
          <Link
            to="/controller"
            className="rounded-xl border border-white/15 bg-white/5 p-2.5 text-white active:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              System Diagnostics
            </h1>
            <p className="text-xs text-white/60">
              Pre-event verification for JCER Admission ERP Ceremony
            </p>
          </div>
        </div>

        {/* Sync Mode Banner */}
        {!isCloudConfigured && (
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertTriangle className="h-4 w-4" />
              <span>Supabase Not Configured — Running in Local Mode</span>
            </div>
            <p className="mt-1 text-amber-200/80 leading-relaxed">
              Cross-device synchronization (Phone to LED Screen) requires <code className="bg-black/30 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> and <code className="bg-black/30 px-1 py-0.5 rounded">VITE_SUPABASE_PUBLISHABLE_KEY</code> in <code className="bg-black/30 px-1 py-0.5 rounded">.env</code>. Local tabs on the same machine still synchronize via BroadcastChannel.
            </p>
          </div>
        )}

        {/* Diagnostic Items */}
        <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
          {diagnostics.map((item, i) => (
            <div key={i} className="flex items-start justify-between p-4 sm:p-5">
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-gold">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-[11px] text-white/50 max-w-xs sm:max-w-sm">{item.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot ok={item.ok} warn={item.warn} />
                <span className="text-xs font-bold text-white/90 whitespace-nowrap">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Operator Actions */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => sendCommand("RESET")}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-3 text-sm font-semibold text-white active:bg-white/10"
          >
            <RotateCcw className="h-4 w-4 text-gold" /> Send Reset Signal
          </button>
          <Link
            to="/controller"
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#1E4E8C] py-3 text-sm font-bold text-white border border-gold/40 hover:bg-[#163c6d]"
          >
            Go to Launch Control
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-center text-xs text-white/30">
        Jain College of Engineering &amp; Research · Official Launch Ceremony
      </footer>
    </main>
  );
}
