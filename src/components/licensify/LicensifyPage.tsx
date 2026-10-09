import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { LicensifyDashboard } from "@/components/mockups/LicensifyMockups";
import { RegisterMockup } from "./Register";
import { RenewalsMockup } from "./Renewals";
import { ComplianceByDept, FindingsList, PermissionMatrix } from "./Inspections";
import { FeatureRow } from "./FeatureRow";
import { Faq, type Qa } from "./Faq";
import { WorksWith } from "./WorksWith";
import { FinalCta } from "@/components/sections/FinalCta";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { bands } from "@/lib/licensify";

export const licensifyFaq: Qa[] = [
  {
    q: "Which licences can Licensify track?",
    a: "Any statutory licence, registration or authorisation your hospitals hold — for example Fire NOC, Biomedical Waste Authorization, Narcotic Drugs (NDPS) and Rectified Spirit licences, blood bank licences and clinical establishment registrations. Each one records its number, issuing authority, department, owner and expiry.",
  },
  {
    q: "How does Licensify warn us before something lapses?",
    a: "Every licence falls into one of four urgency bands — Critical (0–15 days), Warning (16–30), Upcoming (31–60) and Later (61–90). A weekly timeline shows which weeks are crowded so you can plan renewals ahead, and expired licences are flagged separately.",
  },
  {
    q: "Can we track inspections and their findings too?",
    a: "Yes. Schedule inspections, see upcoming, overdue and completed ones by department, and log every finding with its severity, corrective action, owner and due date until it is resolved.",
  },
  {
    q: "Who can see and change what?",
    a: "Licensify ships with six built-in roles — Super Admin, Organization Admin, Branch Admin, Department Admin, Editor and Viewer — each with set permissions. Custom roles let you add extra permissions on top.",
  },
  {
    q: "Do we have to set up our staff and departments again?",
    a: "No. People, hospitals and departments come from the SAZ Vida Console and are shared with every SAZ Vida app. Every change and sign-in is logged in the audit trail.",
  },
  {
    q: "Can we get the data out for management reviews and inspectors?",
    a: "Yes — export the licence register, renewal lists and findings to CSV at any time.",
  },
];

const stats = [
  { to: 4, label: "Urgency bands, from 0 to 90 days" },
  { to: 6, label: "Built-in roles, plus custom roles" },
  { to: 1, label: "Register for every hospital in your group" },
  { to: 100, suffix: "%", label: "Of changes and sign-ins on the audit trail" },
];

export function LicensifyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero pb-20 pt-28 text-white sm:pb-28 sm:pt-36">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[600px] rounded-full bg-app-licensify/40 blur-[120px]" />
        <div className="container relative">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1 text-xs text-ink-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/#apps" className="hover:text-white">Apps</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">Licensify</span>
          </nav>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
            <Reveal>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-app-licensify text-white shadow-lg ring-1 ring-white/25">
                  <BookOpen className="h-5 w-5" />
                </span>
                SAZ Vida app · Licensify
              </p>
              <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.02] sm:text-6xl">
                Never miss a licence renewal or an inspection finding
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base text-ink-200 sm:text-lg">
                Every statutory licence across your hospitals — tracked, renewed on time and ready for inspection.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Licence register", "Renewal alerts", "Inspections and findings"].map((c) => (
                  <a
                    key={c}
                    href={`#${c.split(" ")[0].toLowerCase()}`}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur transition hover:border-white/40 hover:bg-white/10"
                  >
                    {c}
                  </a>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/demo/?app=licensify" className="btn-primary">
                  Book a Licensify pilot <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#licence" className="btn-ghost">
                  See how it works
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.15} y={50}>
              <div className="animate-floaty">
                <LicensifyDashboard />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-ink-100 bg-white">
        <Stagger className="container grid grid-cols-2 divide-ink-100 py-10 lg:grid-cols-4 lg:divide-x">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="px-4 py-3 text-center lg:px-6">
              <CountUp to={s.to} suffix={s.suffix} className="font-display text-4xl font-extrabold text-app-licensify sm:text-5xl" />
              <p className="mx-auto mt-2 max-w-[200px] text-sm text-ink-600">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <FeatureRow
        id="licence"
        eyebrow="Licensify · Licence register"
        title="Every licence, across every hospital"
        points={[
          { title: "One register", body: "Number, issuing authority, department and expiry for each licence." },
          { title: "Clear status", body: "Active, expiring, expired, pending approval or under renewal." },
          { title: "Named owners", body: 'An owner plus responsible people, with an "Only mine" view.' },
          { title: "Export anytime", body: "CSV for management reviews and inspectors." },
        ]}
        visual={<RegisterMockup />}
      />

      <FeatureRow
        id="renewal"
        tinted
        reverse
        eyebrow="Licensify · Renewals"
        title="Renewals surface long before they lapse"
        lede="Four urgency bands tell everyone what needs attention now — and what can wait."
        points={[
          { title: "Weekly timeline", body: "See which weeks are crowded and plan ahead." },
          { title: "One-click renewal", body: "Start a renewal and track it to completion." },
        ]}
        visual={
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {bands.map((b) => (
                <span key={b.id} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm shadow-card">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color }} />
                  <span className="font-semibold">{b.label}</span>
                  <span className="text-ink-500">{b.range}</span>
                </span>
              ))}
            </div>
            <RenewalsMockup />
          </div>
        }
      />

      <section id="inspections" className="scroll-mt-16 bg-white py-20 sm:py-28">
        <div className="container">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Licensify · Inspections</p>
            <h2 className="h-section mt-3">Inspections tracked to the last finding</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Reveal y={40}>
              <ComplianceByDept />
              <h3 className="mt-6 font-display text-xl font-bold">Compliance by department</h3>
              <p className="mt-1 text-ink-600">Upcoming, overdue and completed inspections, with at-risk departments flagged.</p>
            </Reveal>
            <Reveal y={40} delay={0.1}>
              <FindingsList />
              <h3 className="mt-6 font-display text-xl font-bold">Findings with owners and deadlines</h3>
              <p className="mt-1 text-ink-600">Severity, corrective action, owner and due date for every finding.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <FeatureRow
        tinted
        eyebrow="Licensify · Administration"
        title="Fine-grained roles, full audit trail"
        points={[
          { title: "Six built-in roles, plus custom", body: "Super Admin to Viewer, each with set permissions. Custom roles add extras on top." },
          { title: "Connected to the Console", body: "People, hospitals and departments come from the Console. Every change and sign-in is logged." },
        ]}
        visual={<PermissionMatrix />}
      />

      <WorksWith current="licensify" />
      <Faq items={licensifyFaq} title="Licensify questions, answered" />
      <FinalCta title="Ready for your next inspection?" />
    </>
  );
}
