// Default social preview for every page that doesn't define its own (served as /opengraph-image).
import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: `AI playground · ${site.location}`, title: "Poking at AI until it makes sense (or breaks).", footer: "no CS degree · lots of tabs open" });
}
