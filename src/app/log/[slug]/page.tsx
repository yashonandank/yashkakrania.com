import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/lib/mdx";
import { getPost, getPosts, getPostsForProject, getProject } from "@/lib/content";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/log/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PageProps<"/log/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const project = getProject(post.project)!;
  const series = getPostsForProject(project.slug);
  const i = series.findIndex((p) => p.slug === slug);
  const prev = series[i - 1], next = series[i + 1];

  return (
    <article className="wrap py-16">
      <div className="mx-auto max-w-[720px]">
        <div className="font-mono text-xs text-muted">
          <Link href="/log" className="navlink">log</Link> / <Link href={`/projects/${project.slug}`} className="navlink">{project.slug}</Link> / week {String(post.week).padStart(2, "0")}
        </div>
        <h1 className="h-display mt-4 text-[clamp(38px,7vw,68px)]">{post.title}</h1>
        <p className="mt-4 text-xl text-muted">{post.summary}</p>
        <div className="mt-6 mb-2 flex flex-wrap gap-4 border-t-2 border-b border-t-ink border-b-line py-3 font-mono text-xs">
          <span>{post.date}</span>
          <span className="uppercase">{project.type}</span>
          <span>~{post.readingMinutes} min</span>
          {project.repo && <a href={project.repo} className="text-accent">github ↗</a>}
        </div>
      </div>

      <div className="prose mx-auto">
        <Mdx source={post.body} assetBase={`/log-assets/${post.slug}`} />
      </div>

      {post.sources.length > 0 && (
        <section className="mx-auto mt-14 max-w-[720px]">
          <h2 className="kicker mb-3">Sources</h2>
          <ul className="space-y-2 text-sm">
            {post.sources.map((s) => (
              <li key={s.url}><span className="mr-2 font-mono text-[11px] text-accent uppercase">{s.type}</span><a href={s.url} className="underline">{s.title}</a>{s.note && <span className="text-muted"> · {s.note}</span>}</li>
            ))}
          </ul>
        </section>
      )}

      <nav className="mx-auto mt-14 grid max-w-[720px] gap-4 border-t-2 border-ink pt-6 sm:grid-cols-2">
        {prev ? <Link href={`/log/${prev.slug}`} className="navlink"><span className="kicker block">← previous in series</span>{prev.title}</Link> : <span />}
        {next && <Link href={`/log/${next.slug}`} className="navlink sm:text-right"><span className="kicker block">next in series →</span>{next.title}</Link>}
      </nav>

      {/* giscus comments go here in the next step */}
    </article>
  );
}
