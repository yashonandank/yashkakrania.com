import type { Metadata } from "next";
import { ProjectCard } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { getProjects } from "@/lib/content";
import { ProjectFilter } from "./ProjectFilter";

export const metadata: Metadata = { title: "Projects", description: "Every weekly experiment, build and wildcard." };

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <div className="wrap py-16">
      <div className="kicker">{projects.length} projects</div>
      <h1 className="h-display mt-2 text-[clamp(56px,12vw,140px)]">Projects</h1>
      <p className="mt-4 max-w-xl text-muted">Each project is one question or build. Some take a week, some turn into a series of posts.</p>
      {/* Filtering needs clicks → a client component. The cards are passed in already rendered. */}
      <ProjectFilter
        items={projects.map((p, i) => ({
          type: p.type,
          node: <Reveal key={p.slug} delay={(i % 3) * 0.08}><ProjectCard p={p} /></Reveal>,
        }))}
      />
    </div>
  );
}
