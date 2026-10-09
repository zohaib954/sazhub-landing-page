"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CircleCheck, Loader2 } from "lucide-react";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type State = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 shadow-sm outline-none transition placeholder:text-ink-300 focus:border-app-licensify focus:ring-4 focus:ring-blue-100";

export function DemoForm() {
  const params = useSearchParams();
  const preselect = params.get("app");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [picked, setPicked] = useState<string[]>(preselect && apps.some((a) => a.slug === preselect) ? [preselect] : []);

  const toggle = (slug: string) => setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.company_website) return; // honeypot: silently drop bots
    delete data.company_website;

    if (!site.formEndpoint) {
      setState("error");
      setError("The form isn't connected yet. Set NEXT_PUBLIC_FORM_ENDPOINT to start receiving requests.");
      return;
    }

    setState("sending");
    setError("");
    try {
      const body: Record<string, string> = {
        ...data,
        apps: picked.map((s) => apps.find((a) => a.slug === s)?.name).join(", ") || "Not sure yet",
        _subject: `Pilot request — ${data.organization || data.name}`,
      };
      const accessKey = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY;
      if (accessKey) body.access_key = accessKey;
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      form.reset();
    } catch {
      setState("error");
      setError("Something went wrong sending your request. Please try again in a moment.");
    }
  }

  return (
    <div className="card relative overflow-hidden p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div key="sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"
            >
              <CircleCheck className="h-8 w-8" />
            </motion.span>
            <h2 className="mt-5 font-display text-2xl font-bold">Thanks — we&apos;ll be in touch</h2>
            <p className="mx-auto mt-2 max-w-sm text-ink-600">
              We&apos;ll reach out within one working day to plan your pilot.
            </p>
            <button onClick={() => setState("idle")} className="btn-outline mt-6">
              Send another request
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
            <label className="text-sm font-medium text-ink-800">
              Full name
              <input name="name" required autoComplete="name" className={field} placeholder="Dr. Priya Sharma" />
            </label>
            <label className="text-sm font-medium text-ink-800">
              Work email
              <input name="email" type="email" required autoComplete="email" className={field} placeholder="priya@hospital.org" />
            </label>
            <label className="text-sm font-medium text-ink-800">
              Hospital group / organization
              <input name="organization" required autoComplete="organization" className={field} placeholder="Sunrise Healthcare" />
            </label>
            <label className="text-sm font-medium text-ink-800">
              Your role
              <input name="role" autoComplete="organization-title" className={field} placeholder="Quality head, COO, Admin…" />
            </label>
            <label className="text-sm font-medium text-ink-800">
              Phone <span className="font-normal text-ink-400">(optional)</span>
              <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="+91 …" />
            </label>
            <label className="text-sm font-medium text-ink-800">
              Number of hospitals
              <select name="hospitals" className={field} defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                <option>1</option>
                <option>2–5</option>
                <option>6–20</option>
                <option>20+</option>
              </select>
            </label>

            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-medium text-ink-800">Which apps are you interested in?</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {apps.map((a) => {
                  const on = picked.includes(a.slug);
                  const Icon = a.icon;
                  return (
                    <button
                      type="button"
                      key={a.slug}
                      aria-pressed={on}
                      onClick={() => toggle(a.slug)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition",
                        on ? "border-transparent text-white shadow" : "border-ink-100 bg-white text-ink-700 hover:border-ink-200",
                      )}
                      style={on ? { background: a.color } : undefined}
                    >
                      <Icon className="h-3.5 w-3.5" /> {a.name}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="text-sm font-medium text-ink-800 sm:col-span-2">
              Anything we should know? <span className="font-normal text-ink-400">(optional)</span>
              <textarea name="message" rows={4} className={field} placeholder="e.g. we have an NABH inspection coming up in March…" />
            </label>

            {/* Honeypot — hidden from people, tempting for bots */}
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-400">We only use these details to plan your pilot.</p>
              <button type="submit" disabled={state === "sending"} className="btn-ink px-6 py-3 disabled:opacity-60">
                {state === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Request a pilot <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
            {state === "error" && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
                {error}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
