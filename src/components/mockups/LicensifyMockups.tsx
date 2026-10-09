"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  FileText,
  Home,
  LogOut,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  ChevronsLeft,
  FileStack,
  Clock,
  CircleAlert,
  CircleX,
  Inbox,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { CountUp } from "@/components/ui/Motion";
import { dashboardStats, expiryOutlook, statusSlices } from "@/lib/licensify";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const sideNav = [
  { icon: Home, label: "Home" },
  { icon: FileText, label: "License Management" },
  { icon: Search, label: "Inspections" },
  { icon: Users, label: "Administrations" },
  { icon: MessageCircle, label: "Feedback" },
];

export function LicensifySidebar({ active = "Home" }: { active?: string }) {
  return (
    <aside className="hidden w-[128px] shrink-0 flex-col bg-gradient-to-b from-[#3f7dc9] to-[#2b5fa6] p-2.5 text-white sm:flex">
      <p className="flex items-center justify-between text-[12px] font-bold">
        Licensify <ChevronsLeft className="h-3 w-3 opacity-70" />
      </p>
      <div className="mt-3 space-y-0.5">
        {sideNav.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className={cn("flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[9px]", label === active ? "bg-white/20 font-semibold ring-1 ring-white/25" : "text-white/80")}
          >
            <Icon className="h-3 w-3" /> {label}
          </span>
        ))}
      </div>
      <span className="mt-auto flex items-center gap-1.5 px-2 pt-6 text-[9px] text-white/80">
        <LogOut className="h-3 w-3" /> Logout
      </span>
    </aside>
  );
}

export function LicensifyTopBar() {
  return (
    <div className="flex h-10 items-center justify-between border-b border-ink-100 bg-white px-3">
      <span className="flex items-center gap-1.5">
        <LogoMark className="h-4" />
        <span className="font-display text-[10px] font-bold leading-none text-app-licensify">
          SAZ Vida
          <span className="block text-[6px] font-medium uppercase tracking-wider text-ink-400">Healthcare services</span>
        </span>
      </span>
      <span className="flex items-center gap-2">
        <Bell className="h-3 w-3 text-ink-400" />
        <span className="grid h-5 w-5 place-items-center rounded-full bg-violet-500 text-[8px] font-bold text-white">PA</span>
        <span className="hidden text-[9px] font-semibold sm:block">Platform Admin</span>
      </span>
    </div>
  );
}

const toneIcon = {
  violet: [FileStack, "bg-violet-50 text-violet-600"],
  green: [ShieldCheck, "bg-emerald-50 text-emerald-600"],
  orange: [CircleAlert, "bg-orange-50 text-orange-600"],
  amber: [Clock, "bg-amber-50 text-amber-600"],
  red: [CircleX, "bg-red-50 text-red-600"],
  gray: [Inbox, "bg-ink-50 text-ink-500"],
} as const;

function Donut() {
  const reduce = useReducedMotion();
  const total = statusSlices.reduce((s, x) => s + x.value, 0);
  const r = 34;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
      {statusSlices.map((s, i) => {
        const len = (s.value / total) * c;
        const offset = acc;
        acc += len;
        return (
          <motion.circle
            key={s.label}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="13"
            strokeDashoffset={-offset}
            initial={reduce ? false : { strokeDasharray: `0 ${c}` }}
            whileInView={{ strokeDasharray: `${Math.max(len - 1.2, 0)} ${c}` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease }}
          />
        );
      })}
    </svg>
  );
}

function OutlookBars() {
  const reduce = useReducedMotion();
  const max = 12;
  return (
    <div className="flex h-[78px] items-end gap-[5px] border-b border-ink-100">
      {expiryOutlook.map((d, i) => {
        const v = d.expired || d.soon || d.later;
        const color = d.expired ? "#d0443c" : d.soon ? "#e6b43a" : "#5b8def";
        return (
          <div key={d.m} className="flex flex-1 flex-col items-center gap-0.5">
            <motion.div
              initial={reduce ? false : { height: 0 }}
              whileInView={{ height: `${(v / max) * 62}px` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.05, ease }}
              className="w-full max-w-[14px] rounded-t-[3px]"
              style={{ background: color }}
            />
          </div>
        );
      })}
    </div>
  );
}

export function LicensifyDashboard() {
  return (
    <div className="ui-window flex">
      <LicensifySidebar />
      <div className="min-w-0 flex-1 bg-[#f7f9fd]">
        <LicensifyTopBar />
        <div className="p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-display text-[14px] font-bold">Good afternoon, Platform 👋</p>
              <p className="flex items-center gap-1 text-[8.5px] text-ink-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> All hospitals · Updated just now
              </p>
            </div>
            <div className="flex gap-1.5">
              <span className="hidden items-center gap-1 rounded-md border border-ink-100 bg-white px-2 py-1 text-[9px] font-medium sm:inline-flex">
                <RefreshCw className="h-2.5 w-2.5" /> Refresh
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-violet-600 px-2 py-1 text-[9px] font-semibold text-white">
                <Plus className="h-2.5 w-2.5" /> Add license
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1.5 lg:grid-cols-6">
            {dashboardStats.map((s) => {
              const [Icon, cls] = toneIcon[s.tone];
              return (
                <div key={s.label} className="rounded-lg border border-ink-100 bg-white p-2">
                  <span className={cn("grid h-5 w-5 place-items-center rounded-md", cls)}>
                    <Icon className="h-3 w-3" />
                  </span>
                  <CountUp
                    to={s.value}
                    decimals={"decimals" in s ? s.decimals : 0}
                    suffix={"suffix" in s ? s.suffix : ""}
                    className="mt-1.5 block font-display text-[15px] font-bold leading-none"
                  />
                  <p className="mt-1 truncate text-[7.5px] text-ink-500">{s.label}</p>
                  {"bar" in s ? (
                    <span className="mt-1 block h-1 overflow-hidden rounded-full bg-ink-50">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.bar * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.5, ease }}
                        className="block h-full rounded-full bg-amber-400"
                      />
                    </span>
                  ) : (
                    <p className="truncate text-[7px] text-ink-400">{s.sub}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
            <div className="rounded-lg border border-ink-100 bg-white p-2.5">
              <p className="text-[9.5px] font-semibold">License status</p>
              <p className="text-[7.5px] text-ink-400">Click a slice to see these licenses</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="relative h-[86px] w-[86px] shrink-0">
                  <Donut />
                  <span className="absolute inset-0 grid place-items-center font-display text-[15px] font-bold">76</span>
                </div>
                <ul className="space-y-0.5 text-[8px]">
                  {statusSlices.map((s) => (
                    <li key={s.label} className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                      {s.label} <span className="text-ink-400">{s.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-lg border border-ink-100 bg-white p-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9.5px] font-semibold">Expiry outlook</p>
                  <p className="text-[7.5px] text-ink-400">Licenses expiring each month over the next year</p>
                </div>
                <span className="hidden gap-1.5 text-[7px] text-ink-500 sm:flex">
                  <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded-sm bg-band-critical" />Expired</span>
                  <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded-sm bg-band-upcoming" />Next 3 months</span>
                  <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded-sm bg-band-later" />Later</span>
                </span>
              </div>
              <div className="mt-2">
                <OutlookBars />
                <div className="mt-0.5 flex gap-[5px] text-[6.5px] text-ink-400">
                  {expiryOutlook.map((d) => (
                    <span key={d.m} className="flex-1 text-center">{d.m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

