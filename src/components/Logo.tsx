import { cn } from "@/lib/utils";

type Props = { tone?: "dark" | "light"; className?: string; withWordmark?: boolean };

/** SAZ Vida diamond mark: an "S" over a "Z" inside a split diamond. */
export function LogoMark({ tone = "dark", className }: Omit<Props, "withWordmark">) {
  const frame = tone === "dark" ? "#1b2149" : "#ffffff";
  const letters = tone === "dark" ? "#3d4b8f" : "#9fd3fb";
  return (
    <svg viewBox="-8 -8 136 216" className={cn("h-8 w-auto", className)} aria-hidden="true">
      <g fill="none" strokeWidth="13" strokeLinejoin="miter" strokeMiterlimit="10">
        <g stroke={frame}>
          <path d="M3.6 94 L34 43" />
          <path d="M116.4 94 L86 43" />
          <path d="M3.6 106 L34 157" />
          <path d="M116.4 106 L86 157" />
        </g>
        <g stroke={letters}>
          <path d="M76 28 L60 2 L46 25 L77 91 L44 91" />
          <path d="M44 172 L60 198 L74 175 L43 109 L76 109" />
        </g>
      </g>
    </svg>
  );
}

export function Logo({ tone = "dark", className, withWordmark = true }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} />
      {withWordmark && (
        <span
          className={cn(
            "font-display text-[1.05rem] font-extrabold uppercase tracking-[0.14em]",
            tone === "dark" ? "text-ink-900" : "text-white",
          )}
        >
          Saz Vida
        </span>
      )}
    </span>
  );
}
