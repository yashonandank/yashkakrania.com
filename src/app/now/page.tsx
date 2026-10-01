import type { Metadata } from "next";
import { Mdx } from "@/lib/mdx";
import { getNow } from "@/lib/content";

export const metadata: Metadata = { title: "Now", description: "What I'm reading and building this week." };

export default function NowPage() {
  const now = getNow();
  return (
    <div className="wrap py-16">
      <div className="kicker">updated {now.updated}</div>
      <h1 className="h-display mt-2 text-[clamp(56px,12vw,140px)]">Now</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="figure !m-0"><div className="kicker mb-2">Building</div><p className="text-2xl font-bold tracking-tight">{now.building}</p></div>
        <div className="figure !m-0"><div className="kicker mb-2">Reading</div><ul className="space-y-1">{now.reading.map((r) => <li key={r}>{r}</li>)}</ul></div>
      </div>
      <div className="prose mt-10"><Mdx source={now.body} /></div>
    </div>
  );
}
