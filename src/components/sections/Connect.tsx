"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Check, KeyRound, Users } from "lucide-react";
import { apps, type SazApp } from "@/lib/apps";
import { LogoMark } from "@/components/Logo";
import { useStageScale } from "@/components/ui/useStageScale";
import { cn } from "@/lib/utils";

const satellites = apps.filter((a) => a.slug !== "console");

type Layout = {
  W: number;
  H: number;
  hub: { x: number; y: number };
  node: { w: number; h: number };
  /** Final (connected) centre of each satellite */
  final: [number, number][];
  /** Isolated centre + rotation of each satellite */
  island: [number, number, number][];
  /** Index pairs joined by "manual copy" lines while isolated */
  copies: [number, number][];
};

function ring(cx: number, cy: number, rx: number, ry: number, n: number, offsetDeg: number): [number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((offsetDeg + (360 / n) * i) * Math.PI) / 180;
    return [Math.round(cx + rx * Math.cos(a)), Math.round(cy + ry * Math.sin(a))];
  });
}

const wide: Layout = {
  W: 900,
  H: 560,
  hub: { x: 450, y: 280 },
  node: { w: 178, h: 58 },
  final: ring(450, 280, 330, 210, 6, -150),
  island: [
    [120, 70, -6],
    [470, 40, 4],
    [800, 110, -5],
    [790, 470, 6],
    [430, 520, 3],
    [100, 420, 5],
  ],
  copies: [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 5],
    [4, 3],
  ],
};

const narrow: Layout = {
  W: 360,
  H: 460,
  hub: { x: 180, y: 230 },
  node: { w: 132, h: 50 },
  final: ring(180, 230, 112, 180, 6, -120),
  island: [
    [75, 40, -6],
    [280, 75, 5],
    [70, 185, 4],
    [290, 260, -5],
    [80, 360, 6],
    [275, 420, -3],
  ],
  copies: [
    [0, 1],
    [1, 3],
    [2, 4],
    [3, 5],
  ],
};

const steps = [
  {
    kicker: "Before",
    title: "Every tool is an island",
    body: "Separate logins, staff lists re-typed by hand, department names that never quite match — and no single record of who changed what.",
  },
  {
    kicker: "Connect",
    title: "Plug every app into one Console",
    body: "The SAZ Vida Console holds your people, hospitals, departments and access. Every app reads from the same source.",
  },
  {
    kicker: "After",
    title: "Change it once, every app updates",
    body: "A new hire, a transfer or a new department is entered once — it appears in HR, Audit, Licensify and the rest, and the change is logged.",
  },
];

/* ---------- Stage parts ---------- */

function Node({ app, i, layout, p }: { app: SazApp; i: number; layout: Layout; p: MotionValue<number> }) {
  const [fx, fy] = layout.final[i];
  const [ix, iy, ir] = layout.island[i];
  const t = useTransform(p, [0.3 + i * 0.015, 0.58 + i * 0.015], [0, 1], { clamp: true });
  const x = useTransform(t, [0, 1], [ix - layout.node.w / 2, fx - layout.node.w / 2]);
  const y = useTransform(t, [0, 1], [iy - layout.node.h / 2, fy - layout.node.h / 2]);
  const rotate = useTransform(t, [0, 1], [ir, 0]);
  const isolated = useTransform(t, [0, 0.35], [1, 0]);
  const synced = useTransform(p, [0.72 + i * 0.02, 0.8 + i * 0.02], [0, 1]);
  const ringOpacity = useTransform(p, [0.7, 0.8], [0, 1]);
  const Icon = app.icon;
  const small = layout.node.w < 150;

  return (
    <motion.div className="absolute left-0 top-0" style={{ x, y, rotate, width: layout.node.w, height: layout.node.h }}>
      <div className="relative flex h-full items-center gap-2.5 rounded-xl border border-ink-100 bg-white px-2.5 shadow-card">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white" style={{ background: app.color }}>
          <Icon className="h-4 w-4" />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block text-[13px] font-bold text-ink-900">{app.name}</span>
          {!small && <span className="block truncate text-[10.5px] text-ink-500">{app.short}</span>}
        </span>
        <motion.span
          style={{ opacity: ringOpacity, boxShadow: `0 0 0 2px ${app.color}55, 0 10px 30px -10px ${app.color}` }}
          className="pointer-events-none absolute inset-0 rounded-xl"
        />
      </div>
      {/* Isolated state badges */}
      <motion.div style={{ opacity: isolated }} className="absolute -bottom-3 left-2 flex gap-1">
        <span className="inline-flex items-center gap-0.5 rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-semibold text-band-critical ring-1 ring-red-200">
          <KeyRound className="h-2.5 w-2.5" /> {small ? "login" : "own login"}
        </span>
        {!small && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 ring-1 ring-amber-200">
            <Users className="h-2.5 w-2.5" /> own staff list
          </span>
        )}
      </motion.div>
      {/* Synced badge */}
      <motion.span
        style={{ opacity: synced }}
        className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white shadow ring-2 ring-white"
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </motion.span>
    </motion.div>
  );
}

