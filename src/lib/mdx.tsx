/**
 * Turns an MDX string into React on the server at build time.
 * Plugins: GitHub-flavoured markdown (tables etc.), $LaTeX$ math via KaTeX,
 * and syntax-highlighted code blocks via Shiki (rehype-pretty-code).
 */
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import Image from "next/image";
// Import each component by name: "use client" modules can only hand individual components to the server.
import { AttentionArcs, BarChart, Callout, Figure, GradioDemo } from "@/components/mdx-components";
const mdxComponents = { AttentionArcs, BarChart, Callout, Figure, GradioDemo };

export function Mdx({ source, assetBase }: { source: string; assetBase?: string }) {
  return (
    <MDXRemote
      source={source}
      components={{
        ...mdxComponents,
        // Images written as ![alt](fig1.png) resolve relative to the post's folder.
        img: ({ src = "", alt = "" }: { src?: string; alt?: string }) => {
          const url = src.startsWith("http") || src.startsWith("/") || !assetBase ? src : `${assetBase}/${src}`;
          // eslint-disable-next-line @next/next/no-img-element
          return <img src={url} alt={alt} loading="lazy" className="my-6 w-full border border-line" />;
        },
        Image,
      }}
      options={{
        blockJS: false, // allow props like data={[1,2,3]}; safe because only you write the content
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [rehypeKatex, [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: true }]],
        },
      }}
    />
  );
}
