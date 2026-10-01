// One place for site-wide settings. Change a link here and it updates everywhere.
export const site = {
  name: "Yash",
  title: "Yash's AI playground",
  description:
    "No CS degree, lots of tabs open. I pick something in AI, poke at it until it makes sense (or breaks), and write down what happened.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "production" ? "https://yashkakrania.com" : "http://localhost:3000"),
  location: "Atlanta",
  links: {
    github: "https://github.com/yashonandank",
    email: "mailto:yashonandank@gmail.com",
    linkedin: "https://www.linkedin.com/in/yashonandankakrania",
    discord: "" as string, // empty = shows "coming soon" on the Community page
    discussions: "https://github.com/yashonandank/yashkakrania.com/discussions",
  },
  // Contact links shown on the home page, About and the footer, in this order.
  contact: [
    { label: "email", href: "mailto:yashonandank@gmail.com" },
    { label: "linkedin ↗", href: "https://www.linkedin.com/in/yashonandankakrania" },
    { label: "github ↗", href: "https://github.com/yashonandank" },
  ],
  buttondownUser: "" as string, // your Buttondown username; empty = signup form replaced by an RSS link
  // Post comments via GitHub Discussions. Get these values from https://giscus.app (see Comments.tsx).
  giscus: {
    repo: "yashonandank/yashkakrania.com", // "owner/repo", must be public with Discussions enabled
    repoId: "TODO",
    category: "Comments",
    categoryId: "TODO",
  },
  // Display names for project types. The keys stay as-is in content frontmatter.
  projectTypes: { experiment: "poking at it", build: "made a thing", wildcard: "¯\\_(ツ)_/¯" } as Record<string, string>,
  nav: [
    { href: "/about", label: "about" },
    { href: "/projects", label: "projects" },
    { href: "/log", label: "log" },
    { href: "/library", label: "library" },
    { href: "/community", label: "community" },
    { href: "/now", label: "now" },
  ],
} as const;
