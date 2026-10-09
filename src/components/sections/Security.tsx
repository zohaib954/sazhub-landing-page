import { Activity, Fingerprint, KeyRound, ScanSearch } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

const features = [
  { icon: Activity, title: "Full audit trail", body: "Who changed people, sites, departments or access." },
  { icon: ScanSearch, title: "Every sign-in logged", body: "Failed attempts too, with device and network." },
  { icon: Fingerprint, title: "Two-step verification", body: "Required for admins at their next sign-in." },
  { icon: KeyRound, title: "App secrets rotated", body: "Managed centrally from the Console." },
];

const log = [
  ["19:04", "Platform Admin", "Opened app", "Licensify", "Chrome on Windows", "ok"],
  ["19:03", "Platform Admin", "Signed in", "Platform", "Chrome on Windows", "ok"],
  ["18:57", "Priya Kulkarni", "Added department", "Radiology · Northwind General, Mumbai", "Safari on iPhone", "ok"],
  ["18:41", "Unknown", "Failed sign-in", "2 attempts", "Firefox on Linux", "fail"],
  ["18:38", "Platform Admin", "Rotated app secret", "Feedback", "Chrome on Windows", "key"],
  ["18:20", "Chetan Gowda", "Changed access", "HR → Branch admin", "Edge on Windows", "ok"],
  ["18:02", "Riya Kapoor", "Enabled two-step", "Own account", "Chrome on Android", "key"],
  ["17:46", "Akash Hegde", "Invited person", "Shaukat Ali", "Chrome on macOS", "ok"],
] as const;

function LogRow({ row }: { row: (typeof log)[number] }) {
  const [time, who, what, detail, from, kind] = row;
  return (
    <div className="grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/5 px-4 py-2.5 text-[12px] sm:grid-cols-[60px_130px_minmax(0,1fr)_150px]">
      <span className="font-mono text-ink-300">{time}</span>
      <span className="hidden truncate font-medium text-white sm:block">{who}</span>
      <span className="min-w-0">
        <span className={kind === "fail" ? "font-semibold text-red-300" : kind === "key" ? "font-semibold text-sky-300" : "font-semibold text-white"}>{what}</span>
        <span className="block truncate text-[11px] text-ink-300">{detail}</span>
      </span>
      <span className="truncate text-right text-[11px] text-ink-300">{from}</span>
    </div>
  );
}

export function Security() {
  return (
    <section id="security" className="relative scroll-mt-16 overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="security-title">
      <div className="container grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Reveal y={40} className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-2xl bg-ink-950 shadow-float ring-1 ring-ink-900">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="font-display text-sm font-bold text-white">Audit log</p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
              </span>
            </div>
            <div className="hidden grid-cols-[60px_130px_minmax(0,1fr)_150px] gap-3 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-ink-400 sm:grid">
              <span>When</span>
              <span>Who</span>
              <span>What</span>
              <span className="text-right">From</span>
            </div>
            <div className="relative h-[300px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_85%,transparent)]">
              <div className="animate-marquee motion-reduce:animate-none">
                {[...log, ...log].map((row, i) => (
                  <LogRow key={i} row={row} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">Security and audit</p>
            <h2 id="security-title" className="h-section mt-3">
              Every change and sign-in is on the record
            </h2>
          </Reveal>
          <Stagger className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-50 text-app-licensify">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
