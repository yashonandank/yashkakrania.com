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
    blurb: "Full-time on EY's Technology Risk team in Atlanta after interning with the same group. I assess clients' IT systems and controls, identify where processes are exposed to risk, and recommend improvements. The work has given me a practical lens on technology governance that I now apply to how AI systems are built and deployed.",
  },
  {
    period: "2024 – 2026",
    title: "Research Assistant, Goizueta AI Lab",
    org: "Emory University",
    kind: "work",
    blurb: "Developed four GenAI applications, including a virtual TA and an autograder, to personalize student learning across five business classes. Designed a survey taken by 1,200+ alumni and faculty that informed the curriculum for a new undergraduate business degree in technology. Also built AI Case Coach using the Whisper API, React and Supabase, which reached 80+ users within its first week of launch.",
  },
  // ---------- past projects ----------
  {
    period: "2025 – 2026",
    title: "Goizueta Learning Platform",
    org: "AI-native learning management system",
    kind: "projects",
    blurb: "An AI-native learning management system designed to enhance personalized learning. Instead of adding AI on top of an existing LMS, the platform is built around it, with applications such as a practice-quiz study buddy that adapts questions to each student's gaps and helps them review course material at their own pace.",
  },
  {
    period: "2025 – 2026",
    title: "CaseSim",
    org: "AI agent case interview platform",
    kind: "projects",
    blurb: "An AI agent platform for practicing case interviews. The agent runs a full case end to end: it presents the prompt, responds to the candidate's structure and analysis, and asks follow-up questions the way an interviewer would. CaseSim was rolled out through the BBA Career Management Center so students can prepare for consulting recruiting on demand.",
  },
  // ---------- education ----------
  {
    period: "Class of 2026",
    title: "BBA, Goizueta Business School",
    org: "Emory University",
    kind: "school",
    blurb: "Bachelor of Business Administration with concentrations in Marketing, Management, Information Systems and Entrepreneurship. Coursework I found most interesting included Machine Learning, Customer Lifetime Value and Monetization, alongside Strategy Management and Corporate Finance. Served as a TA for Marketing Consulting Practicum, Intro to Accounting, Accounting Analytics, Data Management and AWS. Named to Poets & Quants' 100 Best & Brightest Business Majors of 2026 and received the Boisfeuillet Jones Medal for Leadership.",
  },
  {
    period: "2024 – 2026",
    title: "Captain, Case Competition Team",
    org: "Goizueta Business School",
    kind: "school",
    blurb: "Led Goizueta's case competition team as Captain (President). At the world's largest case competition in New Zealand, the team placed 3rd in the world and 1st among U.S. schools after solving four cases. Won 1st place by using AI tools to improve data collection for The Link Group's marketing research, and placed as semi-finalists among 300+ teams by applying AI and ML to enable riskier credit lending for Capital One customers.",
  },
  {
    period: "2025 – 2026",
    title: "Founder & President, Goizueta AI Association",
    org: "Emory University",
    kind: "school",
    blurb: "Founded Goizueta's AI association and grew it to 100+ BBA and MBA members. Organized and presented 14 educational sessions on prompt engineering and AI research. Designed and launched the school's flagship AI-powered 8-week accelerator, supporting 60+ students through ideation, concept validation, MVP engineering and pitch development. Also consulted the BBA Office on building AI capabilities for the school, which led to a new AI in Business major.",
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
