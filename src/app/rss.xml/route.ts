// A "route handler": instead of a page, this URL (/rss.xml) returns raw XML.
// Like a tiny FastAPI endpoint. It's pre-rendered at build time.
import { getPosts } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getPosts({ includeDrafts: false })
    .map((p) => `<item><title>${esc(p.title)}</title><link>${site.url}/log/${p.slug}</link><guid>${site.url}/log/${p.slug}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.title)}</title><link>${site.url}</link><description>${esc(site.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
