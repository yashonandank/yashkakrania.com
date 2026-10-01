/**
 * Social preview card (the image shown when a link is shared on X, LinkedIn, Slack…).
 * Rendered to a PNG at build time by next/og. It uses a subset of CSS (flexbox only) and
 * its built-in font, because the site's fonts ship as .woff2, which next/og can't read.
 * Colours match the dark theme in globals.css.
 */
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogImage({ kicker, title, footer }: { kicker: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#07080b", color: "#e8ecf2" }}>
        <div style={{ display: "flex", fontSize: 28, color: "#c6ff3d", letterSpacing: 2, textTransform: "uppercase" }}>{kicker}</div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 64 : 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "3px solid #e8ecf2", paddingTop: 24, fontSize: 28 }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -2 }}>
            yash<span style={{ color: "#c6ff3d" }}>.</span>
          </div>
          <div style={{ display: "flex", color: "#8d97aa" }}>{footer}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
