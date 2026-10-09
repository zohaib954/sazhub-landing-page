import type { MetadataRoute } from "next";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...apps
      .filter((a) => a.hasPage)
      .map((a) => ({ url: `${site.url}/apps/${a.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.url}/demo/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
