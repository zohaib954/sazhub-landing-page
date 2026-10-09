import { ChevronDown, LayoutGrid } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/utils";

/** Top bar shared by every SAZ Vida app mockup. */
export function TopBar({ context = true, className }: { context?: boolean; className?: string }) {
  return (
    <div className={cn("flex h-10 items-center justify-between border-b border-ink-100 bg-white px-3", className)}>
      <span className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <LogoMark className="h-4" />
          <span className="font-display text-[10px] font-bold leading-none text-ink-900">
            SAZ Vida
            <span className="block text-[6px] font-medium uppercase tracking-wider text-ink-400">Healthcare services</span>
          </span>
        </span>
        {context && (
          <span className="hidden items-center gap-1 text-[9px] text-ink-500 sm:flex">
            Working in
            <span className="inline-flex items-center gap-1 rounded border border-ink-100 px-1.5 py-0.5 text-ink-800">
              All organizations <ChevronDown className="h-2.5 w-2.5" />
            </span>
          </span>
        )}
      </span>
      <span className="flex items-center gap-2">
        <LayoutGrid className="h-3 w-3 text-ink-400" />
        <span className="grid h-5 w-5 place-items-center rounded-full bg-ink-600 text-[8px] font-bold text-white">PA</span>
        <span className="hidden leading-tight sm:block">
          <span className="block text-[9px] font-semibold">Platform Admin</span>
          <span className="block text-[7px] text-ink-400">Platform admin</span>
        </span>
      </span>
    </div>
  );
}

export function StatusPill({ tone, children }: { tone: "red" | "amber" | "green" | "blue" | "violet" | "gray"; children: React.ReactNode }) {
  const tones = {
    red: "bg-red-50 text-red-700 ring-red-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    violet: "bg-violet-50 text-violet-700 ring-violet-200",
    gray: "bg-ink-50 text-ink-600 ring-ink-100",
  };
  return <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9px] font-semibold ring-1", tones[tone])}>{children}</span>;
}
