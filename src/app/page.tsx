/**
 * Home page ("/"). This is a Server Component: it runs at build time, reads your
 * content files, and ships HTML. The interactive bits (cloud, magnetic button,
 * scramble) are client components dropped in like LEGO pieces.
 */
import Link from "next/link";
import { EmbeddingCloud } from "@/components/EmbeddingCloud";
import { Magnetic, Reveal, RiseText, Scramble } from "@/components/motion";
import { PostRow, ProjectCard } from "@/components/cards";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getNow, getPosts, getProjects } from "@/lib/content";
import { site } from "@/lib/site";

const offTheClock = [
  { icon: "🦸", t: "Comics", d: "Superman guy. Hope plus restraint is the most underrated superpower. I will explain at length." },
  { icon: "☕", t: "Coffee", d: "Every experiment here starts with one cup and ends with two cups and a bug." },
  { icon: "🎮", t: "Games", d: "Horizon superfan, currently learning VR by walking into furniture." },
];

export default function Home() {
  const projects = getProjects().slice(0, 3);
  const posts = getPosts().slice(0, 4);
  const now = getNow();
  const latest = posts[0];
  const ticker = [
    ...posts.map((p) => `WEEK ${String(p.week).padStart(2, "0")} ● ${p.title.toUpperCase()}`),
    "NO CS DEGREE, LOTS OF TABS OPEN",
    ...now.reading.map((r) => `NOW READING: ${r.toUpperCase()}`),
  ].join(" ● ");

  return (
    <>
      <section className="relative flex min-h-[88vh] items-end overflow-hidden pb-12">
        <EmbeddingCloud />
        <div className="wrap relative z-10 w-full">
          <div className="kicker">AI playground · {site.location}</div>
          <h1 className="h-display mt-3 mb-2 text-[clamp(88px,22vw,300px)] leading-[0.8] tracking-[-0.07em]">
            <RiseText text="Yash" /><span className="text-accent">.</span>
          </h1>
          <div className="flex flex-wrap items-end justify-between gap-6 border-t-2 border-ink pt-4">
            <p className="max-w-xl text-lg md:text-xl">
              I pick something in AI that confuses me, poke at it until it makes sense (or breaks), and write down what happened. Currently:{" "}
              <Scramble words={[now.building, ...now.reading].filter(Boolean)} />.
            </p>
            {latest && (
              <Magnetic><Link href={`/log/${latest.slug}`} className="btn">See what broke in week {String(latest.week).padStart(2, "0")} →</Link></Magnetic>
            )}
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden><div>{ticker} ● {ticker} ●&nbsp;</div></div>

      <section className="wrap py-20">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="h-display text-[clamp(34px,6vw,64px)]">Stuff I&apos;m poking at</h2>
          <Link href="/projects" className="navlink font-mono text-sm">all of it →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((p, i) => <Reveal key={p.slug} delay={i * 0.08}><ProjectCard p={p} /></Reveal>)}
        </div>
      </section>

      <section className="wrap pb-20">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h2 className="h-display text-[clamp(34px,6vw,64px)]">Fresh notes</h2>
          <Link href="/log" className="navlink font-mono text-sm">full log →</Link>
        </div>
        {posts.map((p) => <PostRow key={p.slug} post={p} />)}
      </section>

      <section className="wrap pb-20">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="h-display text-[clamp(34px,6vw,64px)]">Off the clock</h2>
          <Link href="/about#off-the-clock" className="navlink font-mono text-sm">more →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {offTheClock.map((h, i) => (
            <Reveal key={h.t} delay={i * 0.08}>
              <Link href="/about#off-the-clock" className="card group !min-h-[200px]">
                <div>
                  <div className="text-4xl">{h.icon}</div>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight">{h.t}</h3>
                  <p className="mt-1 text-sm opacity-85">{h.d}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap grid gap-10 pb-10 md:grid-cols-2">
        <Reveal>
          <div className="kicker">Now · updated {now.updated}</div>
          <h2 className="h-display mt-2 text-4xl">This week&apos;s rabbit hole</h2>
          <p className="mt-3"><b>Building:</b> {now.building}</p>
          <p className="mt-1"><b>Reading:</b> {now.reading.join(", ")}</p>
          <Link href="/now" className="navlink mt-3 inline-block font-mono text-sm">more →</Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="kicker">Say hi</div>
          <h2 className="h-display mt-2 text-4xl">Come nerd out.</h2>
          <p className="mt-3 text-muted">Poking at something in AI too? Want to tell me where my experiment went wrong, or argue about the best Superman story? My inbox is open.</p>
          <div className="mt-4 flex flex-wrap gap-2 font-mono text-sm">
            {site.contact.map((c) => <a key={c.href} className="chip" href={c.href}>{c.label}</a>)}
          </div>
          <div className="mt-6"><NewsletterForm /></div>
        </Reveal>
      </section>
    </>
  );
}
