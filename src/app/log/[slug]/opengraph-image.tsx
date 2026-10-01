// Per-post social preview: the post's title on the site's card. Pre-built for every post.
import { ogImage, ogSize } from "@/lib/og";
import { getPost, getPosts } from "@/lib/content";

export const alt = "Lab notebook entry";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)!;
  return ogImage({ kicker: `Week ${String(post.week).padStart(2, "0")} · lab notes`, title: post.title, footer: `${post.date} · ${post.readingMinutes} min read` });
}
