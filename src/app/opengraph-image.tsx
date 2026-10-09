import { ogImage, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "SAZ Vida — One platform for every hospital operation";

export default function Image() {
  return ogImage({ eyebrow: "SAZ Vida Healthcare Services", title: "One platform for every hospital operation" });
}
