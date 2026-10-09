"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, LayoutGrid, Lock, SlidersHorizontal } from "lucide-react";
import { apps, type SazApp } from "@/lib/apps";
import { LogoMark } from "@/components/Logo";
import { useStageScale } from "@/components/ui/useStageScale";
import { ease } from "@/components/ui/Motion";

/* ---------- Stage geometry (design units, scaled to fit) ---------- */

type Layout = {
  W: number;
  H: number;
  win: { x: number; y: number; w: number; h: number };
  cols: number;
  pad: number;
  gap: number;
  gridTop: number;
  tileH: number;
  /** Where each tile floats before it joins (x, y, rotation) — same order as `apps`. */
  scatter: [number, number, number][];
};

const wideLayout: Layout = {
  W: 1000,
  H: 440,
  win: { x: 150, y: 30, w: 700, h: 380 },
  cols: 3,
  pad: 28,
  gap: 12,
  gridTop: 150,
  tileH: 62,
  scatter: [
    [-40, 40, -8],
    [800, 10, 7],
    [-60, 230, 5],
    [830, 210, -6],
    [10, 380, -4],
    [770, 370, 5],
    [400, 400, -3],
  ],
};

const narrowLayout: Layout = {
  W: 360,
  H: 450,
  win: { x: 6, y: 20, w: 348, h: 420 },
  cols: 2,
  pad: 14,
  gap: 10,
  gridTop: 140,
  tileH: 64,
  scatter: [
    [-10, 10, -8],
    [205, 30, 7],
    [-15, 180, 5],
    [215, 160, -6],
    [-10, 330, -4],
    [205, 320, 5],
    [100, 400, -3],
  ],
};

function slot(l: Layout, i: number) {
  const inner = l.win.w - l.pad * 2;
  const tileW = (inner - l.gap * (l.cols - 1)) / l.cols;
  const col = i % l.cols;
  const row = Math.floor(i / l.cols);
  return {
    x: l.win.x + l.pad + col * (tileW + l.gap),
    y: l.win.y + l.gridTop + row * (l.tileH + l.gap),
    w: tileW,
  };
}

/* ---------- Pieces ---------- */

function AppTile({ app, compact }: { app: SazApp; compact?: boolean }) {
  const Icon = app.icon;
  return (
    <div className="flex h-full items-center gap-2.5 rounded-xl border border-ink-100 bg-white px-3 shadow-[0_2px_10px_-4px_rgba(16,20,46,.15)]">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white" style={{ background: app.color }}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-[12px] font-semibold text-ink-900">{app.name === "Console" ? "Admin console" : app.name}</span>
        {!compact && <span className="block truncate text-[10px] text-ink-500">{app.short}</span>}
        <span className="block text-[9px] font-medium text-ink-600">Platform access</span>
      </span>
      <ArrowUpRight className="h-3 w-3 shrink-0 self-start text-ink-300 mt-2" />
    </div>
  );
}

function FlyingTile({
  app,
  i,
  layout,
  progress,
}: {
  app: SazApp;
  i: number;
  layout: Layout;
  progress: MotionValue<number>;
}) {
  const target = slot(layout, i);
  const [sx, sy, sr] = layout.scatter[i];
  const start = 0.04 + i * 0.045;
  const end = start + 0.36;
  const t = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const x = useTransform(t, [0, 1], [sx - target.x, 0]);
  const y = useTransform(t, [0, 1], [sy - target.y, 0]);
  const rotate = useTransform(t, [0, 1], [sr, 0]);
  const scale = useTransform(t, [0, 0.5, 1], [1.04, 1.08, 1]);
  const lockOpacity = useTransform(t, [0, 0.4], [1, 0]);
  const glow = useTransform(t, [0.85, 1], [0, 1]);

  return (
    <motion.div
      className="absolute z-20"
      style={{ left: target.x, top: target.y, width: target.w, height: layout.tileH, x, y, rotate, scale }}
    >
      <AppTile app={app} compact={layout.cols === 2} />
      <motion.span
        style={{ opacity: lockOpacity }}
        className="absolute -top-2.5 right-2 inline-flex items-center gap-1 rounded-full bg-ink-950 px-2 py-0.5 text-[9px] font-semibold text-white shadow"
      >
        <Lock className="h-2.5 w-2.5" /> Separate login
      </motion.span>
      <motion.span
        style={{ opacity: glow, boxShadow: `0 0 0 2px ${app.color}33` }}
        className="pointer-events-none absolute inset-0 rounded-xl"
      />
    </motion.div>
  );
}

