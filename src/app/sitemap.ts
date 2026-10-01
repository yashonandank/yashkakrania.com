import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";
import { site } from "@/lib/site";

// Next.js turns this into /sitemap.xml so search engines can find every page.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/projects", "/log", "/library", "/community", "/now"].map((p) => ({ url: `${site.url}${p}` }));
  const projects = getProjects().map((p) => ({ url: `${site.url}/projects/${p.slug}` }));
  const posts = getPosts({ includeDrafts: false }).map((p) => ({ url: `${site.url}/log/${p.slug}`, lastModified: p.date }));
  return [...pages, ...projects, ...posts];
}
