export const site = {
  name: "SAZ Vida",
  legalName: "SAZ Vida Healthcare Services",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://sazvida.com").replace(/\/$/, ""),
  title: "SAZ Vida — One platform for every hospital operation",
  description:
    "HR, audits, quality, compliance, feedback and licensing for hospital groups — one sign-in, one staff list, one source of truth.",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
  // Leave empty to hide. Filled in once contact details are confirmed.
  contact: {
    email: "",
    phone: "",
    address: "",
  },
};
