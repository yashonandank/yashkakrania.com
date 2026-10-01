/**
 * One template renders every project: /projects/persuasion-directions, /projects/next-thing, …
 * generateStaticParams tells Next.js which slugs exist so it pre-builds them all as static HTML.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PostRow } from "@/components/cards";
import { Mdx } from "@/lib/mdx";
import { getProject, getProjects, getPostsForProject } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params; // params is async in this Next.js version
  const project = getProject(slug);
  if (!project) notFound();
  const posts = getPostsForProject(slug);

  return (
    <div className="wrap py-16">
      <div className="font-mono text-xs text-muted">projects / {project.slug}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="tag text-accent">{site.projectTypes[project.type]}</span>
        <span className="tag">week {project.week}</span>
        <span className="tag">{project.status}</span>
      </div>
      <ViewTransition name={`project-title-${project.slug}`} share="morph" default="none">
        <h1 className="h-display mt-4 max-w-4xl text-[clamp(40px,7vw,84px)]">{project.title}</h1>
      </ViewTransition>
      <p className="mt-5 max-w-2xl text-xl text-muted">{project.summary}</p>

      <div className="mt-8 grid gap-4 border-y-2 border-ink py-5 md:grid-cols-[1fr_auto]">
        <p><span className="kicker mr-2">So far</span>{project.keyFinding}</p>
        {project.repo && <a href={project.repo} className="btn self-start">GitHub repo ↗</a>}
      </div>

      <div className="prose mt-8"><Mdx source={project.body} /></div>

      <h2 className="h-display mt-16 text-4xl">Notes on this one</h2>
      <div className="mt-2">
        {posts.length ? posts.map((p) => <PostRow key={p.slug} post={p} />) : <p className="mt-4 text-muted">First post coming soon. Probably.</p>}
      </div>
    </div>
  );
}
