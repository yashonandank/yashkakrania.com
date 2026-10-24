import type { Metadata } from "next";
import { PostRow } from "@/components/cards";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Log", description: "Project write-ups, newest first." };

export default function LogPage() {
  const posts = getPosts();
  // Group by year → like itertools.groupby in Python.
  const byYear = Object.groupBy(posts, (p) => p.date.slice(0, 4));
  return (
    <div className="wrap py-16">
      <div className="kicker">{posts.length} entries · <a href="/rss.xml" className="underline">rss</a></div>
      <h1 className="h-display mt-2 text-[clamp(56px,12vw,140px)]">Log</h1>
      <p className="mt-4 max-w-xl text-muted">Write-ups for each project: the question, the method, the results and their limits, and what comes next. Newest first.</p>
      {posts.length === 0 && <p className="mt-12 text-muted">The first write-up will be published here shortly.</p>}
      {Object.entries(byYear).map(([year, list]) => (
        <section key={year} className="mt-12">
          <h2 className="font-mono text-sm text-muted">{year}</h2>
          {list!.map((p) => <PostRow key={p.slug} post={p} />)}
        </section>
      ))}
    </div>
  );
}
