import type { Metadata } from "next";
import { PostRow } from "@/components/cards";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Log", description: "Every weekly post, newest first." };

export default function LogPage() {
  const posts = getPosts();
  // Group by year → like itertools.groupby in Python.
  const byYear = Object.groupBy(posts, (p) => p.date.slice(0, 4));
  return (
    <div className="wrap py-16">
      <div className="kicker">{posts.length} entries · <a href="/rss.xml" className="underline">rss</a></div>
      <h1 className="h-display mt-2 text-[clamp(56px,12vw,140px)]">Log</h1>
      <p className="mt-4 max-w-xl text-muted">Lab notebook entries: what I read, what I built, what broke, what&apos;s next.</p>
      {Object.entries(byYear).map(([year, list]) => (
        <section key={year} className="mt-12">
          <h2 className="font-mono text-sm text-muted">{year}</h2>
          {list!.map((p) => <PostRow key={p.slug} post={p} />)}
        </section>
      ))}
    </div>
  );
}
