import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Motion";

export type Qa = { q: string; a: string };

export function Faq({ items, title = "Questions, answered" }: { items: Qa[]; title?: string }) {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="h-section mt-3">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="divide-y divide-ink-100 rounded-2xl border border-ink-100">
          {items.map((it) => (
            <details key={it.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold sm:text-lg">
                {it.q}
                <Plus className="h-5 w-5 shrink-0 text-ink-400 transition duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base">{it.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
