import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { getLibrary } from "@/lib/content";

export const metadata: Metadata = { title: "Library", description: "Every source I've used, grouped by topic." };

export default function LibraryPage() {
  const groups = getLibrary();
  const topics = Object.keys(groups).sort();
  const total = topics.reduce((n, t) => n + groups[t].length, 0);
  return (
    <div className="wrap py-16">
      <div className="kicker">{total} sources · {topics.length} topics</div>
      <h1 className="h-display mt-2 text-[clamp(56px,12vw,140px)]">Library</h1>
      <p className="mt-4 max-w-xl text-muted">Built automatically from the sources listed in each post.</p>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {topics.map((topic, i) => (
          <Reveal key={topic} delay={(i % 2) * 0.08}>
            <h2 className="border-b-2 border-ink pb-2 text-2xl font-extrabold tracking-tight">{topic}</h2>
            <ul>
              {groups[topic].map((s) => (
                <li key={s.url} className="border-b border-line py-3">
                  <span className="mr-2 font-mono text-[11px] text-accent uppercase">{s.type}</span>
                  <a href={s.url} className="font-semibold hover:text-accent">{s.title} ↗</a>
                  {s.note && <p className="mt-1 text-sm text-muted">{s.note}</p>}
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    cited in {s.citedIn.map((c, j) => <span key={c.slug}>{j > 0 && ", "}<Link href={`/log/${c.slug}`} className="underline">{c.title}</Link></span>)}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
