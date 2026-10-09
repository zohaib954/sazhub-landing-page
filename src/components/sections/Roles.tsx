"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Building2, Hospital } from "lucide-react";
import { apps, type AppSlug } from "@/lib/apps";
import { Reveal } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

const orgs = [
  { name: "Sunrise Healthcare", sites: ["Sunrise Hospital, Andheri", "Sunrise Multispeciality, Pune"] },
  { name: "Lotus Care", sites: ["Lotus Care Hospital, Bengaluru", "Lotus Care Clinic, Mysuru"] },
  { name: "Care Banjara", sites: ["Care Banjara, Hyderabad"] },
];

type Role = {
  id: string;
  name: string;
  body: string;
  /** Which org / site indexes are in scope; "all" for everything. */
  scope: "all" | { org: number; site?: number };
  apps: AppSlug[];
};

const roles: Role[] = [
  {
    id: "platform",
    name: "Platform admin",
    body: "Runs SAZ Vida across every organization.",
    scope: "all",
    apps: ["hr", "audit", "quality", "compliance", "feedback", "licensify", "console"],
  },
  {
    id: "org",
    name: "Org admin",
    body: "Manages a hospital group's people, sites and app access.",
    scope: { org: 0 },
    apps: ["hr", "audit", "quality", "compliance", "feedback", "licensify", "console"],
  },
  {
    id: "branch",
    name: "Branch admin",
    body: "Manages the people at a single hospital.",
    scope: { org: 0, site: 0 },
    apps: ["hr", "audit", "licensify", "console"],
  },
  {
    id: "member",
    name: "Member",
    body: "Opens only the apps they've been given.",
    scope: { org: 0, site: 0 },
    apps: ["licensify", "feedback"],
  },
];

function inScope(role: Role, org: number, site?: number) {
  if (role.scope === "all") return true;
  if (role.scope.org !== org) return false;
  if (site === undefined) return role.scope.site === undefined;
  return role.scope.site === undefined || role.scope.site === site;
}

export function Roles() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduce = useReducedMotion();
  const role = roles[active];

  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % roles.length), 3200);
    return () => clearInterval(id);
  }, [auto, inView, reduce]);

  return (
    <section id="roles" className="relative scroll-mt-16 bg-[#f6f7fb] py-24 sm:py-32" aria-labelledby="roles-title">
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">People and roles</p>
          <h2 id="roles-title" className="h-section mt-3">
            One record per person, the right access for each
          </h2>
        </Reveal>

        <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" role="tablist" aria-label="Roles">
            {roles.map((r, i) => (
              <button
                key={r.id}
                role="tab"
                aria-selected={active === i}
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                className={cn(
                  "relative shrink-0 overflow-hidden rounded-2xl border p-4 text-left transition duration-300 lg:shrink",
                  active === i ? "border-ink-200 bg-white shadow-card" : "border-transparent hover:bg-white/60",
                )}
              >
                <span className={cn("inline-block rounded-full px-3 py-1 text-sm font-semibold transition", active === i ? "bg-ink-800 text-white" : "bg-ink-100 text-ink-700")}>
                  {r.name}
                </span>
                <span className="mt-2 hidden text-sm text-ink-600 lg:block">{r.body}</span>
                {active === i && auto && !reduce && (
                  <motion.span
                    key={`bar-${active}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: inView ? 1 : 0 }}
                    transition={{ duration: 3.2, ease: "linear" }}
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-app-licensify"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="card relative overflow-hidden p-5 sm:p-7" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.p
                key={role.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-sm text-ink-600 lg:hidden"
              >
                {role.body}
              </motion.p>
            </AnimatePresence>

            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-ink-400 lg:mt-0">Scope</p>
            <div className={cn("mt-3 rounded-2xl border-2 border-dashed p-3 transition-colors duration-500", role.scope === "all" ? "border-app-licensify/50 bg-blue-50/40" : "border-ink-100")}>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                <span className="h-2 w-2 rounded-full bg-app-licensify" /> SAZ Vida platform
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {orgs.map((org, oi) => {
                  const orgOn = inScope(role, oi) || role.scope === "all";
                  const anyOn = org.sites.some((_, si) => inScope(role, oi, si));
                  return (
                    <motion.div
                      key={org.name}
                      animate={{ opacity: anyOn ? 1 : 0.35, scale: anyOn ? 1 : 0.98 }}
                      transition={{ duration: 0.4 }}
                      className={cn("rounded-xl border p-3 transition-colors duration-500", orgOn ? "border-app-licensify/40 bg-white shadow-card" : "border-ink-100 bg-white")}
                    >
                      <p className="flex items-center gap-1.5 text-sm font-semibold">
                        <Building2 className="h-4 w-4 text-ink-400" /> {org.name}
                      </p>
                      <div className="mt-2 space-y-1.5">
                        {org.sites.map((site, si) => {
                          const on = inScope(role, oi, si);
                          return (
                            <motion.p
                              key={site}
                              animate={{ opacity: on ? 1 : 0.45 }}
                              className={cn(
                                "flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs transition-colors duration-500",
                                on ? "bg-blue-50 font-medium text-ink-900 ring-1 ring-blue-200" : "bg-ink-50 text-ink-500",
                              )}
                            >
                              <Hospital className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{site}</span>
                            </motion.p>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink-400">Apps they can open</p>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
              {apps.map((app) => {
                const on = role.apps.includes(app.slug);
                const Icon = app.icon;
                return (
                  <motion.div
                    key={app.slug}
                    animate={{ opacity: on ? 1 : 0.3, y: on ? 0 : 4, filter: on ? "grayscale(0)" : "grayscale(1)" }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-1.5 rounded-xl p-2 text-center"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: app.color, boxShadow: on ? `0 8px 20px -8px ${app.color}` : "none" }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[11px] font-medium text-ink-700">{app.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
