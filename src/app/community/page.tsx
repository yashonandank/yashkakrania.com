import type { Metadata } from "next";
import { Magnetic, Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Community", description: "Build and learn AI alongside others, one week at a time." };

const ways = [
  { n: "01", t: "Share your weekly build", d: "Post what you're exploring in #weekly-builds. Half-finished is fine; that's the point." },
  { n: "02", t: "Pick apart an experiment", d: "Every post has a 'what broke' section. Help find the confound I missed." },
  { n: "03", t: "Pair on a project", d: "Some weeks are better with two people. Propose one in GitHub Discussions." },
  { n: "04", t: "Bring a paper", d: "Reading something good? Drop it in and it might become a future week." },
];

export default function CommunityPage() {
  return (
    <div className="wrap py-16">
      <div className="kicker">Community</div>
      <h1 className="h-display mt-2 max-w-5xl text-[clamp(48px,10vw,120px)]">Learn AI by building it, together.</h1>
      <p className="mt-6 max-w-2xl text-xl text-muted">
        A small group of people who pick something in AI, learn what it takes, and ship it, from interpretability experiments to applied agents. No gatekeeping, no polished tutorials, just lab notes and honest feedback.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Magnetic><a href={site.links.discord} className="btn">Join the Discord →</a></Magnetic>
        <a href={site.links.discussions} className="chip self-center !px-5 !py-3.5">GitHub Discussions ↗</a>
      </div>
      <div className="mt-20 grid gap-4 md:grid-cols-2">
        {ways.map((w, i) => (
          <Reveal key={w.n} delay={(i % 2) * 0.08}>
            <div className="card !min-h-0">
              <div>
                <span className="font-mono text-sm text-accent group-hover:text-inherit">{w.n}</span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight">{w.t}</h2>
                <p className="mt-2 opacity-85">{w.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
