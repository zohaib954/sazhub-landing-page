import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

type Point = { title: string; body: string };

export function FeatureRow({
  id,
  eyebrow,
  title,
  lede,
  points,
  visual,
  reverse,
  tinted,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  points: Point[];
  visual: React.ReactNode;
  reverse?: boolean;
  tinted?: boolean;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-16 overflow-hidden py-20 sm:py-28", tinted ? "bg-[#f6f7fb]" : "bg-white")}>
      <div className={cn("container grid items-center gap-12 lg:gap-16", reverse ? "lg:grid-cols-[1.35fr_1fr]" : "lg:grid-cols-[1fr_1.35fr]")}>
        <div className={cn(reverse && "lg:order-2")}>
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="h-section mt-3">{title}</h2>
            {lede && <p className="lede mt-4">{lede}</p>}
          </Reveal>
          <Stagger className="mt-8 space-y-3">
            {points.map((p) => (
              <StaggerItem key={p.title} className="border-l-[3px] border-app-licensify pl-4">
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-600">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal y={40} delay={0.1} className={cn("relative", reverse && "lg:order-1")}>
          <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-blue-100/70 via-transparent to-violet-100/60 blur-xl" />
          {visual}
        </Reveal>
      </div>
    </section>
  );
}
