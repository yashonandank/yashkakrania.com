import type { Metadata } from "next";
import { Reveal, RiseText } from "@/components/motion";
import { Timeline } from "@/components/Timeline";
import { intro, interests, timeline } from "@/data/about";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About", description: intro };

export default function AboutPage() {
  return (
    <div className="wrap py-16">
      <div className="kicker">About</div>
      <h1 className="h-display mt-2 text-[clamp(56px,12vw,140px)]"><RiseText text="Hi, I'm Yash" /><span className="text-accent">.</span></h1>
      <p className="mt-6 max-w-3xl text-2xl leading-snug md:text-3xl">{intro}</p>

      <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_320px]">
        <section>
          <h2 className="h-display mb-6 text-4xl">The path so far</h2>
          <Timeline entries={timeline} />
        </section>
        <aside className="space-y-10">
          <Reveal>
            <h2 className="kicker mb-3">Into</h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((t) => <span key={t} className="tag !text-sm transition-colors hover:bg-accent hover:text-accent-ink">{t}</span>)}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="kicker mb-3">Elsewhere</h2>
            <ul className="space-y-1 font-mono text-sm">
              <li><a className="navlink" href={site.links.github}>github ↗</a></li>
              <li><a className="navlink" href={site.links.linkedin}>linkedin ↗</a></li>
              <li><a className="navlink" href={site.links.x}>x ↗</a></li>
              <li><a className="navlink" href={site.links.email}>email</a></li>
            </ul>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
