import { createFileRoute, Link } from "@tanstack/react-router";
import { MonitorPlay, Smartphone, Radio } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JCER Admission ERP — Official Launch Ceremony" },
      {
        name: "description",
        content:
          "Ceremony console for the official launch of the Jain College of Engineering & Research Admission ERP System.",
      },
      { property: "og:title", content: "JCER Admission ERP — Official Launch Ceremony" },
      {
        property: "og:description",
        content:
          "Open the LED launch screen or the Principal's mobile launch control panel.",
      },
    ],
  }),
  component: Home,
});

const links = [
  {
    to: "/screen" as const,
    icon: MonitorPlay,
    title: "Launch Screen",
    desc: "Fullscreen LED / projector ceremony display",
  },
  {
    to: "/controller" as const,
    icon: Smartphone,
    title: "Launch Control",
    desc: "Principal's mobile control panel",
  },
  {
    to: "/status" as const,
    icon: Radio,
    title: "System Status",
    desc: "Pre-event connectivity check",
  },
];

function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-5 py-14 text-ceremony-light">
      <div className="w-full max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
          Jain College of Engineering &amp; Research
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Admission ERP System
        </h1>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-ceremony-light/60">
          Official Launch Ceremony
        </p>

        <div className="mt-10 grid gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-5 transition-colors hover:border-gold/50"
            >
              <l.icon className="h-6 w-6 text-gold" />
              <span>
                <span className="block font-bold">{l.title}</span>
                <span className="block text-sm text-ceremony-light/60">{l.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
