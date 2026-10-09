import {
  Users,
  ClipboardCheck,
  Award,
  ShieldCheck,
  MessageCircle,
  BookOpen,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type AppSlug = "hr" | "audit" | "quality" | "compliance" | "feedback" | "licensify" | "console";

export type SazApp = {
  slug: AppSlug;
  name: string;
  short: string;
  tagline: string;
  icon: LucideIcon;
  /** Hex colour, also available as Tailwind `app-<slug>` */
  color: string;
  /** Apps with a dedicated page under /apps/<slug> */
  hasPage: boolean;
};

export const apps: SazApp[] = [
  {
    slug: "hr",
    name: "HR",
    short: "Staff records, leave and credentials",
    tagline: "Every staff record, leave request and credential in one place.",
    icon: Users,
    color: "#7c4ddb",
    hasPage: false,
  },
  {
    slug: "audit",
    name: "Audit",
    short: "Internal audits and findings",
    tagline: "Plan internal audits and close every finding.",
    icon: ClipboardCheck,
    color: "#3c8d5b",
    hasPage: false,
  },
  {
    slug: "quality",
    name: "Quality",
    short: "Quality indicators and NABH",
    tagline: "Track quality indicators and stay NABH-ready.",
    icon: Award,
    color: "#cc7a2b",
    hasPage: false,
  },
  {
    slug: "compliance",
    name: "Compliance",
    short: "Statutory compliance tasks",
    tagline: "Statutory compliance tasks, owned and on time.",
    icon: ShieldCheck,
    color: "#c43c34",
    hasPage: false,
  },
  {
    slug: "feedback",
    name: "Feedback",
    short: "Patient and staff feedback",
    tagline: "Hear patients and staff, and act on what they say.",
    icon: MessageCircle,
    color: "#3b8ba3",
    hasPage: false,
  },
  {
    slug: "licensify",
    name: "Licensify",
    short: "Licences, renewals and inspections",
    tagline: "Never miss a licence renewal or an inspection finding.",
    icon: BookOpen,
    color: "#2f6dbd",
    hasPage: true,
  },
  {
    slug: "console",
    name: "Console",
    short: "People, hospitals, departments, access",
    tagline: "People, hospitals, departments and access — managed once.",
    icon: Settings,
    color: "#1f2433",
    hasPage: false,
  },
];

export const appBySlug = (slug: string) => apps.find((a) => a.slug === slug);
