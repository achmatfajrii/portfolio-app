"use client";

import { useEffect, useState } from "react";

import { useProjects } from "@/hooks/use-projects";
import type { Project } from "@/lib/api";

import CardSwap, { Card } from "./react-bits/CardSwap";
import { ProjectList } from "./ProjectList";
import Image from "next/image";
import ShapeGrid from "@/components/react-bits/ShapeGrid";

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
  const {
    data,
    isLoading,
    isError,
  } = useProjects();

  const [selectedProject, setSelectedProject] = useState(0);

  const projects =
    data && data.length > 0
      ? data
      : fallbackProjects;

  useEffect(() => {
    if (projects.length === 0) {
      setSelectedProject(0);
      return;
    }

    setSelectedProject((current) =>
      Math.min(current, projects.length - 1)
    );
  }, [projects.length]);

  const safeSelectedProject =
    projects.length > 0
      ? Math.min(
          selectedProject,
          projects.length - 1
        )
      : 0;

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden bg-[#0E0C14]"
    >
      {/* ================================= */}
      {/* BACKGROUND — SHAPE GRID */}
      {/* ================================= */}
{/* 
      <div className="pointer-events-none absolute inset-0 z-0">
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#2F293A"
          hoverFillColor="#222"
          shape="square"
          hoverTrailAmount={0}
        />
      </div> */}

      {/* Optional overlay supaya background tidak terlalu terang */}
      <div className="pointer-events-none absolute inset-0 z-[1]" />

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <div className="relative z-10 container py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">

          {/* =============================== */}
          {/* LEFT — PROJECT LIST */}
          {/* =============================== */}

          <div>
           <div className="mb-14 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Things I've{" "}
              <span className="text-[#A855F7]">built.</span>
            </h2>

            <p className="mt-2 md:mt-5 max-w-lg text-xs md:text-sm leading-relaxed text-white/40">
              A selection of things I've built, worked on,
              and continue to improve.
            </p>
          </div>

            {isLoading && (
              <p className="mb-6 font-mono text-sm text-muted-foreground">
                Memuat proyek dari API...
              </p>
            )}

            {isError && (
              <p className="mb-6 font-mono text-sm text-muted-foreground">
                Belum bisa menghubungi API —
                menampilkan data sementara.
              </p>
            )}

            <ProjectList
              projects={projects}
              selectedProject={safeSelectedProject}
              onSelect={setSelectedProject}
            />
          </div>

          {/* =============================== */}
          {/* RIGHT — PROJECT PREVIEW */}
          {/* =============================== */}

          <div className="relative min-h-[600px]">

            {projects.length > 0 && (
              <CardSwap
                activeIndex={safeSelectedProject}
                onActiveIndexChange={setSelectedProject}
                width={500}
                height={400}
                cardDistance={40}
                verticalDistance={50}
                skewAmount={6}
                easing="elastic"
              >
                {projects.map((project, index) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden border-white/10 bg-[#120F17]"
                  >
                    {project.imageUrl ? (
                      <div className="relative h-full w-full overflow-hidden rounded-xl">

                        <Image
                          src={project.imageUrl}
                          alt={`${project.title} preview`}
                          fill
                          priority={
                            index === safeSelectedProject
                          }
                          sizes="500px"
                          className="object-cover object-top"
                        />

                        {/* Gradient */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                        {/* Project label */}
                        <div className="absolute bottom-4 left-4">
                          <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60 backdrop-blur-md">
                            {project.title}
                          </span>
                        </div>

                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-mono text-xs text-white/20">
                          No preview available
                        </span>
                      </div>
                    )}
                  </Card>
                ))}
              </CardSwap>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}