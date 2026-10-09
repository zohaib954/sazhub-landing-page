import { BarChart3, MailCheck, ShieldAlert } from "lucide-react";
import { ConsoleMockup } from "@/components/mockups/ConsoleMockup";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

const features = [
  { icon: BarChart3, title: "Live counts", body: "Organizations, hospitals, departments, active and deactivated people." },
  { icon: ShieldAlert, title: "Security gaps flagged", body: "Admins without two-step verification, listed by name." },
  { icon: MailCheck, title: "Invites tracked", body: "See who hasn't joined yet and resend in one click." },
];

export function ConsoleSection() {
  return (
    <section id="console" className="relative scroll-mt-16 overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="console-title">
      <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-sky-300/20 blur-[100px]" />
      <div className="container relative grid items-center gap-14 lg:grid-cols-[1fr_1.35fr]">
        <div>
          <Reveal>
            <p className="eyebrow">The Console</p>
            <h2 id="console-title" className="h-section mt-3">
              Your whole organization at a glance
            </h2>
            <p className="lede mt-4">
              People, hospitals, departments and access live in one Console — and every SAZ Vida app reads from it.
            </p>
          </Reveal>
          <Stagger className="mt-8 space-y-3">
            {features.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="flex gap-4 rounded-2xl border-l-[3px] border-app-licensify bg-[#f6f8fc] p-4">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-app-licensify" />
                <div>
                  <h3 className="font-display text-lg font-bold">{title}</h3>
                  <p className="mt-0.5 text-sm text-ink-600">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal delay={0.1} y={40} className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-ink-100 to-sky-300/30 blur-sm" />
          <ConsoleMockup />
        </Reveal>
      </div>
    </section>
  );
}
