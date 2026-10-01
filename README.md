# yash-site

Yash's AI playground: poking at AI until it makes sense (or breaks), and writing down what happened.
Next.js (App Router, fully static), MDX content, Tailwind v4, Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; fails loudly on bad frontmatter
```

## Where things live

| What | Where |
| --- | --- |
| Site name, links, newsletter, comments config | `src/lib/site.ts` |
| About page intro, timeline, hobbies, Superman panels | `src/data/about.ts` (panel images go in `public/comics/`) |
| Projects (one file each) | `content/projects/<slug>.mdx` |
| Weekly posts (folder each, images alongside) | `content/posts/<slug>/index.mdx` |
| "Now" box on home + /now | `content/now.md` |
| Colours, fonts, shared component styles | `src/app/globals.css` |

Library, RSS (`/rss.xml`), sitemap and social preview images are generated from the content. Nothing to maintain by hand.

## Weekly routine

1. Update `content/now.md`.
2. Add a post: `content/posts/w02-something/index.mdx` (copy the frontmatter from week 1). `project` must match a file in `content/projects/`. Keep `draft: true` until it's ready; drafts show in dev but not in production.
3. Or start from a notebook: `python scripts/nb2mdx.py nb.ipynb --slug w02-something --project <project> --week 2` (needs `pip install nbconvert`).
4. Inside posts you can use `<Callout>`, `<Figure>`, `<BarChart>`, `<AttentionArcs>`, `<GradioDemo>` (see `src/components/mdx-components.tsx`), `$math$`, and fenced code.

## One-time setup before launch

- **Newsletter / Discord**: set `buttondownUser` and `links.discord` in `src/lib/site.ts`. While empty, the site shows an RSS link and "Discord: coming soon" instead.
- **Comments (giscus)**: public repo → Settings → enable Discussions → install https://github.com/apps/giscus → pick the repo and a category at https://giscus.app → copy `repoId` / `categoryId` into `site.giscus`.
- **Deploy (Vercel)**: push to GitHub, import the repo at vercel.com/new, production URLs default to https://yashkakrania.com (override with `NEXT_PUBLIC_SITE_URL`).
