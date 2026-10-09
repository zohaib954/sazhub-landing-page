import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { LicensifyPage, licensifyFaq } from "@/components/licensify/LicensifyPage";
import { apps, appBySlug } from "@/lib/apps";
import { site } from "@/lib/site";

export const dynamicParams = false;

/** Only apps with a finished page are generated; the rest are added in later phases. */
export function generateStaticParams() {
  return apps.filter((a) => a.hasPage).map((a) => ({ slug: a.slug }));
}

const meta: Record<string, { title: string; description: string; faq: { q: string; a: string }[]; Page: () => React.ReactElement }> = {
  licensify: {
    title: "Licensify — Hospital licence, renewal & inspection management",
    description:
      "Track every statutory licence across your hospitals, get renewal alerts in four urgency bands, and close every inspection finding with owners and deadlines.",
    faq: licensifyFaq,
    Page: LicensifyPage,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = meta[slug];
  if (!m) return {};
  const path = `/apps/${slug}/`;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: path },
    openGraph: { title: m.title, description: m.description, url: path, type: "website", siteName: site.name },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = appBySlug(slug);
  const m = meta[slug];
  if (!app || !m) notFound();
  const url = `${site.url}/apps/${slug}/`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: `SAZ Vida ${app.name}`,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description: m.description,
              url,
              publisher: { "@type": "Organization", name: site.legalName, url: site.url },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
                { "@type": "ListItem", position: 2, name: "Apps", item: `${site.url}/#apps` },
                { "@type": "ListItem", position: 3, name: app.name, item: url },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: m.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }}
      />
      <m.Page />
    </>
  );
}
