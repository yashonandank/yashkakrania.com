/**
 * Home page ("/"). This is a Server Component: it runs at build time, reads your
 * content files, and ships HTML. The interactive bits (cloud, magnetic button)
 * are client components dropped in like LEGO pieces.
 */
import Link from "next/link";
import { EmbeddingCloud } from "@/components/EmbeddingCloud";
import { Magnetic, Reveal, RiseText } from "@/components/motion";
import { PostRow, ProjectCard } from "@/components/cards";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getNow, getPosts, getProjects } from "@/lib/content";
import { site } from "@/lib/site";

export default function Home() {
  const projects = getProjects().slice(0, 3);
  const posts = getPosts().slice(0, 4);
  const now = getNow();
  const latest = posts[0];
  const ticker = [
    ...posts.map((p) => `PROJECT ${String(p.week).padStart(2, "0")} ● ${p.title.toUpperCase()}`),
    "EXPLORING HOW AI SYSTEMS BEHAVE",
    ...now.reading.map((r) => `NOW READING: ${r.toUpperCase()}`),
  ].join(" ● ");

  return (
    <>
      <section className="relative flex min-h-[88vh] items-end overflow-hidden pb-12">
        <EmbeddingCloud />
        <div className="wrap relative z-10 w-full">
          <div className="kicker">AI projects · {site.location}</div>
          <h1 className="h-display mt-3 mb-2 text-[clamp(88px,22vw,300px)] leading-[0.8] tracking-[-0.07em]">
            <RiseText text="Yash" /><span className="text-accent">.</span>
          </h1>
          <div className="flex flex-wrap items-end justify-between gap-6 border-t-2 border-ink pt-4">
            <p className="max-w-xl text-lg md:text-xl">
              I&apos;m interested in AI and explore it through hands-on projects. Each one starts with a question, and I publish the code along with a write-up of the method, the results and their limits.
            </p>
            {latest && (
              <Magnetic><Link href={`/log/${latest.slug}`} className="btn">Read the latest write-up →</Link></Magnetic>
            )}
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden><div>{ticker} ● {ticker} ●&nbsp;</div></div>

      <section className="wrap py-20">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="h-display text-[clamp(34px,6vw,64px)]">Projects</h2>
          <Link href="/projects" className="navlink font-mono text-sm">all projects →</Link>
        </div>
        {projects.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((p, i) => <Reveal key={p.slug} delay={i * 0.08}><ProjectCard p={p} /></Reveal>)}
          </div>
        ) : <p className="text-muted">The first project is being written up and will be published here shortly.</p>}
      </section>

      {posts.length > 0 && (
        <section className="wrap pb-20">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <h2 className="h-display text-[clamp(34px,6vw,64px)]">Latest write-ups</h2>
            <Link href="/log" className="navlink font-mono text-sm">full log →</Link>
          </div>
          {posts.map((p) => <PostRow key={p.slug} post={p} />)}
        </section>
      )}

      <section className="wrap grid gap-10 pb-10 md:grid-cols-2">
        <Reveal>
          <div className="kicker">Now · updated {now.updated}</div>
          <h2 className="h-display mt-2 text-4xl">Currently</h2>
          {now.building && <p className="mt-3"><b>Working on:</b> {now.building}</p>}
          {now.reading.length > 0 && <p className="mt-1"><b>Reading:</b> {now.reading.join(", ")}</p>}
          <Link href="/now" className="navlink mt-3 inline-block font-mono text-sm">more →</Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="kicker">Contact</div>
          <h2 className="h-display mt-2 text-4xl">Get in touch.</h2>
          <p className="mt-3 text-muted">If you are working on something related, have feedback on a write-up, or would like to collaborate, I would be glad to hear from you.</p>
          <div className="mt-4 flex flex-wrap gap-2 font-mono text-sm">
            {site.contact.map((c) => <a key={c.href} className="chip" href={c.href}>{c.label}</a>)}
          </div>
          <div className="mt-6"><NewsletterForm /></div>
        </Reveal>
      </section>
    </>
  );
}