function LauncherWindow({ layout, progress }: { layout: Layout; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.35], [0.35, 1]);
  const scale = useTransform(progress, [0, 0.4], [0.96, 1]);
  const signedIn = useTransform(progress, [0.62, 0.72], [0, 1]);
  const { win } = layout;
  const compact = layout.cols === 2;

  return (
    <motion.div
      style={{ left: win.x, top: win.y, width: win.w, height: win.h, opacity, scale }}
      className="ui-window absolute z-10 origin-bottom"
    >
      <div className="flex h-11 items-center justify-between border-b border-ink-100 px-4">
        <span className="flex items-center gap-1.5">
          <LogoMark className="h-5" />
          <span className="font-display text-[11px] font-bold leading-none text-ink-900">
            SAZ Vida
            <span className="block text-[7px] font-medium uppercase tracking-wider text-ink-400">Healthcare services</span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          {!compact && (
            <span className="inline-flex items-center gap-1 rounded-md border border-ink-100 px-2 py-1 text-[10px] font-medium">
              <SlidersHorizontal className="h-3 w-3" /> Admin console
            </span>
          )}
          <LayoutGrid className="h-3.5 w-3.5 text-ink-400" />
          <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-600 text-[9px] font-bold text-white">PA</span>
          {!compact && (
            <span className="leading-tight">
              <span className="block text-[10px] font-semibold">Platform Admin</span>
              <span className="block text-[8px] text-ink-400">Platform admin</span>
            </span>
          )}
        </span>
      </div>
      <div className="relative h-full bg-gradient-to-b from-[#eef2fb] to-white px-7 pt-6" style={{ paddingInline: layout.pad }}>
        <p className="text-[10px] font-medium text-ink-500">SAZ Vida staff</p>
        <p className="font-display text-[20px] font-bold text-ink-900">Welcome, Platform</p>
        <p className="text-[10.5px] text-ink-500">Open any app below. You&apos;re already signed in to all of them.</p>
        <motion.span
          style={{ opacity: signedIn }}
          className="absolute right-5 top-6 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200"
        >
          <Check className="h-3 w-3" /> Signed in once
        </motion.span>
      </div>
    </motion.div>
  );
}

function Slots({ layout, progress }: { layout: Layout; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.1, 0.3, 0.7, 0.8], [0, 1, 1, 0]);
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 z-[15]">
      {apps.map((a, i) => {
        const s = slot(layout, i);
        return (
          <div
            key={a.slug}
            className="absolute rounded-xl border border-dashed border-ink-200"
            style={{ left: s.x, top: s.y, width: s.w, height: layout.tileH }}
          />
        );
      })}
    </motion.div>
  );
}

/* ---------- Section ---------- */

export function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Assembly starts as the stage scrolls into view and finishes while it is pinned.
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start 0.45", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const done = useMotionValue(1);
  const progress = reduce ? done : smooth;

  // Fit sizes include room for the scattered tiles either side of the window.
  const { ref, scale, mobile, ready } = useStageScale(
    { w: 1100, h: wideLayout.H },
    { w: 380, h: narrowLayout.H },
    { fitHeight: true, reserveY: 48, maxScale: 1.6 },
  );
  const layout = mobile ? narrowLayout : wideLayout;

  const caption1 = useTransform(progress, [0, 0.25, 0.35], [1, 1, 0]);
  const caption2 = useTransform(progress, [0.55, 0.7], [0, 1]);

  return (
    <section className="relative bg-hero text-white" aria-labelledby="hero-title">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[min(900px,100vw)] -translate-x-1/2 rounded-full bg-sky-400/20 blur-[120px]" />

      <div className="container relative z-30 pb-4 pt-28 text-center sm:pt-36">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300 backdrop-blur sm:text-[11px]"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-300" />
          SAZ Vida Healthcare Services
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          className="mx-auto mt-5 max-w-4xl text-balance text-[2.1rem] font-extrabold leading-[1.04] min-[400px]:text-[2.5rem] sm:text-6xl lg:text-7xl"
        >
          One platform for <span className="text-gradient animate-shimmer">every hospital</span> operation
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease }}
          className="mx-auto mt-5 max-w-2xl text-pretty text-base text-ink-200 sm:text-lg"
        >
          HR, audits, quality, compliance, feedback and licensing — one sign-in, one staff list, one source of truth.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease }}
          className="mt-7 flex flex-col items-stretch justify-center gap-3 min-[400px]:flex-row min-[400px]:items-center"
        >
          <Link href="/demo/" className="btn-primary">
            Book a pilot <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="#apps" className="btn-ghost">
            Explore the apps
          </Link>
        </motion.div>
      </div>

      {/* Pinned stage: the apps assemble into the launcher while this is on screen */}
      <div ref={stage} className="relative h-[200vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-4 pt-[4.5rem]">
          <div ref={ref} className="relative z-20 mx-auto flex min-h-0 w-full max-w-[1760px] flex-1 flex-col items-center justify-center px-3 sm:px-6">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: ready ? 1 : 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease }}
              className="relative mx-auto shrink-0"
              style={{ width: layout.W * scale, height: layout.H * scale }}
            >
              <div
                className="absolute left-0 top-0 origin-top-left"
                style={{ width: layout.W, height: layout.H, transform: `scale(${scale})` }}
              >
                <LauncherWindow layout={layout} progress={progress} />
                <Slots layout={layout} progress={progress} />
                {apps.map((app, i) => (
                  <FlyingTile key={`${app.slug}-${mobile}`} app={app} i={i} layout={layout} progress={progress} />
                ))}
              </div>
            </motion.div>

            <div className="relative mt-5 h-6 w-full shrink-0 text-center text-sm font-medium sm:text-base" aria-hidden="true">
              <motion.p style={{ opacity: caption1 }} className="absolute inset-x-0 text-ink-200">
                Seven tools, seven logins<span className="hidden sm:inline"> — scroll to bring them together</span>{" "}
                <span className="inline-block animate-bounce">↓</span>
              </motion.p>
              <motion.p style={{ opacity: caption2 }} className="absolute inset-x-0 text-sky-300">
                One sign-in opens every app.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
