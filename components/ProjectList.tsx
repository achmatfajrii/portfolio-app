// ProjectList.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string | null;
  repoUrl?: string | null;
  imageUrl?: string | null;
}

interface ProjectListProps {
  projects: Project[];
  selectedProject: number;
  onSelect: (index: number) => void;
}

const PROJECTS_PER_PAGE = 4;
const SWIPE_THRESHOLD = 50; // px minimal geser horizontal biar dianggap swipe

export function ProjectList({
  projects,
  selectedProject,
  onSelect,
}: ProjectListProps) {
  const [currentPage, setCurrentPage] = useState(() =>
    Math.floor(selectedProject / PROJECTS_PER_PAGE)
  );

  const totalPages = Math.ceil(
    projects.length / PROJECTS_PER_PAGE
  );

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(0);
      return;
    }

    const selectedPage = Math.floor(
      selectedProject / PROJECTS_PER_PAGE
    );

    setCurrentPage(selectedPage);
  }, [selectedProject, totalPages]);

  const startIndex =
    currentPage * PROJECTS_PER_PAGE;

  const endIndex = Math.min(
    startIndex + PROJECTS_PER_PAGE,
    projects.length
  );

  const visibleProjects = projects.slice(
    startIndex,
    endIndex
  );

  const goToPage = (page: number) => {
    if (page < 0 || page >= totalPages) return;

    setCurrentPage(page);

    const firstProjectIndex =
      page * PROJECTS_PER_PAGE;

    onSelect(firstProjectIndex);
  };

  // Pindah satu project maju/mundur — dipakai switcher mobile
  const goToProject = (index: number) => {
    if (index < 0 || index >= projects.length) return;
    onSelect(index);
  };

  // Swipe gesture untuk switcher mobile
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;

    if (!start) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    // abaikan kalau gesernya lebih vertikal (biar scroll halaman gak keganggu)
    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD ||
      Math.abs(deltaX) < Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) {
      goToProject(selectedProject + 1); // geser ke kiri -> project berikutnya
    } else {
      goToProject(selectedProject - 1); // geser ke kanan -> project sebelumnya
    }
  };

  if (projects.length === 0) {
    return (
      <div className="py-8 text-sm text-white/30">
        No projects available.
      </div>
    );
  }

  const currentProject = projects[selectedProject];

  return (
    <div className="w-full">

      {/* =============================== */}
      {/* MOBILE — switcher satu project (kiri/kanan, bisa di-swipe) */}
      {/* =============================== */}
      <div className="lg:hidden">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
            Projects
          </span>

          <span className="font-mono text-xs text-white/40">
            <span className="text-[#A855F7]">
              {String(selectedProject + 1).padStart(2, "0")}
            </span>
            <span className="mx-1 text-white/20">/</span>
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Konten project aktif — area ini yang bisa di-swipe */}
        <div
          className="touch-pan-y select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <h3 className="text-lg font-medium text-white">
            {currentProject.title}
          </h3>

          {currentProject.techStack?.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
              {currentProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] text-white/35"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/45">
            {currentProject.description}
          </p>

          <div className="mt-3 flex items-center gap-5">
            {currentProject.repoUrl && (
              <a href={currentProject.repoUrl} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-2 text-xs text-white/50 transition-colors hover:text-white">
                GitHub
                <span className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                  ↗
                </span>
              </a>
            )}

            {currentProject.demoUrl && (
              <a href={currentProject.demoUrl} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-2 text-xs text-[#A855F7] transition-colors hover:text-[#C084FC]">
                Live Website
                <span className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Kontrol kiri/kanan + dots */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goToProject(selectedProject - 1)}
            disabled={selectedProject === 0}
            className={`text-xs transition-colors ${
              selectedProject === 0
                ? "cursor-not-allowed text-white/10"
                : "text-white/40 hover:text-white"
            }`}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => goToProject(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  selectedProject === index
                    ? "w-6 bg-[#A855F7]"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToProject(selectedProject + 1)}
            disabled={selectedProject === projects.length - 1}
            className={`text-xs transition-colors ${
              selectedProject === projects.length - 1
                ? "cursor-not-allowed text-white/10"
                : "text-white/40 hover:text-white"
            }`}
          >
            Next →
          </button>
        </div>
      </div>

      {/* =============================== */}
      {/* DESKTOP — list lengkap + pagination (tidak diubah) */}
      {/* =============================== */}
      <div className="hidden lg:block">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
            Projects
          </span>

          <span className="font-mono text-xs text-white/40">
            <span className="text-[#A855F7]">
              {String(selectedProject + 1).padStart(2, "0")}
            </span>

            <span className="mx-1 text-white/20">
              /
            </span>

            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Projects */}
        <div>
          {visibleProjects.map(
            (project, localIndex) => {
              const index =
                startIndex + localIndex;

              const isActive =
                selectedProject === index;

              return (
                <div
                  key={project.id}
                  className={`relative border-b border-white/10 transition-all duration-500 ${
                    isActive
                      ? "border-white/20"
                      : ""
                  }`}
                >
                  {/* Project button */}
                  <button
                    type="button"
                    onClick={() => onSelect(index)}
                    className="group flex w-full items-center py-5 text-left"
                  >
                    {/* Active indicator */}
                    <span
                      className={`absolute left-0 top-0 h-full w-[2px] transition-all duration-500 ${
                        isActive
                          ? "bg-[#A855F7]"
                          : "bg-transparent"
                      }`}
                    />

                    <div className="flex w-full items-center gap-4 pl-4">
                      {/* Number */}
                      <span
                        className={`w-8 shrink-0 font-mono text-xs transition-colors duration-300 ${
                          isActive
                            ? "text-[#A855F7]"
                            : "text-white/25 group-hover:text-white/50"
                        }`}
                      >
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      {/* Title */}
                      <div className="min-w-0 flex-1">
                        <h3
                          className={`text-base font-medium transition-all duration-300 ${
                            isActive
                              ? "translate-x-1 text-white"
                              : "text-white/55 group-hover:translate-x-1 group-hover:text-white"
                          }`}
                        >
                          {project.title}
                        </h3>

                        {/* Tech stack hanya ketika collapsed */}
                        {!isActive &&
                          project.techStack?.length > 0 && (
                            <div className="mt-1 flex gap-3">
                              {project.techStack
                                .slice(0, 3)
                                .map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-[11px] text-white/25"
                                  >
                                    {tech}
                                  </span>
                                ))}
                            </div>
                          )}
                      </div>

                      {/* Arrow */}
                      <span
                        className={`shrink-0 text-lg transition-all duration-300 ${
                          isActive
                            ? "rotate-90 text-[#A855F7]"
                            : "text-white/20 group-hover:text-white/50"
                        }`}
                      >
                        →
                      </span>
                    </div>
                  </button>

                  {/* Expanded content */}
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-16 pr-6">
                        {/* Description */}
                        <p className="max-w-lg text-sm leading-relaxed text-white/45">
                          {project.description}
                        </p>

                        {/* Tech stack */}
                        {project.techStack?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                            {project.techStack.map(
                              (tech) => (
                                <span
                                  key={tech}
                                  className="text-[11px] text-white/35"
                                >
                                  {tech}
                                </span>
                              )
                            )}
                          </div>
                        )}

                        {/* Links */}
                        <div className="mt-5 flex items-center gap-5">
                          {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="group/link inline-flex items-center gap-2 text-xs text-white/50 transition-colors hover:text-white">
                              GitHub
                              <span className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                                ↗
                              </span>
                            </a>
                          )}

                          {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="group/link inline-flex items-center gap-2 text-xs text-[#A855F7] transition-colors hover:text-[#C084FC]">
                              Live Website
                              <span className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                                ↗
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                goToPage(currentPage - 1)
              }
              disabled={currentPage === 0}
              className={`text-xs transition-colors ${
                currentPage === 0
                  ? "cursor-not-allowed text-white/10"
                  : "text-white/40 hover:text-white"
              }`}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      goToPage(index)
                    }
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentPage === index
                        ? "w-6 bg-[#A855F7]"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to page ${
                      index + 1
                    }`}
                  />
                )
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                goToPage(currentPage + 1)
              }
              disabled={
                currentPage === totalPages - 1
              }
              className={`text-xs transition-colors ${
                currentPage === totalPages - 1
                  ? "cursor-not-allowed text-white/10"
                  : "text-white/40 hover:text-white"
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}