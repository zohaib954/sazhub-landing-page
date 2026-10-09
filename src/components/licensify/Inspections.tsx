"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { StatusPill } from "@/components/mockups/Chrome";
import { departmentsCompliance, findings, permissionRoles, permissions } from "@/lib/licensify";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function ComplianceByDept() {
  const reduce = useReducedMotion();
  return (
    <div className="ui-window p-3 sm:p-4">
      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
        {[
          ["29", "All inspections", "text-ink-900"],
          ["8", "Upcoming", "text-blue-600"],
          ["5", "Overdue", "text-red-600"],
          ["12", "Completed", "text-emerald-600"],
          ["4", "Open critical", "text-orange-600"],
          ["16", "Open findings", "text-violet-600"],
        ].map(([n, l, c]) => (
          <div key={l} className="rounded-lg border border-ink-100 bg-white p-2">
            <p className={cn("font-display text-[15px] font-bold leading-none", c)}>{n}</p>
            <p className="mt-1 truncate text-[7.5px] text-ink-500">{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] font-semibold">
        Compliance by department <span className="font-normal text-ink-400">· 4 at risk</span>
      </p>
      <div className="mt-1.5 overflow-hidden rounded-lg border border-ink-100">
        {departmentsCompliance.map((d, i) => (
          <div key={d.dept + d.site} className="grid grid-cols-[minmax(0,1.4fr)_auto_minmax(0,1fr)] items-center gap-2 border-b border-ink-50 px-2.5 py-2 text-[9px] last:border-0 sm:grid-cols-[minmax(0,1.4fr)_auto_auto_minmax(0,1fr)]">
            <span className="min-w-0">
              <span className="block truncate font-semibold">{d.dept}</span>
              <span className="block truncate text-[7.5px] text-ink-400">{d.site}</span>
            </span>
            <StatusPill tone={d.status === "At risk" ? "red" : d.status === "Watch" ? "amber" : "green"}>{d.status}</StatusPill>
            <span className="hidden gap-1 sm:flex">
              {d.critical > 0 && <StatusPill tone="red">{d.critical} critical</StatusPill>}
              {d.major > 0 && <StatusPill tone="amber">{d.major} major</StatusPill>}
              {d.critical + d.major === 0 && <StatusPill tone="gray">none open</StatusPill>}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-50">
                <motion.span
                  initial={reduce ? false : { width: 0 }}
                  whileInView={{ width: `${d.closed}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.12, ease }}
                  className={cn("block h-full rounded-full", d.closed === 100 ? "bg-emerald-500" : "bg-amber-400")}
                />
              </span>
              <span className="w-7 text-right text-[8px] text-ink-500">{d.closed}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FindingsList() {
  const reduce = useReducedMotion();
  return (
    <div className="ui-window p-3 sm:p-4">
      <p className="font-display text-[13px] font-bold">Findings &amp; corrective actions</p>
      <p className="text-[8px] text-ink-500">Every inspection finding: who owns it, when it&apos;s due, and how it was closed.</p>
      <div className="mt-2.5 space-y-1.5">
        {findings.map((f, i) => (
          <motion.div
            key={f.text}
            initial={reduce ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease }}
            className="rounded-lg border border-ink-100 bg-white p-2.5 text-[9px]"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="flex min-w-0 items-start gap-1.5">
                <StatusPill tone={f.sev === "Critical" ? "red" : f.sev === "Major" ? "amber" : "gray"}>{f.sev}</StatusPill>
                <span className="font-semibold leading-snug">{f.text}</span>
              </span>
              <StatusPill tone={f.state === "Overdue" ? "red" : f.state === "Resolved" ? "green" : f.state === "In progress" ? "blue" : "amber"}>{f.state}</StatusPill>
            </div>
            <p className="mt-1 text-[8px] text-ink-500">
              <span className="font-medium text-violet-700">Action:</span> {f.action}
            </p>
            <p className="mt-0.5 text-[8px] text-ink-400">
              {f.licence} · Owner {f.owner} · Due {f.due}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function PermissionMatrix() {
  const reduce = useReducedMotion();
  return (
    <div className="ui-window overflow-x-auto p-3 sm:p-4">
      <p className="font-display text-[13px] font-bold">Built-in roles</p>
      <p className="text-[8px] text-ink-500">Each role comes with set permissions. Custom roles add extras on top.</p>
      <table className="mt-2.5 w-full min-w-[460px] border-collapse text-[9px]">
        <thead>
          <tr className="text-[7.5px] uppercase tracking-wide text-ink-400">
            <th className="py-1.5 text-left font-semibold">Permission</th>
            {permissionRoles.map((r) => (
              <th key={r} className="px-1 py-1.5 text-center font-semibold">
                {r}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map((p, ri) => (
            <tr key={p.name} className="border-t border-ink-50">
              <td className="py-1.5 pr-2 font-medium">{p.name}</td>
              {p.grants.map((g, ci) => (
                <td key={ci} className="px-1 py-1.5 text-center">
                  <motion.span
                    initial={reduce ? false : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 + ri * 0.06 + ci * 0.03 }}
                    className={cn("inline-grid h-4 w-4 place-items-center rounded-full", g ? "bg-emerald-50 text-emerald-600" : "text-ink-200")}
                  >
                    {g ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : <Minus className="h-2.5 w-2.5" />}
                  </motion.span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
