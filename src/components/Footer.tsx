import Link from "next/link";
import { Logo } from "@/components/Logo";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";

export function Footer() {
  const { email, phone, address } = site.contact;
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-200">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="container relative grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
        <div className="col-span-2 max-w-xs md:col-span-1">
          <Logo tone="light" />
          <p className="mt-4 text-sm leading-relaxed text-ink-300">
            One platform for every hospital operation. One login, one staff list, one audit trail.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Apps</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {apps.map((a) => (
              <li key={a.slug}>
                <Link href={a.hasPage ? `/apps/${a.slug}/` : "/#apps"} className="inline-flex items-center gap-2 transition hover:text-white">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.color === "#1f2433" ? "#9fd3fb" : a.color }} />
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Platform</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/#platform" className="transition hover:text-white">How it connects</Link></li>
            <li><Link href="/#console" className="transition hover:text-white">Console</Link></li>
            <li><Link href="/#roles" className="transition hover:text-white">People &amp; roles</Link></li>
            <li><Link href="/#security" className="transition hover:text-white">Security &amp; audit</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Get started</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/demo/" className="transition hover:text-white">Book a pilot</Link></li>
            {email && <li><a href={`mailto:${email}`} className="transition hover:text-white">{email}</a></li>}
            {phone && <li><a href={`tel:${phone.replace(/\s/g, "")}`} className="transition hover:text-white">{phone}</a></li>}
            {address && <li className="text-ink-300">{address}</li>}
          </ul>
        </div>
      </div>
      <div className="container relative flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
        <p>Built for hospital groups.</p>
      </div>
    </footer>
  );
}
