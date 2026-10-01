import type { Metadata } from "next";
import { Magnetic, Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Community", description: "Mess around with AI alongside other people who are also figuring it out." };

const ways = [
  { n: "01", t: "Show your weekly thing", d: "Whatever you poked at this week. Half-finished counts. Fully broken counts double." },
  { n: "02", t: "Find my mistakes", d: "Every post has a 'what broke' section, and I definitely missed some. Point them out (nicely, ideally)." },
  { n: "03", t: "Team up", d: "Some ideas are more fun with two confused people instead of one. Pitch one in GitHub Discussions." },
  { n: "04", t: "Bring a paper (or a comic)", d: "Read something cool? Drop it in. It might become a future week." },
];

export default function CommunityPage() {
  return (
    <div className="wrap py-16">
      <div className="kicker">Community</div>
      <h1 className="h-display mt-2 max-w-5xl text-[clamp(48px,10vw,120px)]">Come break stuff with me.</h1>
      <p className="mt-6 max-w-2xl text-xl text-muted">
        Not a course, not a startup, nobody here will help you &ldquo;unlock your AI potential.&rdquo; Just people picking something in AI, figuring it out badly, then a little less badly, and sharing what happened. Beginners very welcome; I&apos;m basically one.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Magnetic><a href={site.links.discussions} className="btn">Say hi in GitHub Discussions →</a></Magnetic>
        {site.links.discord ? (
          <a href={site.links.discord} className="chip self-center !px-5 !py-3.5">Discord ↗</a>
        ) : (
          <span className="chip self-center !px-5 !py-3.5 !cursor-default opacity-60">Discord: coming soon™</span>
        )}
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
