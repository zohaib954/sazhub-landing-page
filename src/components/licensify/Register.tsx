"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Eye, Plus, Search, User } from "lucide-react";
import { LicensifySidebar, LicensifyTopBar } from "@/components/mockups/LicensifyMockups";
import { StatusPill } from "@/components/mockups/Chrome";
import { licences, type LicenceStatus } from "@/lib/licensify";
import { cn } from "@/lib/utils";

const filters: { label: string; status?: LicenceStatus; count: number; color: string }[] = [
  { label: "All licenses", count: 76, color: "#7c4ddb" },
  { label: "Active", status: "Active", count: 29, color: "#3fa463" },
  { label: "Expiring", status: "Expiring", count: 26, color: "#e6b43a" },
  { label: "Expired", status: "Expired", count: 12, color: "#d0443c" },
  { label: "Pending approval", status: "Pending", count: 5, color: "#8a94b0" },
  { label: "Under renewal", status: "Under renewal", count: 8, color: "#5b8def" },
];

const tone: Record<LicenceStatus, "green" | "amber" | "red" | "gray" | "blue"> = {
  Active: "green",
  Expiring: "amber",
  Expired: "red",
  Pending: "gray",
  "Under renewal": "blue",
};

export function RegisterMockup() {
  const [active, setActive] = useState(0);
  const [mine, setMine] = useState(false);
  const f = filters[active];
  const rows = licences.filter((l) => (!f.status || l.status === f.status) && (!mine || l.owner === "Arjun Menon"));

  return (
    <div className="ui-window flex">
      <LicensifySidebar active="License Management" />
      <div className="min-w-0 flex-1 bg-[#f7f9fd]">
        <LicensifyTopBar />
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="font-display text-[14px] font-bold">Licenses</p>
              <p className="text-[8.5px] text-ink-500">76 licenses · 4 hospitals</p>
            </div>
            <div className="flex gap-1.5">
              <span className="hidden items-center gap-1 rounded-md border border-ink-100 bg-white px-2 py-1 text-[9px] font-medium sm:inline-flex">
                <Download className="h-2.5 w-2.5" /> Export CSV
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-violet-600 px-2 py-1 text-[9px] font-semibold text-white">
                <Plus className="h-2.5 w-2.5" /> Add license
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-6" role="tablist" aria-label="Filter licences by status">
            {filters.map((x, i) => (
              <button
                key={x.label}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-lg border bg-white p-2 text-left transition",
                  active === i ? "border-violet-400 ring-2 ring-violet-100" : "border-ink-100 hover:border-ink-200",
                )}
              >
                <span className="block font-display text-[15px] font-bold leading-none" style={{ color: i === 0 ? undefined : x.color }}>
                  {x.count}
                </span>
                <span className="mt-1 block truncate text-[8px] text-ink-500">{x.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-ink-100 bg-white p-1.5 text-[9px]">
            <span className="flex flex-1 items-center gap-1 text-ink-400">
              <Search className="h-3 w-3" /> Search name, number, authority, department, owner…
            </span>
            <button
              onClick={() => setMine((m) => !m)}
              className={cn("inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-medium transition", mine ? "border-violet-300 bg-violet-50 text-violet-700" : "border-ink-100")}
              aria-pressed={mine}
            >
              <User className="h-2.5 w-2.5" /> Only mine
            </button>
          </div>

          <div className="mt-2 overflow-hidden rounded-lg border border-ink-100 bg-white">
            <div className="grid grid-cols-[1.6fr_1fr_auto] gap-2 border-b border-ink-100 px-2.5 py-1.5 text-[7.5px] font-semibold uppercase tracking-wide text-ink-400 sm:grid-cols-[1.6fr_1fr_1fr_0.8fr_auto_14px]">
              <span>License</span>
              <span className="hidden sm:block">Department</span>
              <span>Owner</span>
              <span className="hidden sm:block">Expiry</span>
              <span>Status</span>
              <span className="hidden sm:block" />
            </div>
            <div className="min-h-[188px]">
              <AnimatePresence mode="popLayout" initial={false}>
                {rows.map((l) => (
                  <motion.div
                    key={l.number}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-[1.6fr_1fr_auto] items-center gap-2 border-b border-ink-50 px-2.5 py-1.5 text-[9px] last:border-0 sm:grid-cols-[1.6fr_1fr_1fr_0.8fr_auto_14px]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-semibold">{l.name}</span>
                      <span className="block truncate text-[7.5px] text-ink-400">{l.authority}</span>
                    </span>
                    <span className="hidden min-w-0 sm:block">
                      <span className="block truncate">{l.dept}</span>
                      <span className="block truncate text-[7.5px] text-ink-400">{l.site}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate">{l.owner}</span>
                      <span className="block text-[7.5px] text-ink-400">+2 responsible</span>
                    </span>
                    <span className="hidden sm:block">
                      <span className="block">{l.expiry}</span>
                      {l.note && <span className={cn("text-[7.5px] font-semibold", l.status === "Expired" ? "text-red-600" : "text-amber-600")}>{l.note}</span>}
                    </span>
                    <StatusPill tone={tone[l.status]}>{l.status}</StatusPill>
                    <Eye className="hidden h-3 w-3 text-ink-300 sm:block" />
                  </motion.div>
                ))}
                {rows.length === 0 && (
                  <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 text-center text-[10px] text-ink-400">
                    No licences match this filter.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
