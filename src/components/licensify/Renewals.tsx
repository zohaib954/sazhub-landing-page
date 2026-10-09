"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Clock, Download, Play } from "lucide-react";
import { LicensifySidebar, LicensifyTopBar } from "@/components/mockups/LicensifyMockups";
import { bands, weekly } from "@/lib/licensify";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const renewalRows = [
  { days: 4, name: "Narcotic Drugs License (NDPS)", dept: "Pharmacy", site: "Northwind Speciality, Pune", owner: "Arjun Menon" },
  { days: 9, name: "Fire NOC", dept: "Facility & Fire Safety", site: "Greenfield Hospital, Bengaluru", owner: "Raghav Iyengar" },
  { days: 21, name: "Pollution Consent (CTO)", dept: "Biomedical Waste Mgmt", site: "Northwind General, Mumbai", owner: "Kunal More" },
];

const stages = ["Not started", "In progress", "Renewed"] as const;

export function RenewalsMockup() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<number[]>([0, 1, 0]);
  const [band, setBand] = useState<number | null>(null);
  const max = 4;

  const advance = (i: number) => setStage((s) => s.map((v, j) => (j === i ? Math.min(v + 1, 2) : v)));

  return (
    <div className="ui-window flex">
      <LicensifySidebar active="License Management" />
      <div className="min-w-0 flex-1 bg-[#f7f9fd]">
        <LicensifyTopBar />
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-[14px] font-bold">Near expiry</p>
              <p className="text-[8.5px] text-ink-500">
                26 licenses expire in the next 90 days · 4 hospitals · <span className="font-semibold text-red-600">12 already expired →</span>
              </p>
            </div>
            <span className="hidden items-center gap-1 rounded-md border border-ink-100 bg-white px-2 py-1 text-[9px] font-medium sm:inline-flex">
              <Download className="h-2.5 w-2.5" /> Export CSV
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
            <div className="grid grid-cols-2 gap-1.5">
              {bands.map((b, i) => (
                <button
                  key={b.id}
                  onMouseEnter={() => setBand(i)}
                  onMouseLeave={() => setBand(null)}
                  onFocus={() => setBand(i)}
                  onBlur={() => setBand(null)}
                  className={cn("rounded-lg border bg-white p-2 text-left transition", band === i ? "border-ink-300 shadow-card" : "border-ink-100")}
                >
                  <span className="flex items-center justify-between text-[7.5px] text-ink-400">
                    <span className="h-2 w-2 rounded-full" style={{ background: b.color }} /> {b.range}
                  </span>
                  <span className="mt-1 block font-display text-[16px] font-bold leading-none" style={{ color: b.color }}>
                    {b.count}
                  </span>
                  <span className="text-[8px] text-ink-600">{b.label}</span>
                  <span className="mt-1 block h-1 overflow-hidden rounded-full bg-ink-50">
                    <motion.span
                      initial={reduce ? false : { width: 0 }}
                      whileInView={{ width: `${(b.count / 8) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1, ease }}
                      className="block h-full rounded-full"
                      style={{ background: b.color }}
                    />
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-ink-100 bg-white p-2.5">
              <p className="text-[9.5px] font-semibold">Expiry timeline</p>
              <p className="text-[7.5px] text-ink-400">Licenses expiring each week — hover a band to focus</p>
              <div className="mt-2 flex h-[86px] items-end gap-1 border-b border-ink-100">
                {weekly.map((w, i) => {
                  const color = bands[w.band].color;
                  const dim = band !== null && band !== w.band;
                  return (
                    <div key={w.w} className="flex h-full flex-1 flex-col items-center justify-end">
                      {w.n > 0 && <span className="text-[7px] text-ink-400">{w.n}</span>}
                      <motion.div
                        initial={reduce ? false : { height: 0 }}
                        whileInView={{ height: `${(w.n / max) * 70}px` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 + i * 0.05, ease }}
                        animate={{ opacity: dim ? 0.2 : 1 }}
                        className="w-full max-w-[16px] rounded-t-[3px]"
                        style={{ background: color }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-0.5 flex gap-1 text-[6px] text-ink-400">
                {weekly.map((w, i) => (
                  <span key={w.w} className="flex-1 truncate text-center">
                    {i % 2 === 0 ? w.w : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2 overflow-hidden rounded-lg border border-ink-100 bg-white">
            <div className="grid grid-cols-[46px_minmax(0,1fr)_auto] gap-2 border-b border-ink-100 px-2.5 py-1.5 text-[7.5px] font-semibold uppercase tracking-wide text-ink-400 sm:grid-cols-[46px_minmax(0,1.4fr)_minmax(0,1fr)_auto]">
              <span>Days left</span>
              <span>License</span>
              <span className="hidden sm:block">Owner</span>
              <span>Renewal</span>
            </div>
            {renewalRows.map((r, i) => {
              const s = stage[i];
              return (
                <div key={r.name} className="grid grid-cols-[46px_minmax(0,1fr)_auto] items-center gap-2 border-b border-ink-50 px-2.5 py-2 text-[9px] last:border-0 sm:grid-cols-[46px_minmax(0,1.4fr)_minmax(0,1fr)_auto]">
                  <span
                    className={cn(
                      "w-fit rounded px-1.5 py-0.5 text-[8.5px] font-bold",
                      r.days <= 15 ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600",
                    )}
                  >
                    {r.days}d
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">{r.name}</span>
                    <span className="block truncate text-[7.5px] text-ink-400">
                      {r.dept} · {r.site}
                    </span>
                  </span>
                  <span className="hidden truncate sm:block">{r.owner}</span>
                  <button
                    onClick={() => advance(i)}
                    disabled={s === 2}
                    className={cn(
                      "relative inline-flex min-w-[86px] items-center justify-center gap-1 overflow-hidden rounded-md px-2 py-1 text-[8.5px] font-semibold transition",
                      s === 0 && "bg-violet-600 text-white hover:bg-violet-700",
                      s === 1 && "bg-blue-50 text-blue-700 ring-1 ring-blue-200 hover:bg-blue-100",
                      s === 2 && "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
                    )}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={s}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center gap-1"
                      >
                        {s === 0 && (
                          <>
                            <Play className="h-2.5 w-2.5" /> Start renewal
                          </>
                        )}
                        {s === 1 && (
                          <>
                            <Clock className="h-2.5 w-2.5" /> In progress
                          </>
                        )}
                        {s === 2 && (
                          <>
                            <Check className="h-2.5 w-2.5" /> {stages[2]}
                          </>
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-center text-[8.5px] text-ink-400">Try it: click a renewal to move it along.</p>
        </div>
      </div>
    </div>
  );
}
