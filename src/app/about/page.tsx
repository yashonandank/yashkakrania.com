import type { Metadata } from "next";
import { Reveal, RiseText } from "@/components/motion";
import { Timeline } from "@/components/Timeline";
import { interests, intro, panels, superman, timeline } from "@/data/about";
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
        <aside>
          <Reveal>
            <h2 className="kicker mb-3">Find me</h2>
            <ul className="space-y-1 font-mono text-sm">
              {site.contact.map((c) => <li key={c.href}><a className="navlink" href={c.href}>{c.label}</a></li>)}
            </ul>
          </Reveal>
        </aside>
      </div>

      {/* Interests: linked from the home page as /about#off-the-clock */}
      <section id="off-the-clock" className="mt-28 scroll-mt-20">
        <div className="kicker">Off the clock</div>
        <h2 className="h-display mt-2 text-[clamp(40px,8vw,96px)]">Interests outside of AI.</h2>

        <div id="comics" className="mt-12 grid scroll-mt-20 gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="kicker mb-2">Comics</div>
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

        {interests.map((it) => (
          <div key={it.id} id={it.id} className="mt-24 grid scroll-mt-20 gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <div className="kicker mb-2">{it.title}</div>
              <h3 className="text-3xl font-extrabold tracking-tight">{it.icon} {it.title}</h3>
              {it.body.map((para, i) => <p key={i} className="mt-4 text-lg">{para}</p>)}
            </Reveal>
            <Reveal delay={0.08}>
              {it.photos?.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {it.photos.map((ph, i) => (
                    // An odd photo count lets the first one span the full width.
                    <figure key={ph.src} className={`panel !p-3 ${i === 0 && it.photos!.length % 2 ? "sm:col-span-2" : ""}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ph.src} alt={ph.alt} loading="lazy" className="w-full border-2 border-ink object-cover" />
                      {ph.caption ? <figcaption className="mt-2 font-mono text-xs text-muted">{ph.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="panel grid min-h-[220px] place-items-center text-center font-mono text-sm text-muted">[ photos incoming ]</div>
              )}
            </Reveal>
          </div>
        ))}
      </section>
    </div>
  );
}
