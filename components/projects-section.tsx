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
repoUrl?: string;
demoUrl?: string;
imageUrl?: string;
};

const projects: Project[] = [
{
id: "1",
title: "Konekseed",
description:
"Social networking platform that brings people with entrepreneurial spirit that looking for business partners.",
techStack: ["Next.js", "Tailwind CSS", "Git", "WebSocket"],
demoUrl: "https://konekseed.id/",
imageUrl: "/assets/project/konekseed.png",
},
{
id: "2",
title: "Vouchify",
description:
"Vouchify is an e-commerce platform that specializes in the sale of digital game vouchers. The main objective of this project is to provide users with easy and secure access to purchasing digital game vouchers from various popular gaming platforms.",
techStack: ["Three.js", "Javascript", "HTML5", "Tailwind CSS"],
repoUrl: "https://github.com/achmatfajrii/VochifyApp-ReactJS",
demoUrl: "https://achmatfajrii.github.io/VouchifyApp/",
imageUrl: "/assets/project/vouchify-home-card.png",
},
{
  id: "3",
  title: "ERM",
  description:
    "An internal electronic medical records application developed to support digital medical record management in a hospital environment.",
  techStack: [
    "React.js", "Laravel", "MySQL", "Tailwind CSS", "Git", "REST API"
  ],
  repoUrl: "",
  imageUrl: "/assets/project/erm.png",
},
{
  id: "4",
  title: "AMD Academy",
  description:
    "A training and bootcamp website providing professional learning opportunities and certification programs.",
  techStack: [
    "WordPress", "PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Site Kit", "Elementor", "Google Analytics"
  ],
  repoUrl: "",
  demoUrl: "https://amdacademy.id/",
  imageUrl: "/assets/project/amd.png",
},
];

export function ProjectsSection() {
const [selectedProject, setSelectedProject] = useState(0);

const safeSelectedProject =
projects.length > 0
? Math.min(selectedProject, projects.length - 1)
: 0;

return (
<section    id="projects"    className="relative w-full overflow-hidden bg-background pb-16 md\:min-h-screen"  >
<div className="max-w-7xl px-6 sm:px-8 lg:px-12">
<div className="pointer-events-none absolute inset-0 z-[1]" />

    <div className="relative z-10">
      <div className="grid items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* Heading — mobile/tablet */}
        <div className="order-1 max-w-2xl lg:hidden">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Things I've{" "}
            <span className="text-primary">built.</span>
          </h2>

          <p className="mt-2 max-w-lg text-xs leading-relaxed text-muted-foreground md:mt-5 md:text-sm">
            A selection of things I've built, worked on,
            and continue to improve.
          </p>
        </div>

        {/* Project list */}
        <div className="order-3 lg:order-1">
          {/* Heading — desktop */}
          <div className="mb-14 hidden max-w-2xl lg:block">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Things I've{" "}
              <span className="text-primary">built.</span>
            </h2>

            <p className="mt-2 max-w-lg text-xs leading-relaxed text-muted-foreground md:mt-5 md:text-sm">
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

        {/* Project preview */}
        <div className="relative order-2 min-h-[320px] sm:min-h-[380px] lg:min-h-[600px]">
          {projects.length > 0 && (
            <InView>
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
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden border-border bg-card"
                  >
                    {project.imageUrl ? (
                      <div className="relative h-full w-full overflow-hidden rounded-xl bg-card">
                        <Image
                          src={project.imageUrl}
                          alt={`${project.title} preview`}
                          fill
                          sizes="500px"
                          className="object-contain object-center saturate-[1.05] contrast-[1.08]"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                        <div className="absolute bottom-4 left-4">
                          <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
                            {project.title}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-card">
                        <span className="font-mono text-xs text-muted-foreground">
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
