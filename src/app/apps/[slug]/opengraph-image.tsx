import { ogImage, ogSize } from "@/lib/og";
import { apps, appBySlug } from "@/lib/apps";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "SAZ Vida app";

export function generateStaticParams() {
  return apps.filter((a) => a.hasPage).map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = appBySlug(slug)!;
  return ogImage({ eyebrow: `SAZ Vida app · ${app.name}`, title: app.tagline, accent: app.color });
}
