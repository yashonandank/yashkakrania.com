// About-page data. Timeline entries are DRAFT placeholders: replace with your real details (dates, outcomes).
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
  "Business-school grad who got hooked on AI and never recovered. No CS degree, so I learn the only way I know how: build the thing, break the thing, write down why it broke. This site is where the wreckage goes.";

export const timeline: Entry[] = [
  { period: "2026 –", title: "Technology Risk", org: "Big 4 firm", kind: "work", blurb: "TODO: one line on what you do and one thing you're pushing (AI in pre-implementation assessments?)." },
  { period: "TODO", title: "Founder", org: "GAIA", kind: "founded", blurb: "Grew it from zero to 100+ members, with a formal 8-week AI accelerator. TODO: outcome." },
  { period: "TODO", title: "CaseSim", org: "Side project", kind: "built", blurb: "Professor-facing case simulation platform. TODO: one-line outcome." },
  { period: "TODO", title: "Goizueta Learning Platform", org: "Emory", kind: "built", blurb: "Rebuilt learning platform (React + FastAPI). TODO: outcome." },
  { period: "TODO", title: "wAIve", org: "Side project", kind: "built", blurb: "Personalized weekly news digest with Socratic AI conversations." },
  { period: "TODO", title: "BBA: Marketing, Information Systems, AI, Entrepreneurship", org: "Emory University, Goizueta", kind: "education", blurb: "Poets & Quants Top 100 undergraduate business student." },
];

export const interests = ["Interpretability", "Agents", "Comics", "Coffee", "Video games", "VR"];

// ---------- Off the clock ----------

export const superman = {
  title: "Why Superman",
  body: [
    "Superman is my favourite character, and it's not because of the flying. It's that he's the most powerful being on the planet and spends most of his time being… nice. He could run the world by lunch. Instead he catches falling people, follows rules he could ignore, and still shows up for his day job.",
    "That's the combo I love: hope, with real power behind it, and the restraint not to abuse that power. Restraint is the actual superpower. Anyone strong can smash things; choosing not to is the hard part.",
    "It's also, conveniently, a decent way to think about AI. The interesting question isn't what a model can do. It's what it chooses not to.",
  ],
};

// Famous Superman moments. To show the actual art, put an image in public/comics/ and set `img`
// (e.g. img: "/comics/all-star-10.jpg"). Without one, the card shows a comic-style placeholder.
export type Panel = { book: string; year: number; creators: string; moment: string; why: string; img?: string };

export const panels: Panel[] = [
  {
    book: "Action Comics #1",
    year: 1938,
    creators: "Jerry Siegel & Joe Shuster",
    moment: "The cover: Superman lifting a car over his head.",
    why: "Where the whole superhero thing started. Two kids from Cleveland invent a genre, and his first move is wrecking a getaway car. Subtle, he was not (yet).",
  },
  {
    book: "Action Comics #775",
    year: 2001,
    creators: "Joe Kelly, Doug Mahnke & Lee Bermejo",
    moment: "\"What's So Funny About Truth, Justice & the American Way?\" Superman vs. the Elite.",
    why: "A gang of edgy 'modern' heroes who kill their enemies calls Superman a relic. He shows them, terrifyingly, what he could do if he stopped holding back. Then he holds back. Best argument for restraint ever printed.",
  },
  {
    book: "All-Star Superman #10",
    year: 2008,
    creators: "Grant Morrison & Frank Quitely",
    moment: "The rooftop: Superman stops mid-crisis to talk a teenager named Regan down from a ledge.",
    why: "He's dying, he's saving the world on a deadline, and he still makes time for one person. If you read one page of Superman ever, make it this one.",
  },
];

export const hobbies = [
  {
    icon: "☕",
    title: "Coffee",
    body: "Fuel for everything on this site. Most experiments here start with one cup and end with a second cup and a bug.",
  },
  {
    icon: "🎮",
    title: "Video games",
    body: "Huge Horizon fan (Zero Dawn and Forbidden West). It's a robot-dinosaur world built on the ruins of an AI project gone very wrong, so it technically counts as research. Lately getting into VR, which mostly means walking into furniture.",
  },
];
