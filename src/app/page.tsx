import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Connect } from "@/components/sections/Connect";
import { AppsGrid } from "@/components/sections/AppsGrid";
import { ConsoleSection } from "@/components/sections/ConsoleSection";
import { Roles } from "@/components/sections/Roles";
import { Departments } from "@/components/sections/Departments";
import { LicensifySpotlight } from "@/components/sections/LicensifySpotlight";
import { Security } from "@/components/sections/Security";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: site.name,
          applicationCategory: "BusinessApplication",
          applicationSubCategory: "Hospital operations platform",
          operatingSystem: "Web",
          description: site.description,
          url: site.url,
          featureList: apps.map((a) => `${a.name}: ${a.short}`),
          publisher: { "@type": "Organization", name: site.legalName },
        }}
      />
      <Hero />
      <Problem />
      <Connect />
      <AppsGrid />
      <ConsoleSection />
      <Roles />
      <Departments />
      <LicensifySpotlight />
      <Security />
      <FinalCta />
    </>
  );
}
