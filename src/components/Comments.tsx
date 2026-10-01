"use client";
/**
 * giscus comments: each post gets a GitHub Discussions thread, so readers comment with
 * their GitHub account and you moderate from GitHub. No database, no backend.
 *
 * Setup (once): make the repo public, enable Discussions, install the giscus app
 * (https://github.com/apps/giscus), then copy the IDs from https://giscus.app into
 * `site.giscus` in src/lib/site.ts. Until then this shows a placeholder.
 *
 * The theme follows the site's toggle by messaging the giscus iframe on "themechange".
 */
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

const giscusTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "transparent_dark");

export function Comments({ term }: { term: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const g = site.giscus;
  const configured = !g.repoId.includes("TODO");

  useEffect(() => {
    const host = ref.current;
    if (!configured || !host) return;
    const s = document.createElement("script");
    Object.entries({
      src: "https://giscus.app/client.js",
      "data-repo": g.repo,
      "data-repo-id": g.repoId,
      "data-category": g.category,
      "data-category-id": g.categoryId,
      "data-mapping": "specific", // one thread per post slug, stable even if the title changes
      "data-term": term,
      "data-reactions-enabled": "1",
      "data-input-position": "top",
      "data-theme": giscusTheme(),
      "data-loading": "lazy",
      crossorigin: "anonymous",
    }).forEach(([k, v]) => s.setAttribute(k, v));
    s.async = true;
    host.appendChild(s);

    const onTheme = () =>
      host.querySelector<HTMLIFrameElement>("iframe.giscus-frame")?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: giscusTheme() } } },
        "https://giscus.app",
      );
    addEventListener("themechange", onTheme);
    return () => { removeEventListener("themechange", onTheme); host.replaceChildren(); };
  }, [configured, term, g.repo, g.repoId, g.category, g.categoryId]);

  return (
    <section className="mx-auto mt-14 max-w-[720px]">
      <h2 className="kicker mb-4">Discussion</h2>
      {configured ? (
        <div ref={ref} />
      ) : (
        <div className="figure !m-0 grid h-32 place-items-center text-center font-mono text-sm text-muted">[ giscus comments: set site.giscus in src/lib/site.ts ]</div>
      )}
    </section>
  );
}
