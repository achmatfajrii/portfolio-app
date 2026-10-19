"use client";

import { useState } from "react";
import Image from "next/image";

import CardSwap, { Card } from "./react-bits/CardSwap";
import { ProjectList } from "./ProjectList";
import { InView } from "./in-view";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  imageUrl?: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "Konekseed",
    description:
      "Social networking platform that brings people with entrepreneurial spirit that looking for business partners.",
    techStack: ["Next.js", "Tailwind CSS", "Git", "WebSocket"],
    repoUrl: "https://github.com/achmatfajrii",
    imageUrl: "/assets/project/konekseed.png",
  },
  {
    id: "2",
    title: "Vouchify",
    description:
      "Vouchify is an e-commerce platform that specializes in the sale of digital game vouchers. The main objective of this project is to provide users with easy and secure access to purchasing digital game vouchers from various popular gaming platforms.",
    techStack: ["Three.js", "Javascript", "HTML5", "Tailwind CSS"],
    repoUrl: "https://achmatfajrii.github.io/VouchifyApp/",
    imageUrl: "/assets/project/vouchify-home-card.png",
  },
   {
    id: "3",
    title: "ERM",
    description:
      "Vouchify is an e-commerce platform that specializes in the sale of digital game vouchers. The main objective of this project is to provide users with easy and secure access to purchasing digital game vouchers from various popular gaming platforms.",
    techStack: ["Three.js", "Javascript", "HTML5", "Tailwind CSS"],
    repoUrl: "https://achmatfajrii.github.io/VouchifyApp/",
    imageUrl: "/assets/project/erm.png",
  },
  {
    id: "4",
    title: "AMD-Academy",
    description:
      "Vouchify is an e-commerce platform that specializes in the sale of digital game vouchers. The main objective of this project is to provide users with easy and secure access to purchasing digital game vouchers from various popular gaming platforms.",
    techStack: ["Three.js", "Javascript", "HTML5", "Tailwind CSS"],
    repoUrl: "https://achmatfajrii.github.io/VouchifyApp/",
    imageUrl: "/assets/project/amd.png",
  },
  // {
  //   id: "project-3",
  //   title: "HSSE Safe Track",
  //   description:
  //     "HSSE dashboard for monitoring safety records, manhours, incidents, and safety performance indicators.",
  //   techStack: ["Vue.js", "Node.js", "PostgreSQL"],
  //   repoUrl: "https://github.com/achmatfajrii",
  //   imageUrl: "/assets/project/hsse-safe-track.png",
  // },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(0);

  const safeSelectedProject =
    projects.length > 0
      ? Math.min(selectedProject, projects.length - 1)
      : 0;

  return (
    <section
      id="projects"
      className="relative md:min-h-screen w-full pb-16 overflow-hidden bg-[#0E0C14]">
      
     <div className="lg:max-w-7xl mx-auto">
       <div className="pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 container">
        <div className="grid items-center gap-6 lg:gap-12 lg:grid-cols-[0.85fr_1.15fr]">

          {/* HEADING — mobile/tablet */}
          <div className="order-1 max-w-2xl lg:hidden">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Things I've{" "}
              <span className="text-[#A855F7]">built.</span>
            </h2>

            <p className="mt-2 md:mt-5 max-w-lg text-xs md:text-sm leading-relaxed text-white/40">
              A selection of things I've built, worked on,
              and continue to improve.
            </p>
          </div>

          {/* PROJECT LIST */}
          <div className="order-3 lg:order-1">

            {/* Heading — desktop */}
            <div className="hidden lg:block mb-14 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                Things I've{" "}
                <span className="text-[#A855F7]">built.</span>
              </h2>

              <p className="mt-2 md:mt-5 max-w-lg text-xs md:text-sm leading-relaxed text-white/40">
                A selection of things I've built, worked on,
                and continue to improve.
              </p>
            </div>

            <ProjectList
              projects={projects}
              selectedProject={safeSelectedProject}
              onSelect={setSelectedProject}
            />
          </div>

          {/* PROJECT PREVIEW */}
          <div className="relative order-2 min-h-[320px] sm:min-h-[380px] lg:min-h-[600px]">
            {projects.length > 0 && (
              <InView><CardSwap
                activeIndex={safeSelectedProject}
                onActiveIndexChange={setSelectedProject}
                width={500}
                height={400}
                cardDistance={40}
                verticalDistance={50}
                skewAmount={6}
                easing="elastic"
              >
                {projects.map((project) => (
                  <Card
  key={project.id}
  className="overflow-hidden border-white/10 bg-[#120F17]"
>
  {project.imageUrl ? (
  <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#120F17]">
    <Image
      src={project.imageUrl}
      alt={`${project.title} preview`}
      fill
      sizes="500px"
      className="object-contain object-center saturate-[1.05] contrast-[1.08]"
    />

    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

    <div className="absolute bottom-4 left-4">
      <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60 backdrop-blur-md">
        {project.title}
      </span>
    </div>
  </div>
) : (
  <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#120F17]">
    <span className="font-mono text-xs text-white/20">
      No preview available
    </span>
  </div>
)}
</Card>
                ))}
              </CardSwap>
              </InView>
            )}
          </div>

        </div>
      </div>
     </div>
    </section>
  );
}