function Links({ layout, p, reduce }: { layout: Layout; p: MotionValue<number>; reduce: boolean | null }) {
  const copyOpacity = useTransform(p, [0, 0.25, 0.36], [1, 1, 0]);
  const draw = useTransform(p, [0.55, 0.72], [0, 1]);
  const pulseOpacity = useTransform(p, [0.72, 0.8], [0, 1]);
  const { hub } = layout;

  return (
    <svg className="absolute inset-0 overflow-visible" width={layout.W} height={layout.H} aria-hidden="true">
      <defs>
        <radialGradient id="hubGlow">
          <stop offset="0%" stopColor="#6cbcf5" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#6cbcf5" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Manual copy lines between islands */}
      <motion.g style={{ opacity: copyOpacity }}>
        {layout.copies.map(([a, b]) => {
          const [ax, ay] = layout.island[a];
          const [bx, by] = layout.island[b];
          const mx = (ax + bx) / 2;
          const my = (ay + by) / 2;
          return (
            <g key={`${a}-${b}`}>
              <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#d0443c" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="5 6">
                {!reduce && <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.2s" repeatCount="indefinite" />}
              </line>
              <g transform={`translate(${mx} ${my})`}>
                <rect x="-34" y="-10" width="68" height="20" rx="10" fill="#fff" stroke="#f3c3bf" />
                <text textAnchor="middle" y="4" fontSize="10" fontWeight="600" fill="#b5362f">
                  re-typed ✕
                </text>
              </g>
            </g>
          );
        })}
      </motion.g>

      {/* Hub spokes */}
      {layout.final.map(([x, y], i) => {
        const d = `M ${hub.x} ${hub.y} L ${x} ${y}`;
        return (
          <g key={i}>
            <motion.path d={d} stroke={satellites[i].color} strokeOpacity=".55" strokeWidth="2" fill="none" style={{ pathLength: draw }} />
            {!reduce && (
              <motion.circle r="4.5" fill={satellites[i].color} style={{ opacity: pulseOpacity }}>
                <animateMotion dur="2.4s" begin={`${i * 0.35}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
              </motion.circle>
            )}
          </g>
        );
      })}
      <motion.circle cx={hub.x} cy={hub.y} r={layout.W > 500 ? 150 : 90} fill="url(#hubGlow)" style={{ opacity: draw }} />
    </svg>
  );
}

function Hub({ layout, p }: { layout: Layout; p: MotionValue<number> }) {
  const scale = useTransform(p, [0.38, 0.56], [0.4, 1]);
  const opacity = useTransform(p, [0.38, 0.5], [0, 1]);
  const size = layout.W > 500 ? 132 : 104;
  return (
    <motion.div
      className="absolute"
      style={{ left: layout.hub.x - size / 2, top: layout.hub.y - size / 2, width: size, height: size, scale, opacity }}
    >
      <div className="relative grid h-full w-full place-items-center rounded-[28px] bg-ink-900 text-center text-white shadow-float ring-4 ring-white">
        <span className="absolute inset-0 animate-ping rounded-[28px] bg-sky-400/20 [animation-duration:2.4s]" />
        <span className="relative flex flex-col items-center gap-1.5">
          <LogoMark tone="light" className={layout.W > 500 ? "h-11" : "h-8"} />
          <span className="text-[11px] font-bold leading-tight">
            SAZ Vida
            <span className="block text-[9px] font-medium text-sky-300">Console</span>
          </span>
        </span>
      </div>
    </motion.div>
  );
}

/* ---------- Section ---------- */

export function Connect() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const done = useMotionValue(1);
  const p = reduce ? done : smooth;
  const [step, setStep] = useState(reduce ? 2 : 0);

  useMotionValueEvent(p, "change", (v) => setStep(v < 0.33 ? 0 : v < 0.68 ? 1 : 2));

  const { ref, scale, mobile, ready } = useStageScale({ w: wide.W, h: wide.H }, { w: narrow.W, h: narrow.H }, { breakpoint: 600, fitHeight: true });
  const layout = mobile ? narrow : wide;
  const bar = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <section id="platform" ref={section} className="relative h-[320vh] bg-white" aria-labelledby="connect-title">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-16">
        <div className="bg-grid-light pointer-events-none absolute inset-0" />
        <div className="container relative grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-4 py-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:grid-rows-1 lg:items-center lg:gap-10 lg:py-10">
          <div>
            <p className="eyebrow">The platform</p>
            <h2 id="connect-title" className="mt-3 text-balance font-display text-2xl font-extrabold leading-tight sm:text-4xl">
              From scattered tools to one connected platform
            </h2>

            <ol className="mt-6 hidden space-y-2 lg:block">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn(
                    "rounded-2xl border p-4 transition-all duration-500",
                    step === i ? "border-ink-100 bg-white shadow-card" : "border-transparent opacity-45",
                  )}
                >
                  <p className={cn("text-[11px] font-bold uppercase tracking-widest", i === 0 ? "text-band-critical" : i === 1 ? "text-app-licensify" : "text-emerald-600")}>
                    {s.kicker}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold">{s.title}</p>
                  <p className={cn("overflow-hidden text-sm leading-relaxed text-ink-600 transition-all duration-500", step === i ? "mt-1 max-h-40" : "max-h-0")}>{s.body}</p>
                </li>
              ))}
            </ol>

            {/* Mobile: only the active step */}
            <div className="mt-3 min-h-[92px] lg:hidden" aria-live="polite">
              <p className={cn("text-[11px] font-bold uppercase tracking-widest", step === 0 ? "text-band-critical" : step === 1 ? "text-app-licensify" : "text-emerald-600")}>
                {steps[step].kicker} · {steps[step].title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{steps[step].body}</p>
            </div>

            <div className="mt-4 hidden h-1 overflow-hidden rounded-full bg-ink-50 lg:block">
              <motion.div style={{ width: bar }} className="h-full rounded-full bg-gradient-to-r from-band-critical via-app-licensify to-emerald-500" />
            </div>
          </div>

          <div ref={ref} className="relative flex min-h-0 min-w-0 items-center justify-center">
            <div className={cn("relative transition-opacity duration-500", ready ? "opacity-100" : "opacity-0")} style={{ width: layout.W * scale, height: layout.H * scale }}>
              <div className="absolute left-0 top-0 origin-top-left" style={{ width: layout.W, height: layout.H, transform: `scale(${scale})` }}>
                <Links layout={layout} p={p} reduce={reduce} />
                <Hub layout={layout} p={p} />
                {satellites.map((app, i) => (
                  <Node key={`${app.slug}-${mobile}`} app={app} i={i} layout={layout} p={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
