import type { Metadata } from "next";
import { Magnetic, Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Community", description: "Discuss the projects, share feedback, and propose collaborations." };

const ways = [
  { n: "01", t: "Share your work", d: "Working on a related question? Post it in Discussions, finished or in progress." },
  { n: "02", t: "Review the methods", d: "Each write-up states its limitations. If you spot a flaw in the setup or analysis, I would like to know." },
  { n: "03", t: "Collaborate", d: "Some questions are better explored with more than one person. Propose an idea in GitHub Discussions." },
  { n: "04", t: "Suggest reading", d: "Papers, datasets or tools that would inform a future project are always welcome." },
];

export default function CommunityPage() {
  return (
    <div className="wrap py-16">
      <div className="kicker">Community</div>
      <h1 className="h-display mt-2 max-w-5xl text-[clamp(48px,10vw,120px)]">Discussion and collaboration.</h1>
      <p className="mt-6 max-w-2xl text-xl text-muted">
        A place to discuss the projects on this site, critique the methods, and explore related questions together. Everyone is welcome, whatever their background.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Magnetic><a href={site.links.discussions} className="btn">Join GitHub Discussions →</a></Magnetic>
        {site.links.discord && <a href={site.links.discord} className="chip self-center !px-5 !py-3.5">Discord ↗</a>}
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
