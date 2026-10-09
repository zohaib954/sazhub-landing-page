import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

const steps = [
  { n: "01", title: "Pick one hospital", body: "Start a pilot at a single site — no big-bang rollout." },
  { n: "02", title: "We set it up", body: "We configure your sites, departments and admins for you." },
  { n: "03", title: "Everyone's signed in", body: "Your team opens every app with one login from day one." },
];

export function FinalCta({ title = "One login. One staff list. One audit trail." }: { title?: string }) {
  return (
    <section className="relative overflow-hidden bg-hero py-24 text-white sm:py-32" aria-labelledby="cta-title">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-sky-400/20 blur-[120px]" />
      <div className="container relative">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Next step</p>
          <h2 id="cta-title" className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] sm:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base text-ink-200 sm:text-lg">
            Start with a pilot at one of your hospitals: we set up your sites, departments and admins, and your team is
            signed in to every app.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <StaggerItem key={s.n} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/25 hover:bg-white/10">
              <span className="font-display text-sm font-bold text-sky-300">{s.n}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-ink-200">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
          <Link href="/demo/" className="btn-primary px-6 py-3 text-base">
            Book a pilot <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/#apps" className="btn-ghost px-6 py-3 text-base">
            See all apps
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
