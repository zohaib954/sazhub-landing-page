/** Demo data used by the Licensify mockups (illustrative only). */

export const dashboardStats = [
  { label: "Total licenses", value: 76, sub: "29 active", tone: "violet" },
  { label: "Compliance rate", value: 82.1, decimals: 1, suffix: "%", sub: "Watch", tone: "green", bar: 0.821 },
  { label: "Expiring in 30 days", value: 12, sub: "Renew now", tone: "orange" },
  { label: "Expiring in 90 days", value: 26, sub: "Plan renewals", tone: "amber" },
  { label: "Expired", value: 12, sub: "8 under renewal", tone: "red" },
  { label: "Pending approval", value: 5, sub: "3 waiting for you", tone: "gray" },
] as const;

export const statusSlices = [
  { label: "Active", value: 29, color: "#3fa463" },
  { label: "Expiring", value: 26, color: "#e6b43a" },
  { label: "Expired", value: 12, color: "#d0443c" },
  { label: "Pending", value: 5, color: "#8a94b0" },
  { label: "Under renewal", value: 4, color: "#5b8def" },
];

/** Licences expiring per month over the next year. */
export const expiryOutlook = [
  { m: "Oct", expired: 12, soon: 0, later: 0 },
  { m: "Nov", expired: 0, soon: 6, later: 0 },
  { m: "Dec", expired: 0, soon: 10, later: 0 },
  { m: "Jan", expired: 0, soon: 8, later: 0 },
  { m: "Feb", expired: 0, soon: 0, later: 4 },
  { m: "Mar", expired: 0, soon: 0, later: 7 },
  { m: "Apr", expired: 0, soon: 0, later: 3 },
  { m: "May", expired: 0, soon: 0, later: 5 },
  { m: "Jun", expired: 0, soon: 0, later: 2 },
  { m: "Jul", expired: 0, soon: 0, later: 6 },
  { m: "Aug", expired: 0, soon: 0, later: 4 },
  { m: "Sep", expired: 0, soon: 0, later: 3 },
];

export type LicenceStatus = "Active" | "Expiring" | "Expired" | "Pending" | "Under renewal";

export const licences: {
  name: string;
  number: string;
  authority: string;
  dept: string;
  site: string;
  owner: string;
  expiry: string;
  status: LicenceStatus;
  note?: string;
}[] = [
  { name: "Rectified Spirit License", number: "SPR/NWH-PUN/2025/1016", authority: "State Excise Department, Maharashtra", dept: "Pharmacy", site: "Northwind Speciality, Pune", owner: "Arjun Menon", expiry: "Jul 27, 2026", status: "Expired", note: "74d overdue" },
  { name: "Fire NOC", number: "FIRE/GFM-BLR/2024/221", authority: "Karnataka Fire & Emergency Services", dept: "Facility & Fire Safety", site: "Greenfield Hospital, Bengaluru", owner: "Raghav Iyengar", expiry: "Oct 21, 2026", status: "Expiring", note: "12d left" },
  { name: "Biomedical Waste Authorization", number: "BMW/NWH-MUM/2023/078", authority: "Maharashtra Pollution Control Board", dept: "Biomedical Waste Mgmt", site: "Northwind General, Mumbai", owner: "Kunal More", expiry: "Mar 14, 2027", status: "Active" },
  { name: "Narcotic Drugs License (NDPS)", number: "NDPS/NWH-PUN/2025/1451", authority: "State Excise Department, Maharashtra", dept: "Pharmacy", site: "Northwind Speciality, Pune", owner: "Arjun Menon", expiry: "Oct 13, 2026", status: "Under renewal", note: "4d left" },
  { name: "Blood Bank License", number: "BB/GFM-MYS/2024/033", authority: "CDSCO & State Drugs Control", dept: "Blood Centre", site: "Greenfield Clinic, Mysuru", owner: "Varun Upadhya", expiry: "Jan 02, 2027", status: "Pending" },
  { name: "Clinical Establishment Registration", number: "CER/MER-HYD/2022/310", authority: "Telangana Health Department", dept: "Hospital Administration", site: "Meridian Hospital, Hyderabad", owner: "Sneha Rao", expiry: "Aug 30, 2027", status: "Active" },
];

