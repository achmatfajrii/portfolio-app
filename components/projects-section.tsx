"use client";

import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { useProjects } from "@/hooks/use-projects";
import type { Project } from "@/lib/api";

// Dipakai kalau API belum jalan / database masih kosong, supaya section tidak kosong total.
// TODO: hapus setelah ada proyek asli di database.
const fallbackProjects: Project[] = [
  {
    id: "fallback-1",
    title: "Project One",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proyek ini menyelesaikan masalah lorem ipsum dengan pendekatan lorem ipsum dolor sit amet.",
    techStack: ["React", "Node.js", "SQL"],
    repoUrl: "https://github.com/achmatfajrii",
  },
  {
    id: "fallback-2",
    title: "Project Two",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    techStack: ["Vue", "Node.js", "Docker"],
    repoUrl: "https://github.com/achmatfajrii",
  },
  {
    id: "fallback-3",
    title: "Project Three",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.",
    techStack: ["React", "SQL", "Git"],
    repoUrl: "https://github.com/achmatfajrii",
  },
];

export function ProjectsSection() {
  const { data, isLoading, isError } = useProjects();
  const projects = data && data.length > 0 ? data : fallbackProjects;

  return (
    <section id="projects" className="border-t border-border bg-card/40 py-24">
      <div className="container">
        <SectionHeading index="02" eyebrow="Projects" title="Selected work" />

        {isLoading && (
          <p className="mb-6 font-mono text-sm text-muted-foreground">
            Memuat proyek dari API...
          </p>
        )}
        {isError && (
          <p className="mb-6 font-mono text-sm text-muted-foreground">
            Belum bisa menghubungi API (pastikan portfolio-api sedang jalan) — menampilkan data sementara.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tech={project.techStack}
              demoHref={project.demoUrl ?? undefined}
              repoHref={project.repoUrl ?? undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}