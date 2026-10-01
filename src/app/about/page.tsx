import type { Metadata } from "next";
import { Reveal, RiseText } from "@/components/motion";
import { Timeline } from "@/components/Timeline";
import { hobbies, interests, intro, panels, superman, timeline } from "@/data/about";
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
          <h2 className="h-display mb-2 text-4xl">How I got here (roughly)</h2>
          <p className="mb-6 text-muted">The short version. Click one for the story.</p>
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
            <h2 className="kicker mb-3">Find me</h2>
            <ul className="space-y-1 font-mono text-sm">
              {site.contact.map((c) => <li key={c.href}><a className="navlink" href={c.href}>{c.label}</a></li>)}
            </ul>
          </Reveal>
        </aside>
      </div>

      {/* Hobbies: linked from the home page as /about#off-the-clock */}
      <section id="off-the-clock" className="mt-28 scroll-mt-20">
        <div className="kicker">Off the clock</div>
        <h2 className="h-display mt-2 text-[clamp(40px,8vw,96px)]">When I&apos;m not breaking models.</h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h3 className="text-3xl font-extrabold tracking-tight">🦸 {superman.title}</h3>
            {superman.body.map((para, i) => <p key={i} className={`mt-4 text-lg ${i === superman.body.length - 1 ? "text-muted" : ""}`}>{para}</p>)}
          </Reveal>
          <div className="space-y-6">
            <div className="kicker">Three panels I think about too much</div>
            {panels.map((p, i) => (
              <Reveal key={p.book} delay={i * 0.08}>
                <figure className="panel">
                  {p.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.img} alt={`${p.book}: ${p.moment}`} loading="lazy" className="mb-4 w-full border-2 border-ink" />
                  ) : null}
                  <span className="panel-caption">{p.book} · {p.year}</span>
                  <p className="mt-4 text-lg font-bold leading-snug tracking-tight">{p.moment}</p>
                  <p className="mt-2">{p.why}</p>
                  <figcaption className="mt-3 font-mono text-xs text-muted">{p.creators}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {hobbies.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <div className="figure !m-0 h-full">
                <div className="text-4xl">{h.icon}</div>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{h.title}</h3>
                <p className="mt-2">{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
