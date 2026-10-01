// Default social preview for every page that doesn't define its own (served as /opengraph-image).
import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: `AI lab notebook · ${site.location}`, title: "One thing in AI each week, built in public.", footer: "experiments · builds · lab notes" });
}
