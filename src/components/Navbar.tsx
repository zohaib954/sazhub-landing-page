"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { apps } from "@/lib/apps";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#platform", label: "Platform" },
  { href: "/#console", label: "Console" },
  { href: "/#security", label: "Security" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setAppsOpen(false);
  }, [pathname]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "border-b border-ink-100/80 bg-white/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="container flex h-16 items-center justify-between" aria-label="Main">
        <Link href="/" aria-label="SAZ Vida home" className="shrink-0">
          <Logo tone={solid ? "dark" : "light"} />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <div className="relative" onMouseEnter={() => setAppsOpen(true)} onMouseLeave={() => setAppsOpen(false)}>
            <button
              type="button"
              aria-expanded={appsOpen}
              onClick={() => setAppsOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition",
                solid ? "text-ink-700 hover:bg-ink-50" : "text-white/80 hover:text-white",
              )}
            >
              Apps <ChevronDown className={cn("h-4 w-4 transition", appsOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {appsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full w-[440px] -translate-x-1/2 pt-2"
                >
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-ink-100 bg-white p-2 shadow-float">
                    {apps.map((app) => {
                      const Icon = app.icon;
                      const inner = (
                        <>
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white" style={{ background: app.color }}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-900">
                              {app.name}
                              {!app.hasPage && <span className="rounded bg-ink-50 px-1 text-[10px] font-medium text-ink-400">soon</span>}
                            </span>
                            <span className="block truncate text-xs text-ink-500">{app.short}</span>
                          </span>
                        </>
                      );
                      return app.hasPage ? (
                        <Link key={app.slug} href={`/apps/${app.slug}/`} className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-ink-50">
                          {inner}
                        </Link>
                      ) : (
                        <Link key={app.slug} href="/#apps" className="flex items-center gap-3 rounded-xl p-2.5 opacity-80 transition hover:bg-ink-50">
                          {inner}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition",
                solid ? "text-ink-700 hover:bg-ink-50" : "text-white/80 hover:text-white",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/demo/" className={cn("hidden sm:inline-flex", solid ? "btn-ink" : "btn-primary")}>
            Book a pilot <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className={cn("grid h-10 w-10 place-items-center rounded-full md:hidden", solid ? "text-ink-900" : "text-white")}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink-100 bg-white md:hidden"
          >
            <div className="container grid gap-1 py-4">
              <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-widest text-ink-400">Apps</p>
              <div className="grid grid-cols-2 gap-1">
                {apps.map((app) => {
                  const Icon = app.icon;
                  return (
                    <Link
                      key={app.slug}
                      href={app.hasPage ? `/apps/${app.slug}/` : "/#apps"}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-lg p-2 text-sm font-medium text-ink-800 hover:bg-ink-50"
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-md text-white" style={{ background: app.color }}>
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      {app.name}
                    </Link>
                  );
                })}
              </div>
              <div className="my-2 h-px bg-ink-100" />
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 text-sm font-medium text-ink-800 hover:bg-ink-50">
                  {l.label}
                </Link>
              ))}
              <Link href="/demo/" onClick={() => setOpen(false)} className="btn-ink mt-2">
                Book a pilot <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
