"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  ClipboardList,
  Home,
  Layers,
  MapPin,
  ShieldOff,
  Send,
  Upload,
  Download,
  UserPlus,
  Users,
  Plus,
} from "lucide-react";
import { CountUp } from "@/components/ui/Motion";
import { TopBar } from "./Chrome";
import { cn } from "@/lib/utils";

const nav = [
  { icon: Home, label: "Overview", active: true },
  { icon: Users, label: "People" },
  { icon: MapPin, label: "Hospitals" },
  { icon: Layers, label: "Departments" },
  { icon: ClipboardList, label: "Audit log" },
  { icon: Building2, label: "Organizations" },
];

const stats = [
  { label: "Organizations", value: 3 },
  { label: "Active people", value: 63 },
  { label: "Invited, not joined", value: 1, tone: "text-band-warning" },
  { label: "Hospitals", value: 5 },
  { label: "Departments", value: 35 },
  { label: "Deactivated", value: 4, tone: "text-ink-400" },
];

const admins = [
  ["Akash Hegde", "Org admin"],
  ["Bhavana Shetty", "Org admin"],
  ["Chetan Gowda", "Branch admin"],
  ["Mohammed Ahmed", "Org admin"],
];

export function AccountsSidebar({ active = "Overview" }: { active?: string }) {
  return (
    <aside className="hidden w-[132px] shrink-0 flex-col bg-gradient-to-b from-ink-800 to-ink-900 p-2.5 text-white sm:flex">
      <p className="text-[11px] font-bold">Accounts</p>
      <p className="text-[7px] text-ink-300">SAZ Vida people &amp; access</p>
      <div className="mt-3 space-y-0.5">
        {nav.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[9px]",
              label === active ? "bg-white/15 font-semibold ring-1 ring-white/20" : "text-ink-200",
            )}
          >
            <Icon className="h-3 w-3" /> {label}
          </span>
        ))}
      </div>
    </aside>
  );
}

export function ConsoleMockup() {
  const reduce = useReducedMotion();
  return (
    <div className="ui-window flex">
      <AccountsSidebar />
      <div className="min-w-0 flex-1 bg-[#f8f9fc]">
        <TopBar />
        <div className="p-3 sm:p-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[9px] text-ink-500">Friday, 9 October</p>
              <p className="font-display text-[15px] font-bold">Hello, Platform</p>
              <p className="text-[9px] text-ink-500">All organizations · Platform admin</p>
            </div>
            <div className="flex gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-md bg-ink-800 px-2 py-1 text-[9px] font-semibold text-white">
                <UserPlus className="h-3 w-3" /> Add person
              </span>
              <span className="hidden items-center gap-1 rounded-md border border-ink-100 bg-white px-2 py-1 text-[9px] font-medium sm:inline-flex">
                <Plus className="h-3 w-3" /> Add hospital
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1.5 lg:grid-cols-6">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-ink-100 bg-white p-2">
                <p className="truncate text-[7.5px] font-semibold uppercase tracking-wide text-ink-400">{s.label}</p>
                <CountUp to={s.value} className={cn("mt-0.5 block font-display text-[17px] font-bold", s.tone)} />
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid gap-2 lg:grid-cols-[1.6fr_1fr]">
            <div className="overflow-hidden rounded-lg border border-amber-200 bg-white">
              <p className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1.5 text-[9px] font-semibold text-amber-800">
                <ShieldOff className="h-3 w-3" /> Admins without two-step verification
              </p>
              {admins.map(([name, role], i) => (
                <motion.div
                  key={name}
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="flex items-center justify-between border-t border-ink-50 px-2.5 py-1.5 text-[9px]"
                >
                  <span className="font-medium">{name}</span>
                  <span className="flex items-center gap-2">
                    <span className={cn("rounded px-1 py-0.5 text-[8px] font-semibold", role === "Org admin" ? "bg-ink-50 text-ink-600" : "bg-violet-50 text-violet-700")}>{role}</span>
                    <span className="hidden text-ink-400 sm:inline">asked to set it up at next sign-in</span>
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="rounded-lg border border-ink-100 bg-white p-2.5 text-[9px]">
                <p className="flex justify-between font-semibold">Waiting to join <span className="text-app-licensify">All</span></p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span>
                    <span className="block font-medium">Shaukat Ali</span>
                    <span className="text-[8px] text-ink-400">Invited 21 hours ago</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded border border-ink-100 px-1.5 py-0.5 font-medium">
                    <Send className="h-2.5 w-2.5" /> Resend
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-ink-100 bg-white p-2.5 text-[9px]">
                <p className="font-semibold">Shortcuts</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-ink-600"><Upload className="h-2.5 w-2.5" /> Import people from CSV</p>
                <p className="mt-1 flex items-center gap-1.5 text-ink-600"><Download className="h-2.5 w-2.5" /> Export people</p>
                <p className="mt-1 flex items-center gap-1.5 text-ink-600"><Layers className="h-2.5 w-2.5" /> Manage departments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
