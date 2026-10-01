// One place for site-wide settings. Change a link here and it updates everywhere.
export const site = {
  name: "Yash",
  title: "Yash — AI lab notebook",
  description:
    "I pick one thing in AI each week, learn what it takes, and build it in public. Lab notes on interpretability experiments and applied AI builds.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "production" ? "https://yashkakrania.com" : "http://localhost:3000"),
  location: "Atlanta",
  links: {
    github: "https://github.com/yashonandank",
    email: "mailto:hello@example.com", // TODO: your email
    linkedin: "https://www.linkedin.com/in/TODO",
    x: "https://x.com/TODO",
    discord: "https://discord.gg/TODO",
    discussions: "https://github.com/yashonandank/TODO/discussions",
  },
  buttondownUser: "TODO", // your Buttondown username
  // Post comments via GitHub Discussions. Get these values from https://giscus.app (see Comments.tsx).
  giscus: {
    repo: "yashonandank/yashkakrania.com", // "owner/repo", must be public with Discussions enabled
    repoId: "TODO",
    category: "Comments",
    categoryId: "TODO",
  },
  nav: [
    { href: "/about", label: "about" },
    { href: "/projects", label: "projects" },
    { href: "/log", label: "log" },
    { href: "/library", label: "library" },
    { href: "/community", label: "community" },
    { href: "/now", label: "now" },
  ],
} as const;