export const bands = [
  { id: "critical", label: "Critical", range: "0–15 days", color: "#d0443c", count: 8 },
  { id: "warning", label: "Warning", range: "16–30 days", color: "#e07b2c", count: 4 },
  { id: "upcoming", label: "Upcoming", range: "31–60 days", color: "#e6b43a", count: 6 },
  { id: "later", label: "Later", range: "61–90 days", color: "#5b8def", count: 8 },
] as const;

/** Licences expiring per week (next 13 weeks) — band index per week. */
export const weekly = [
  { w: "This wk", n: 4, band: 0 },
  { w: "19 Oct", n: 0, band: 0 },
  { w: "26 Oct", n: 4, band: 1 },
  { w: "2 Nov", n: 4, band: 1 },
  { w: "9 Nov", n: 0, band: 2 },
  { w: "16 Nov", n: 2, band: 2 },
  { w: "23 Nov", n: 0, band: 2 },
  { w: "30 Nov", n: 4, band: 2 },
  { w: "7 Dec", n: 0, band: 3 },
  { w: "14 Dec", n: 0, band: 3 },
  { w: "21 Dec", n: 4, band: 3 },
  { w: "28 Dec", n: 0, band: 3 },
  { w: "4 Jan", n: 4, band: 3 },
];

export const departmentsCompliance = [
  { dept: "Facility & Fire Safety", site: "Greenfield Clinic, Mysuru", status: "At risk", critical: 1, major: 1, closed: 100, last: "Aug 21, 2026" },
  { dept: "Facility & Fire Safety", site: "Northwind General, Mumbai", status: "At risk", critical: 1, major: 1, closed: 100, last: "Aug 21, 2026" },
  { dept: "Biomedical Waste Management", site: "Northwind Speciality, Pune", status: "Watch", critical: 0, major: 1, closed: 60, last: "Sep 20, 2026" },
  { dept: "Pharmacy", site: "Greenfield Hospital, Bengaluru", status: "On track", critical: 0, major: 0, closed: 100, last: "Sep 28, 2026" },
];

export const findings = [
  { sev: "Critical", text: "Emergency exit signage not illuminated near the OT complex", action: "Install battery-backed illuminated exit signs", licence: "Fire NOC", owner: "Amit Pawar", due: "30 Sep 2026", state: "Overdue" },
  { sev: "Critical", text: "Fire extinguisher refill overdue on 2nd floor", action: "Refill and re-tag all extinguishers", licence: "Fire NOC", owner: "Rucha Ranade", due: "12 Oct 2026", state: "Due in 3 days" },
  { sev: "Major", text: "Yellow-bag segregation not followed in the ICU", action: "Retrain ICU staff and audit weekly", licence: "Biomedical Waste Authorization", owner: "Lakshmi Prasad", due: "20 Oct 2026", state: "In progress" },
  { sev: "Minor", text: "Spirit stock register missing two signatures", action: "Countersign and file", licence: "Rectified Spirit License", owner: "Manoj Karanth", due: "05 Oct 2026", state: "Resolved" },
];

export const permissionRoles = ["Super Admin", "Organization Admin", "Branch Admin", "Department Admin", "Editor", "Viewer"];

export const permissions: { name: string; grants: boolean[] }[] = [
  { name: "View licenses", grants: [true, true, true, true, true, true] },
  { name: "Download licence documents", grants: [true, true, true, true, true, true] },
  { name: "Export licence lists (CSV)", grants: [true, true, true, true, true, false] },
  { name: "Add and edit licences", grants: [true, true, true, true, true, false] },
  { name: "Start renewals", grants: [true, true, true, true, false, false] },
  { name: "Schedule inspections", grants: [true, true, true, false, false, false] },
  { name: "Manage users and roles", grants: [true, true, false, false, false, false] },
];
