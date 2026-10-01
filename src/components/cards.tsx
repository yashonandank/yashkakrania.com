"use client";
import Link from "next/link";
import { ViewTransition } from "react";
import { useReducedMotion } from "motion/react";
import type { Post, Project } from "@/lib/content";

/**
 * Project card: C's orange/lime colour wipe on hover + B's subtle 3D tilt.
 * The <ViewTransition name=...> on the title pairs with the same name on the project
 * page, so the browser morphs the title from the card into the page heading.
 */
export function ProjectCard({ p }: { p: Pick<Project, "slug" | "title" | "type" | "week" | "keyFinding" | "summary" | "tags"> }) {
  const reduce = useReducedMotion();
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="card group"
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      }}
      onPointerLeave={(e) => { e.currentTarget.style.transform = ""; }}
    >
      <div>
        <span className="tag">{p.type} · w{String(p.week).padStart(2, "0")}</span>
        <ViewTransition name={`project-title-${p.slug}`} share="morph" default="none">
          <h3 className="mt-4 mb-2 text-2xl leading-tight font-bold tracking-[-0.02em]">{p.title}</h3>
        </ViewTransition>
        <p className="text-sm leading-snug opacity-85"><b>Key finding:</b> {p.keyFinding}</p>
      </div>
      <div className="mt-4 font-mono text-xs opacity-70">{p.tags.join(" · ")}</div>
    </Link>
  );
}

export function PostRow({ post }: { post: Pick<Post, "slug" | "title" | "date" | "week" | "summary" | "readingMinutes"> }) {
  return (
    <Link href={`/log/${post.slug}`} className="postrow group">
      <span className="font-mono text-xs text-accent">W{String(post.week).padStart(2, "0")}</span>
      <span>
        <span className="block text-xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-2xl">{post.title}</span>
        <span className="mt-1 block text-sm text-muted">{post.summary}</span>
      </span>
      <span className="hidden font-mono text-xs text-muted sm:block">{post.date} · {post.readingMinutes} min</span>
    </Link>
  );
}
