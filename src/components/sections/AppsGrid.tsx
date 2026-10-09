"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { apps } from "@/lib/apps";
import { Reveal } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

export function AppsGrid() {
  const reduce = useReducedMotion();
  return (
    <section id="apps" className="relative scroll-mt-16 bg-[#f6f7fb] py-24 sm:py-32" aria-labelledby="apps-title">
      <div className="container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">The apps</p>
          <h2 id="apps-title" className="h-section mt-3">
            One sign-in opens every app
          </h2>
          <p className="lede mx-auto mt-4 max-w-2xl">
            Use one app or all of them. Each is built for a single job — and they all share the same people, hospitals and
            departments.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {apps.map((app, i) => {
            const Icon = app.icon;
            const featured = app.slug === "licensify";
            const card = (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative h-full overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-float",
                  featured && "text-white",
                )}
                style={featured ? { background: `linear-gradient(140deg, #1f4f94, ${app.color} 60%, #4b8fe0)` } : undefined}
              >
                {/* colour wash on hover */}
                {!featured && (
                  <span
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
                    style={{ background: `${app.color}33` }}
                  />
                )}
                <span
                  className={cn(
                    "relative grid h-12 w-12 place-items-center rounded-xl text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:-rotate-6",
                    featured && "bg-white/15 ring-1 ring-white/30",
                  )}
                  style={featured ? undefined : { background: app.color, boxShadow: `0 10px 24px -10px ${app.color}` }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className={cn("relative mt-5 text-xl font-bold", !featured && "text-ink-900")}>{app.name}</h3>
                <p className={cn("relative mt-1.5 text-sm leading-relaxed", featured ? "text-white/80" : "text-ink-600")}>{app.tagline}</p>
                {featured ? (
                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Explore Licensify <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                ) : (
                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-ink-400">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: app.color }} />
                    {app.short}
                  </span>
                )}
              </motion.div>
            );
            return featured ? (
              <Link key={app.slug} href={`/apps/${app.slug}/`} className="rounded-2xl sm:col-span-2 lg:col-span-1 lg:row-span-1">
                {card}
              </Link>
            ) : (
              <div key={app.slug}>{card}</div>
            );
          })}
          <Reveal delay={0.2} className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-ink-200 p-6 text-sm text-ink-600">
            <p className="font-display text-lg font-bold text-ink-900">Start with one app.</p>
            <p className="mt-1.5 leading-relaxed">Add the rest when you&apos;re ready — your people and departments are already there.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
