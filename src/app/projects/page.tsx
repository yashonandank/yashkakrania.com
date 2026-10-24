import type { Metadata } from "next";
import { ProjectCard } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { getProjects } from "@/lib/content";
import { ProjectFilter } from "./ProjectFilter";

export const metadata: Metadata = { title: "Projects", description: "AI projects I have built and explored." };

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <div className="wrap py-16">
      <div className="kicker">{projects.length} projects</div>
      <h1 className="h-display mt-2 text-[clamp(56px,12vw,140px)]">Projects</h1>
      <p className="mt-4 max-w-xl text-muted">Each project starts with a question about how AI systems behave. Every one links to its code and a write-up of what I found.</p>
      {projects.length === 0 && <p className="mt-10 text-muted">The first project is being written up and will be published here shortly.</p>}
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
