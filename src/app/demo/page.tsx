import type { Metadata } from "next";
import { Suspense } from "react";
import { Check } from "lucide-react";
import { DemoForm } from "@/components/DemoForm";
import { Reveal } from "@/components/ui/Motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a pilot",
  description: "Start SAZ Vida with a pilot at one of your hospitals. We set up your sites, departments and admins, and your team is signed in to every app.",
  alternates: { canonical: "/demo/" },
};

const points = [
  "We set up your sites, departments and admins",
  "Your team is signed in to every app from day one",
  "Start with one hospital and one app — add the rest when you're ready",
];

export default function DemoPage() {
  const { email, phone } = site.contact;
  return (
    <section className="relative overflow-hidden bg-[#f6f7fb]">
      <div className="absolute inset-x-0 top-0 h-[600px] bg-hero lg:h-[420px]" />
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[600px] lg:h-[420px]" />
      <div className="container relative grid grid-cols-1 gap-10 pb-24 pt-28 sm:pt-36 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <Reveal className="text-white lg:pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Book a pilot</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
            Start with one hospital
          </h1>
          <p className="mt-4 max-w-md text-ink-200">
            Tell us a little about your group and we&apos;ll plan a pilot around your next inspection, audit or renewal cycle.
          </p>
          <ul className="mt-8 space-y-3 lg:mt-24 lg:text-ink-800">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          {(email || phone) && (
            <div className="mt-8 space-y-1 text-sm lg:text-ink-700">
              {email && <p>Email: <a className="font-semibold underline" href={`mailto:${email}`}>{email}</a></p>}
              {phone && <p>Phone: <a className="font-semibold underline" href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></p>}
            </div>
          )}
        </Reveal>
        <Reveal delay={0.1} y={30}>
          <Suspense fallback={<div className="card h-[560px]" />}>
            <DemoForm />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}
