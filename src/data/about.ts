// About-page data. Keeping it as data (not hard-coded JSX) means the page just renders whatever is here.
export type Entry = {
  period: string;
  title: string;
  org: string;
  kind: "work" | "built" | "led" | "school";
  blurb: string;
  link?: string;
};

export const intro =
  "By day I'm a technology risk analyst at EY in Atlanta, which means my job is asking \"what could go wrong?\" By night I flip it around: \"what happens if I poke this AI model?\" Business-school grad, no CS degree, learning mostly by breaking things.";

export const timeline: Entry[] = [
  {
    period: "2026 – now",
    title: "Technology Risk Analyst",
    org: "EY · Atlanta",
    kind: "work",
    blurb: "Professional worrier. I look at how big companies run their IT systems and figure out what could go sideways before it does. Turns out \"what could go wrong?\" is a full-time job.",
  },
  {
    period: "2026 – now",
    title: "Board Member",
    org: "B Local Georgia",
    kind: "led",
    blurb: "Helping grow Georgia's community of businesses trying to do right by people and the planet. Easily the most grown-up thing on this list.",
  },
  {
    period: "2024 – 2026",
    title: "Research Assistant, Goizueta AI Lab",
    org: "Emory University",
    kind: "built",
    blurb: "Built four GenAI apps for business classes, including a virtual TA and an autograder (students had opinions about the autograder). Also made AI Case Coach with Whisper, React and Supabase; 80+ people used it in its first week, which I'm still a little smug about.",
  },
  {
    period: "2025 – 2026",
    title: "Founder & President",
    org: "Goizueta AI Association",
    kind: "led",
    blurb: "Started an AI club and it got out of hand in the best way: 100+ members, 14 sessions on prompting and AI research, and an 8-week accelerator that took 60+ students from napkin idea to pitch. Also helped the school launch a new AI in Business major.",
  },
  {
    period: "2024 – 2026",
    title: "Captain, Case Competition Team",
    org: "Goizueta Business School",
    kind: "led",
    blurb: "Took the team to the world's biggest case competition, in New Zealand, and came 3rd in the world (1st from the U.S.). Four cases, very little sleep, zero regrets.",
  },
  {
    period: "2025 – 2026",
    title: "Chief Research Officer",
    org: "Emory Impact Investing Group",
    kind: "led",
    blurb: "Taught 111 students how to actually do research, ran the club's biggest symposium yet (160+ people), and set up teams to help vet deals for a $360k impact fund.",
  },
  {
    period: "Summer 2025",
    title: "Technology Risk Intern",
    org: "EY · Atlanta",
    kind: "work",
    blurb: "Dug into the IT systems of two NYSE-listed companies and drew more flowcharts than I thought humanly possible. Liked it enough to come back full-time.",
  },
  {
    period: "Summer 2024",
    title: "GenAI Data Science Intern",
    org: "EY · Kolkata",
    kind: "built",
    blurb: "Team of four, one chatbot: an inventory planner for a retailer with 6,000+ products. I simulated a lot of stores running out of a lot of things, then wrapped it in a Streamlit app so nobody needed training to use it.",
  },
  {
    period: "Summer 2023",
    title: "Go-to-Market Intern",
    org: "Cut n' Stitch Kidswear",
    kind: "work",
    blurb: "A company that makes Marvel merch (yes, superheroes again). Set up an AI-powered CRM, built a portfolio site that helped bump sales 11%, and pitched bulk buyers at trade shows across India.",
  },
  {
    period: "Class of 2026",
    title: "BBA, Goizueta Business School",
    org: "Emory University",
    kind: "school",
    blurb: "Majored in Marketing, Management, Information Systems and Entrepreneurship, because picking one felt like commitment. Somehow ended up on Poets & Quants' 100 Best & Brightest list and with the Boisfeuillet Jones Medal for Leadership. TA'd five classes, including one on AWS.",
  },
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
