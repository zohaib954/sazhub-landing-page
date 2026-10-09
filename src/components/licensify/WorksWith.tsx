import Link from "next/link";
import { apps, type AppSlug } from "@/lib/apps";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Motion";

export function WorksWith({ current }: { current: AppSlug }) {
  const others = apps.filter((a) => a.slug !== current);
  return (
    <section className="bg-[#f6f7fb] py-20 sm:py-24" aria-labelledby="works-title">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Part of SAZ Vida</p>
          <h2 id="works-title" className="h-section mt-3">
            Works with the rest of your hospital
          </h2>
          <p className="lede mt-4">Same sign-in, same people, same departments — open any other app without logging in again.</p>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {others.map((app) => {
            const Icon = app.icon;
            const body = (
              <>
                <span className="grid h-10 w-10 place-items-center rounded-xl text-white transition group-hover:scale-110" style={{ background: app.color }}>
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 font-display font-bold">{app.name}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-500">{app.short}</p>
              </>
            );
            return (
              <StaggerItem key={app.slug}>
                {app.hasPage ? (
                  <Link href={`/apps/${app.slug}/`} className="card group block h-full p-4 transition hover:-translate-y-1">
                    {body}
                  </Link>
                ) : (
                  <div className="card group h-full p-4">{body}</div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
