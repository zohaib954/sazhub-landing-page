import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { LicensifyDashboard } from "@/components/mockups/LicensifyMockups";
import { Reveal } from "@/components/ui/Motion";
import { bands } from "@/lib/licensify";

export function LicensifySpotlight() {
  return (
    <section className="relative overflow-hidden bg-hero py-24 text-white sm:py-32" aria-labelledby="licensify-spot-title">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="container relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-app-licensify text-white ring-1 ring-white/20">
              <BookOpen className="h-5 w-5" />
            </span>
            SAZ Vida app · Licensify
          </p>
          <h2 id="licensify-spot-title" className="mt-6 text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
            Never miss a licence renewal or an inspection finding
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base text-ink-200 sm:text-lg">
            Every statutory licence across your hospitals — tracked, renewed on time and ready for inspection.
          </p>

          <div className="mt-7 grid max-w-md grid-cols-2 gap-2">
            {bands.map((b) => (
              <div key={b.id} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color, boxShadow: `0 0 12px ${b.color}` }} />
                <span className="text-sm">
                  <span className="font-semibold">{b.label}</span> <span className="text-ink-300">· {b.range}</span>
                </span>
              </div>
            ))}
          </div>

          <Link href="/apps/licensify/" className="btn-primary mt-8">
            Explore Licensify <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal delay={0.15} y={50} className="relative">
          <div className="absolute -inset-10 -z-10 rounded-full bg-app-licensify/40 blur-[90px]" />
          <div className="animate-floaty">
            <LicensifyDashboard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
