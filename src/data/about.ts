// About-page data. Keeping it as data (not hard-coded JSX) means the page just renders whatever is here.
export type Kind = "work" | "projects" | "school";
export type Entry = {
  period: string;
  title: string;
  org: string;
  kind: Kind;
  blurb: string;
  link?: string;
};

// Timeline filter chips, in order. The first one is selected by default.
export const kinds: { kind: Kind; label: string }[] = [
  { kind: "work", label: "work" },
  { kind: "projects", label: "past projects" },
  { kind: "school", label: "education" },
];

export const intro =
  "AI enthusiast with a business background. I try to learn one new thing every day, then immediately experiment with it to see if I actually understood it (verdict: sometimes). This site is where those experiments end up.";

export const timeline: Entry[] = [
  // ---------- work ----------
  {
    period: "2026 – now",
    title: "Technology Risk Analyst",
    org: "EY · Atlanta",
    kind: "work",
    blurb: "Professional worrier. I look at how big companies run their IT systems and figure out what could go sideways before it does. Turns out \"what could go wrong?\" is a full-time job, and a surprisingly useful lens for AI too.",
  },
  {
    period: "2024 – 2026",
    title: "Research Assistant, Goizueta AI Lab",
    org: "Emory University",
    kind: "work",
    blurb: "Built four GenAI apps for five business classes, including a virtual TA and an autograder (students had opinions about the autograder). Also made AI Case Coach with Whisper, React and Supabase; 80+ people used it in its first week, which I'm still a little smug about. And I designed a survey 1,200+ alumni and faculty took to shape a new tech-focused business degree.",
  },
  // ---------- past projects ----------
  {
    period: "2025 – 2026",
    title: "Goizueta Learning Platform",
    org: "AI-native learning management system",
    kind: "projects",
    blurb: "A learning platform built around AI from day one instead of bolted on later. The idea: every student gets a version of the class that adapts to them, with tools like a practice-quiz study buddy that figures out what you don't know yet and quizzes you on exactly that (rude, but effective).",
  },
  {
    period: "2025 – 2026",
    title: "CaseSim",
    org: "AI agent case interview platform",
    kind: "projects",
    blurb: "Case interviews are terrifying, and practice partners are never free at 11pm. CaseSim is an AI agent that runs a full case interview with you: it gives you the prompt, pushes back on your math and asks the annoying follow-ups. It got rolled out through the BBA Career Management Center, so real students now use it to prep.",
  },
  // ---------- education ----------
  {
    period: "Class of 2026",
    title: "BBA, Goizueta Business School",
    org: "Emory University",
    kind: "school",
    blurb: "Concentrated in Marketing, Management, Information Systems and Entrepreneurship, because picking one felt like commitment. The classes I nerded out on most were Machine Learning, Customer Lifetime Value and Monetization (basically: how do you predict what people will do, and what's it worth?), plus Strategy and Corporate Finance to keep me honest. TA'd five classes along the way, from Intro to Accounting to AWS. Somehow ended up on Poets & Quants' 100 Best & Brightest list and with the Boisfeuillet Jones Medal for Leadership.",
  },
  {
    period: "2024 – 2026",
    title: "Captain, Case Competition Team",
    org: "Goizueta Business School",
    kind: "school",
    blurb: "Case comps are where I learned to think fast and make slides faster. Highlights: 3rd in the world (1st from the U.S.) at the world's biggest competition, in New Zealand; 1st place using AI to fix market research data for The Link Group; and semi-finals out of 300+ teams using ML to rethink credit lending for Capital One. Very little sleep, zero regrets.",
  },
  {
    period: "2025 – 2026",
    title: "Founder & President, Goizueta AI Association",
    org: "Emory University",
    kind: "school",
    blurb: "Started an AI club and it got out of hand in the best way: 100+ members, 14 sessions on prompting and AI research, and an 8-week accelerator that took 60+ students from napkin idea to pitch. Also helped the school launch a brand-new AI in Business major, which is a fun thing to have a hand in.",
  },
];

// ---------- Interests outside of AI ----------

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

// Everything else. Order here = order on the page. To add photos, drop them in public/interests/
// and list them in `photos` (e.g. { src: "/interests/tennis-1.jpg", alt: "…", caption: "…" }).
export type Photo = { src: string; alt: string; caption?: string };
export type Interest = { id: string; icon: string; title: string; body: string[]; photos?: Photo[] };

export const interests: Interest[] = [
  {
    id: "tennis",
    icon: "🎾",
    title: "Tennis",
    body: ["Writeup coming soon. For now: I play, I lose points I should win, I keep coming back."],
  },
  {
    id: "gaming",
    icon: "🎮",
    title: "Gaming",
    body: ["Huge Horizon fan (Zero Dawn and Forbidden West). It's a robot-dinosaur world built on the ruins of an AI project gone very wrong, so it technically counts as research. Lately getting into VR, which mostly means walking into furniture."],
  },
  {
    id: "coffee",
    icon: "☕",
    title: "Coffee",
    body: ["Fuel for everything on this site. Most experiments here start with one cup and end with a second cup and a bug."],
  },
  {
    id: "cinema",
    icon: "🎬",
    title: "Cinema",
    body: ["Writeup coming soon. Popcorn opinions loading."],
  },
];
