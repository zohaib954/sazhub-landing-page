import { Database, KeyRound, TriangleAlert, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

const problems = [
  {
    icon: KeyRound,
    title: "A login for every app",
    body: "Staff juggle separate passwords for HR, audits, quality and licences.",
  },
  {
    icon: Users,
    title: "Staff lists copied everywhere",
    body: "Every hire, transfer and exit is re-entered in each system by hand.",
  },
  {
    icon: Database,
    title: "Departments that never match",
    body: "Each tool keeps its own list of sites and departments, so reports disagree.",
  },
  {
    icon: TriangleAlert,
    title: "No record of who changed what",
    body: "Access and edits are scattered, which surfaces as gaps at inspection time.",
  },
];

export function Problem() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="problem-title">
      <div className="bg-grid-light pointer-events-none absolute inset-0" />
      <div className="container relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">The problem</p>
          <h2 id="problem-title" className="h-section mt-3">
            Hospital groups run on <span className="relative whitespace-nowrap">disconnected<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true"><path d="M2 8 Q 40 2 80 8 T 160 8 T 240 8 T 298 6" fill="none" stroke="#d0443c" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" /></svg></span> tools
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ icon: Icon, title, body }, i) => (
            <StaggerItem key={title} className="card group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:shadow-float">
              <span className="absolute right-5 top-5 font-display text-5xl font-extrabold text-ink-50 transition group-hover:text-red-50">
                0{i + 1}
              </span>
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-ink-50 text-ink-600 transition group-hover:bg-red-50 group-hover:text-band-critical">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-6 text-lg font-bold leading-snug">{title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-ink-600">{body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-white/60 p-5 text-center text-base text-ink-700 sm:text-lg">
          <strong className="font-semibold text-ink-900">The result:</strong> admins spend their time keeping systems in sync
          instead of running the hospital.
        </Reveal>
      </div>
    </section>
  );
}
