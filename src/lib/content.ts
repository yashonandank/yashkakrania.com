/**
 * Content loader: reads the MDX files in /content and validates their frontmatter.
 *
 * Python analogy: like a module that does
 *   for path in Path("content/posts").glob("<slug>/index.mdx"): Post(**frontmatter)
 * where Post is a Pydantic model. Zod plays Pydantic's role, so a typo in a
 * post's frontmatter fails the build with a clear error instead of breaking a page.
 *
 * Runs only on the server at build time (it uses `fs`); none of it ships to browsers.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT = path.join(process.cwd(), "content");

// ---------- Schemas (like Pydantic models) ----------

export const ProjectType = z.enum(["experiment", "build", "wildcard"]);

const ProjectSchema = z.object({
  title: z.string(),
  type: ProjectType,
  status: z.enum(["active", "done", "paused"]).default("active"),
  summary: z.string(),
  keyFinding: z.string(),
  week: z.number().int(),
  repo: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

const SourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  type: z.enum(["paper", "blog", "video", "repo", "book", "docs", "dataset"]),
  topic: z.string(),
  note: z.string().optional(),
});

const PostSchema = z.object({
  title: z.string(),
  // gray-matter turns YYYY-MM-DD into a Date object; normalise it back to a string.
  date: z.union([z.string(), z.date()]).transform((d) =>
    typeof d === "string" ? d : d.toISOString().slice(0, 10),
  ),
  week: z.number().int(),
  project: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
  sources: z.array(SourceSchema).default([]),
  draft: z.boolean().default(false),
});

// `z.infer` turns a schema into a TypeScript type (like reading a Pydantic model's fields).
export type Project = z.infer<typeof ProjectSchema> & { slug: string; body: string };
export type Post = z.infer<typeof PostSchema> & { slug: string; body: string; readingMinutes: number };
export type Source = z.infer<typeof SourceSchema> & { citedIn: { slug: string; title: string }[] };

// ---------- Loaders ----------

function parse<T extends z.ZodTypeAny>(file: string, schema: T) {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${path.relative(process.cwd(), file)}:\n${result.error.message}`);
  }
  return { data: result.data as z.infer<T>, body: content };
}

export function getProjects(): Project[] {
  const dir = path.join(CONTENT, "projects");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, body } = parse(path.join(dir, f), ProjectSchema);
      return { ...data, slug: f.replace(/\.mdx$/, ""), body };
    })
    .sort((a, b) => b.week - a.week);
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}

export function getPosts({ includeDrafts = process.env.NODE_ENV !== "production" } = {}): Post[] {
  const dir = path.join(CONTENT, "posts");
  const projectSlugs = new Set(getProjects().map((p) => p.slug));
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const { data, body } = parse(path.join(dir, d.name, "index.mdx"), PostSchema);
      if (!projectSlugs.has(data.project)) {
        throw new Error(`Post "${d.name}" points to unknown project "${data.project}"`);
      }
      const words = body.split(/\s+/).length;
      return { ...data, slug: d.name, body, readingMinutes: Math.max(1, Math.round(words / 220)) };
    })
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

/** Posts in a project, oldest first, so they read like a series. */
export function getPostsForProject(slug: string) {
  return getPosts().filter((p) => p.project === slug).reverse();
}

/** Library = every source cited in any post, de-duplicated by URL, grouped by topic. */
export function getLibrary(): Record<string, Source[]> {
  const byUrl = new Map<string, Source>();
  for (const post of getPosts()) {
    for (const s of post.sources) {
      const existing = byUrl.get(s.url);
      if (existing) existing.citedIn.push({ slug: post.slug, title: post.title });
      else byUrl.set(s.url, { ...s, citedIn: [{ slug: post.slug, title: post.title }] });
    }
  }
  const groups: Record<string, Source[]> = {};
  for (const s of byUrl.values()) (groups[s.topic] ??= []).push(s);
  return groups;
}

export function getNow() {
  const { data, content } = matter(fs.readFileSync(path.join(CONTENT, "now.md"), "utf8"));
  const updated = data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : String(data.updated ?? "");
  return { updated, reading: (data.reading ?? []) as string[], building: String(data.building ?? ""), body: content };
}
