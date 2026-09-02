import { createFileRoute, Link } from "@tanstack/react-router";
import { useRealtimeControl } from "@/hooks/useRealtimeControl";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "System Status | JCER Launch Ceremony" },
      {
        name: "description",
        content:
          "Pre-event connectivity check for the JCER Admission ERP launch ceremony: controller, launch display and realtime link.",
      },
      { property: "og:title", content: "JCER Launch Ceremony — System Status" },
      {
        property: "og:description",
        content: "Live connectivity status for the JCER Admission ERP launch ceremony.",
      },
    ],
  }),
  component: StatusPage,
});

function Dot({ ok, warn }: { ok: boolean; warn?: boolean }) {
  const color = ok ? "bg-emerald-400" : warn ? "bg-gold" : "bg-red-400";
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />;
}

function StatusPage() {
  const { row, connected, screenOnline } = useRealtimeControl();

  const ceremony =
    row?.command === "LAUNCH" ? "Launching / Completed" : "Ready";

  const rows: { label: string; value: string; ok: boolean; warn?: boolean }[] = [
    { label: "Mobile Controller", value: "Connected", ok: true, warn: false },
    {
      label: "Launch Screen",
      value: screenOnline ? "Connected" : "Waiting",
      ok: screenOnline,
      warn: !screenOnline,
    },
    {
      label: "Realtime Connection",
      value: connected ? "Active" : "Connecting",
      ok: connected,
      warn: !connected,
    },
    { label: "Ceremony Status", value: ceremony, ok: true, warn: false },
  ];

  return (
    <main className="min-h-screen bg-navy px-5 py-10 text-ceremony-light">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-xl font-bold tracking-tight">System Status</h1>
        <p className="mt-1 text-sm text-ceremony-light/60">
          Pre-event connectivity check
        </p>

        <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between px-4 py-4">
              <span className="text-sm text-ceremony-light/80">{r.label}</span>
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Dot ok={r.ok} warn={r.warn} />
                {r.value}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-ceremony-light/40">
          Last command: {row?.command ?? "—"} · sequence {row?.sequence_id ?? "—"}
        </p>

        <Link
          to="/controller"
          className="mt-8 inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold"
        >
          Back to Launch Control
        </Link>
      </div>
    </main>
  );
}
