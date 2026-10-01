// About-page data. DRAFT placeholders: replace with your real details (dates, outcomes).
// Keeping it as data (not hard-coded JSX) means the timeline component just renders whatever is here.
export type Entry = {
  period: string;
  title: string;
  org: string;
  kind: "work" | "education" | "founded" | "built";
  blurb: string;
  link?: string;
};

export const intro =
  "Business-school grad turned self-taught AI builder. I ship real AI products without a CS degree, and I use this site to go deeper on how models actually work.";

export const timeline: Entry[] = [
  { period: "2026 –", title: "Technology Risk", org: "Big 4 firm", kind: "work", blurb: "TODO: one line on what you do and one thing you're pushing (AI in pre-implementation assessments?)." },
  { period: "TODO", title: "Founder", org: "GAIA", kind: "founded", blurb: "Grew it from zero to 100+ members, with a formal 8-week AI accelerator. TODO: outcome." },
  { period: "TODO", title: "CaseSim", org: "Side project", kind: "built", blurb: "Professor-facing case simulation platform. TODO: one-line outcome." },
  { period: "TODO", title: "Goizueta Learning Platform", org: "Emory", kind: "built", blurb: "Rebuilt learning platform (React + FastAPI). TODO: outcome." },
  { period: "TODO", title: "wAIve", org: "Side project", kind: "built", blurb: "Personalized weekly news digest with Socratic AI conversations." },
  { period: "TODO", title: "BBA: Marketing, Information Systems, AI, Entrepreneurship", org: "Emory University, Goizueta", kind: "education", blurb: "Poets & Quants Top 100 undergraduate business student." },
];

export const interests = ["Interpretability", "Agents", "Music production", "Coffee", "Cooking", "TODO"];
