"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { apps } from "@/lib/apps";
import { Reveal } from "@/components/ui/Motion";

const base = ["Cardiology", "Pharmacy", "Pathology Lab"];
const queue = ["Radiology", "Operation Theatre & ICU", "Blood Centre", "Biomedical Waste"];
const shown = apps.filter((a) => a.slug !== "console" && a.slug !== "feedback");

export function Departments() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px" });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState("");
  const [added, setAdded] = useState<string[]>(reduce ? [queue[0]] : []);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const word = queue[round % queue.length];
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const type = setInterval(() => {
      i++;
      setTyped(word.slice(0, i));
      if (i >= word.length) {
        clearInterval(type);
        timers.push(
          setTimeout(() => {
            setAdded((prev) => [word, ...prev].slice(0, 2));
            setTyped("");
          }, 450),
          setTimeout(() => setRound((r) => r + 1), 3200),
        );
      }
    }, 70);
    return () => {
      clearInterval(type);
      timers.forEach(clearTimeout);
    };
  }, [inView, round, reduce]);

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="dept-title">
      <div className="container grid grid-cols-1 items-center gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] xl:gap-12">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Hospitals and departments</p>
          <h2 id="dept-title" className="h-section mt-3">
            Set up once — every app uses the same list
          </h2>
          <p className="lede mt-4">
            Every hospital and clinic across your cities lives in one place, with its headquarters, headcount and
            departments. Add a department by typing its name under the hospital — it appears in every app.
          </p>
        </Reveal>

        <div ref={ref} className="card p-4 sm:p-6">
          <div className="flex items-center gap-2 rounded-xl border border-ink-100 bg-[#f8f9fc] p-2">
            <span className="flex-1 truncate px-2 text-sm text-ink-900">
              {typed || <span className="text-ink-400">New department, e.g. Radiology</span>}
              <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-ink-800" />
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-ink-800 px-3 py-1.5 text-xs font-semibold text-white">
              <Plus className="h-3.5 w-3.5" /> Add
            </span>
          </div>
          <p className="mt-2 text-xs text-ink-500">Northwind General · Mumbai</p>

          <div className="mt-5 grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-3 md:grid-cols-5 sm:gap-3">
            {shown.map((app, ai) => {
              const Icon = app.icon;
              return (
                <div key={app.slug} className="rounded-xl border border-ink-100 p-2.5">
                  <p className="flex items-center gap-1.5 text-xs font-semibold">
                    <span className="grid h-5 w-5 place-items-center rounded-md text-white" style={{ background: app.color }}>
                      <Icon className="h-3 w-3" />
                    </span>
                    {app.name}
                  </p>
                  <div className="mt-2 space-y-1">
                    <AnimatePresence initial={false}>
                      {added.map((d) => (
                        <motion.p
                          key={d}
                          layout
                          initial={{ opacity: 0, scale: 0.6, y: -14 }}
                          animate={{ opacity: 1, scale: 1, y: 0, backgroundColor: ["#dcfce7", "#f3f5fb"] }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ delay: ai * 0.09, duration: 0.45, backgroundColor: { delay: ai * 0.09 + 0.6, duration: 1 } }}
                          className="truncate rounded-md px-1.5 py-1 text-[11px] font-medium text-ink-900"
                        >
                          {d}
                        </motion.p>
                      ))}
                    </AnimatePresence>
                    {base.map((d) => (
                      <p key={d} className="truncate rounded-md bg-ink-50 px-1.5 py-1 text-[11px] text-ink-500">
                        {d}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
