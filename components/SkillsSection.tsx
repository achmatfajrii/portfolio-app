"use client";

import { useMemo, useState } from "react";
import Galaxy from '@/components/react-bits/Galaxy';

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiVuedotjs,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiGit,
  SiGithub,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Category =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Data"
  | "Tools";

type Skill = {
  name: string;
  category: Category;
  icon: IconType;
  color: string;
  description: string;
  level: "Core" | "Working" | "Growing";
};

type Position = {
  x: number;
  y: number;
};

const skills: Skill[] = [
  {
    name: "React",
    category: "Frontend",
    icon: SiReact,
    color: "#61DAFB",
    description:
      "My primary tool for building interactive and component-driven interfaces.",
    level: "Core",
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: SiNextdotjs,
    color: "#FFFFFF",
    description:
      "Used for building production-ready React applications and portfolio projects.",
    level: "Core",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    icon: SiTypescript,
    color: "#3178C6",
    description:
      "I use TypeScript to make frontend code more predictable and maintainable.",
    level: "Core",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    icon: SiJavascript,
    color: "#F7DF1E",
    description:
      "The foundation behind most of my web development work.",
    level: "Core",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: SiTailwindcss,
    color: "#06B6D4",
    description:
      "My preferred approach for building clean and responsive interfaces quickly.",
    level: "Core",
  },
  {
    name: "Node.js",
    category: "Backend",
    icon: SiNodedotjs,
    color: "#5FA04E",
    description:
      "Used to build backend services, APIs, and server-side applications.",
    level: "Core",
  },
  {
    name: "Express.js",
    category: "Backend",
    icon: SiExpress,
    color: "#FFFFFF",
    description:
      "A lightweight framework I use for building REST APIs with Node.js.",
    level: "Core",
  },
  {
    name: "Prisma",
    category: "Backend",
    icon: SiPrisma,
    color: "#FFFFFF",
    description:
      "Used as an ORM to interact with relational databases in modern applications.",
    level: "Working",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    icon: SiPostgresql,
    color: "#4169E1",
    description:
      "One of the relational databases I use for application development.",
    level: "Working",
  },
  {
    name: "MySQL",
    category: "Database",
    icon: SiMysql,
    color: "#4479A1",
    description:
      "Experienced with MySQL through application and enterprise projects.",
    level: "Working",
  },
  {
    name: "Vue.js",
    category: "Frontend",
    icon: SiVuedotjs,
    color: "#42B883",
    description:
      "Used in existing projects and enterprise applications.",
    level: "Working",
  },
  {
    name: "Python",
    category: "Data",
    icon: SiPython,
    color: "#3776AB",
    description:
      "Currently exploring Python with a focus on data analysis.",
    level: "Growing",
  },
  {
    name: "Git",
    category: "Tools",
    icon: SiGit,
    color: "#F05032",
    description:
      "Used daily for version control, branching, collaboration, and deployment workflows.",
    level: "Core",
  },
  {
    name: "GitHub",
    category: "Tools",
    icon: SiGithub,
    color: "#FFFFFF",
    description:
      "Used for source control, collaboration, and managing development projects.",
    level: "Core",
  },
];

/**
 * Position masing-masing node.
 *
 * Semua posisi menggunakan percentage supaya
 * ecosystem tetap responsive.
 */
const positions: Record<string, Position> = {
  React: { x: 16, y: 25 },
  Nextjs: { x: 30, y: 10 },
  TypeScript: { x: 50, y: 20 },
  JavaScript: { x: 70, y: 11 },
  "Tailwind CSS": { x: 85, y: 28 },

  "Node.js": { x: 13, y: 54 },
  "Express.js": { x: 29, y: 68 },
  Prisma: { x: 72, y: 68 },
  PostgreSQL: { x: 87, y: 53 },

  "MySQL": { x: 25, y: 88 },
  "Vue.js": { x: 43, y: 88 },
  Python: { x: 60, y: 88 },
  Git: { x: 77, y: 88 },
  GitHub: { x: 91, y: 76 },
};

const mobilePositions: Record<string, { x: number; y: number }> = {
  React: { x: 50, y: 9 },
  "Next.js": { x: 72, y: 13 },
  TypeScript: { x: 88, y: 29 },
  JavaScript: { x: 91, y: 51 },
  "Tailwind CSS": { x: 79, y: 73 },
  "Node.js": { x: 63, y: 89 },
  "Express.js": { x: 38, y: 89 },
  Prisma: { x: 20, y: 74 },
  PostgreSQL: { x: 9, y: 53 },
  MySQL: { x: 12, y: 31 },
  "Vue.js": { x: 28, y: 15 },
  Python: { x: 43, y: 8 },
  Git: { x: 61, y: 9 },
  GitHub: { x: 84, y: 68 },
};

const getMobilePosition = (name: string) => {
  return mobilePositions[name] || { x: 50, y: 50 };
};

const getMobileFocus = (
  category: "All" | Category
) => {
  if (category === "All") {
    return {
      x: 50,
      y: 50,
      scale: 0.72,
    };
  }

  const categorySkills = skills.filter(
    (skill) => skill.category === category
  );

  if (categorySkills.length === 0) {
    return {
      x: 50,
      y: 50,
      scale: 0.72,
    };
  }

  const positions = categorySkills.map((skill) =>
    getMobilePosition(skill.name)
  );

  const centerX =
    positions.reduce((sum, position) => sum + position.x, 0) /
    positions.length;

  const centerY =
    positions.reduce((sum, position) => sum + position.y, 0) /
    positions.length;

  return {
    x: centerX,
    y: centerY,
    scale: 1.25,
  };
};

/**
 * Connection antar teknologi.
 */
const connections = [
  ["React", "Next.js"],
  ["React", "TypeScript"],
  ["React", "JavaScript"],
  ["React", "Tailwind CSS"],

  ["Next.js", "TypeScript"],
  ["Next.js", "Node.js"],

  ["TypeScript", "Node.js"],
  ["TypeScript", "Express.js"],

  ["JavaScript", "Node.js"],
  ["JavaScript", "Vue.js"],

  ["Node.js", "Express.js"],
  ["Node.js", "Prisma"],

  ["Express.js", "Prisma"],
  ["Prisma", "PostgreSQL"],
  ["Prisma", "MySQL"],

  ["PostgreSQL", "MySQL"],

  ["Git", "GitHub"],
  ["GitHub", "Node.js"],

  ["Python", "PostgreSQL"],
] as const;

const categories: Array<"All" | Category> = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Data",
  "Tools",
];

const getPosition = (name: string) => {
  const position = positions[name];

  return position ?? { x: 50, y: 50 };
};

export function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(
    null
  );

  const [lockedSkill, setLockedSkill] = useState<string | null>(
    null
  );

  const [activeCategory, setActiveCategory] = useState<
    "All" | Category
  >("All");

  const selectedSkill = lockedSkill ?? activeSkill;

  const activeSkillData = skills.find(
    (skill) => skill.name === selectedSkill
  );

  const visibleSkills = useMemo(() => {
    if (activeCategory === "All") {
      return skills;
    }

    return skills.filter(
      (skill) => skill.category === activeCategory
    );
  }, [activeCategory]);

  const visibleSkillNames = new Set(
    visibleSkills.map((skill) => skill.name)
  );

  const mobileFocus = getMobileFocus(activeCategory);

const mobileTranslateX =
  activeCategory === "All"
    ? 0
    : (50 - mobileFocus.x) * 6.5;

const mobileTranslateY =
  activeCategory === "All"
    ? 0
    : (50 - mobileFocus.y) * 6.5;
  /**
   * Apakah sebuah connection berhubungan
   * dengan skill yang sedang aktif?
   */
  const isConnectionActive = (
    from: string,
    to: string
  ) => {
    if (!selectedSkill) {
      return false;
    }

    return (
      from === selectedSkill ||
      to === selectedSkill
    );
  };

  /**
   * Apakah node berhubungan dengan node aktif?
   */
  const isNodeConnected = (name: string) => {
    if (!selectedSkill) {
      return true;
    }

    if (name === selectedSkill) {
      return true;
    }

    return connections.some(
      ([from, to]) =>
        (from === selectedSkill && to === name) ||
        (to === selectedSkill && from === name)
    );
  };

  const handleSkillClick = (name: string) => {
    setLockedSkill((current) =>
      current === name ? null : name
    );
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full overflow-hidden bg-[#0E0C14]"
    >

<div
  className="pointer-events-none absolute inset-0 z-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]">
  <Galaxy
    mouseRepulsion={false}
    mouseInteraction={false}
    density={2.2}
    glowIntensity={0.1}
    saturation={0}
    hueShift={90}
    twinkleIntensity={0.1}
    rotationSpeed={0.05}
    repulsionStrength={2}
    autoCenterRepulsion={0}
    starSpeed={0.3}
    speed={0.3}
  />
</div>
      {/* ======================================== */}
      {/* BACKGROUND */}
      {/* ======================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.035] blur-[140px]" />

        <div className="absolute left-0 top-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/[0.025] blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-cyan-500/[0.025] blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-screen w-full flex-col justify-center md:py-24">
        {/* ======================================== */}
        {/* HEADER */}
        {/* ======================================== */}

        <div className="mb-10 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-purple-400/70" />

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
              The tools behind the work
            </span>
          </div>
          
            <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Built with a
                <p className="text-[#A855F7]">growing stack.</p>
            </h2>
            </div>

          {/* <p className="mt-5 max-w-xl text-sm leading-7 text-white/40">
            Technologies I use to turn ideas into interfaces,
            applications, and systems — with plenty more
            still to explore.
          </p> */}
        </div>

        {/* ======================================== */}
        {/* CATEGORY FILTER */}
        {/* ======================================== */}

        <div className="mb-7 flex flex-wrap gap-2 relative z-10">
          {categories.map((category) => {
            const isActive =
              activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`rounded-full border px-2 md:px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "border-purple-400/40 bg-purple-400/10 text-purple-300"
                    : "border-white/10 bg-white/[0.015] text-white/30 hover:border-white/20 hover:text-white/60"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* ======================================== */}
        {/* DESKTOP ECOSYSTEM */}
        {/* ======================================== */}

        <div
          className="relative hidden h-[560px] w-full overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.012] md:block"
          onMouseLeave={() => {
            if (!lockedSkill) {
              setActiveSkill(null);
            }
          }}
        >
          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Radial center */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/[0.04]" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/[0.05]" />

          {/* ====================================== */}
          {/* SVG CONNECTIONS */}
          {/* ====================================== */}

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="skillConnection"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#A855F7"
                  stopOpacity="0"
                />

                <stop
                  offset="50%"
                  stopColor="#A855F7"
                  stopOpacity="0.8"
                />

                <stop
                  offset="100%"
                  stopColor="#A855F7"
                  stopOpacity="0"
                />
              </linearGradient>

              <filter
                id="connectionGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  stdDeviation="0.8"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

          {connections.map(([from, to]) => {
  const fromPosition = getMobilePosition(from);
  const toPosition = getMobilePosition(to);

  const active = isConnectionActive(from, to);

  const related =
    selectedSkill &&
    (from === selectedSkill || to === selectedSkill);

  return (
    <line
      key={`mobile-${from}-${to}`}
      x1={fromPosition.x}
      y1={fromPosition.y}
      x2={toPosition.x}
      y2={toPosition.y}
      stroke={
        active
          ? "url(#mobileSkillConnection)"
          : "rgba(255,255,255,0.045)"
      }
      strokeWidth={active ? 0.7 : 0.25}
      strokeDasharray={active ? "2 4" : "none"}
      opacity={
        selectedSkill
          ? related
            ? 1
            : 0.18
          : 0.7
      }
      className={
        active
          ? "animate-[skillDash_3s_linear_infinite]"
          : ""
      }
      vectorEffect="non-scaling-stroke"
    />
  );
})}
          </svg>

          {/* ====================================== */}
          {/* CENTRAL NODE */}
          {/* ====================================== */}

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-purple-500/[0.04] blur-2xl" />

              <div className="absolute -inset-5 animate-pulse rounded-full border border-purple-400/[0.08]" />

              <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-3xl border border-purple-400/20 bg-[#0C0A10]/95 shadow-[0_0_50px_rgba(168,85,247,0.08)] backdrop-blur-xl">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-purple-300/60">
                  My
                </span>

                <span className="mt-1 text-xl font-semibold tracking-tight text-white">
                  STACK
                </span>

                <span className="mt-2 font-mono text-[8px] uppercase tracking-widest text-white/20">
                  Fullstack
                </span>
              </div>
            </div>
          </div>

          {/* ====================================== */}
          {/* SKILL NODES */}
          {/* ====================================== */}

          {visibleSkills.map((skill) => {
            const position = getPosition(
              skill.name
            );

            const Icon = skill.icon;

            const isSelected =
              selectedSkill === skill.name;

            const isConnected =
              isNodeConnected(skill.name);

            return (
              <button
                key={skill.name}
                type="button"
                onMouseEnter={() =>
                  setActiveSkill(skill.name)
                }
                onFocus={() =>
                  setActiveSkill(skill.name)
                }
                onClick={() =>
                  handleSkillClick(skill.name)
                }
                className={`group absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  selectedSkill && !isConnected
                    ? "opacity-20"
                    : "opacity-100"
                }`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
              >
                {/* Glow */}
                <span
                  className={`absolute -inset-6 rounded-full blur-2xl transition-all duration-500 ${
                    isSelected
                      ? "bg-purple-500/20 opacity-100"
                      : "opacity-0 group-hover:bg-purple-500/10 group-hover:opacity-100"
                  }`}
                />

                {/* Node */}
                <span
                  className={`relative flex h-[68px] w-[68px] items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                    isSelected
                      ? "scale-110 border-purple-400/50 bg-purple-400/[0.08] shadow-[0_0_35px_rgba(168,85,247,0.15)]"
                      : "border-white/[0.09] bg-[#0C0A10]/90 group-hover:scale-105 group-hover:border-white/25"
                  }`}
                >
                  <Icon
                    size={27}
                    style={{
                      color: isSelected
                        ? skill.color
                        : "rgba(255,255,255,0.45)",
                    }}
                    className="transition-all duration-300"
                  />

                  {/* Active dot */}
                  {isSelected && (
                    <span
                      className="absolute -right-1 -top-1 h-2 w-2 rounded-full"
                      style={{
                        backgroundColor:
                          skill.color,
                        boxShadow: `0 0 12px ${skill.color}`,
                      }}
                    />
                  )}
                </span>

                {/* Label */}
                <span
                  className={`absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider transition-all duration-300 ${
                    isSelected
                      ? "text-white/80"
                      : "text-white/25 group-hover:text-white/60"
                  }`}
                >
                  {skill.name}
                </span>
              </button>
            );
          })}

          {/* ====================================== */}
          {/* INFO PANEL */}
          {/* ====================================== */}

          <div className="absolute bottom-6 left-6 max-w-sm">
            {activeSkillData ? (
              <div className="flex items-start gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      activeSkillData.color,
                    boxShadow: `0 0 12px ${activeSkillData.color}`,
                  }}
                />

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-white/80">
                      {activeSkillData.name}
                    </p>

                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/20">
                      {activeSkillData.level}
                    </span>
                  </div>

                  <p className="mt-1 max-w-xs text-[11px] leading-5 text-white/35">
                    {activeSkillData.description}
                  </p>
                </div>
              </div>
            ) : (
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                Hover a technology to explore
              </p>
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 right-6">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">
              {String(visibleSkills.length).padStart(
                2,
                "0"
              )}{" "}
              technologies
            </span>
          </div>

          {/* Click hint */}
          {!lockedSkill && (
            <div className="absolute right-6 top-6">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/15">
                Click to lock
              </span>
            </div>
          )}

          {lockedSkill && (
            <button
              type="button"
              onClick={() => {
                setLockedSkill(null);
                setActiveSkill(null);
              }}
              className="absolute right-6 top-6 font-mono text-[8px] uppercase tracking-[0.2em] text-purple-300/50 transition-colors hover:text-purple-300"
            >
              Clear selection
            </button>
          )}
        </div>

{/* =========================
    MOBILE ORBIT ECOSYSTEM
    ========================= */}
<div className="relative top-[-80px] right-[30%] w-screen md:hidden">
  <div className="relative mx-auto h-[500px] w-[520px] overflow-visible">
<div
      className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        transform: `
          translate(${mobileTranslateX}px, ${mobileTranslateY}px)
          scale(${mobileFocus.scale})
        `,
      }}
    >
    {/* Background grid */}
    <div
      className="pointer-events-none absolute inset-0 opacity-20 "
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }}
    />

    {/* Ambient glow */}
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.045] blur-[90px]" />

    {/* Outer orbit */}
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/[0.08]" />

    {/* Inner orbit */}
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />

    {/* Rotating orbit glow */}
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg, rgba(168,85,247,0.18) 45deg, transparent 90deg, transparent 180deg, rgba(168,85,247,0.08) 225deg, transparent 270deg)",
        maskImage:
          "radial-gradient(circle, transparent 49%, black 50%, black 50.5%, transparent 51%)",
        WebkitMaskImage:
          "radial-gradient(circle, transparent 49%, black 50%, black 50.5%, transparent 51%)",
        animation: "skillOrbitSpin 18s linear infinite"
      }}
    />

    {/* SVG connections */}
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="mobileSkillConnection"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="#A855F7"
            stopOpacity="0"
          />

          <stop
            offset="50%"
            stopColor="#A855F7"
            stopOpacity="0.65"
          />

          <stop
            offset="100%"
            stopColor="#A855F7"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {connections.map(([from, to]) => {
        const fromPosition = getMobilePosition(from);
        const toPosition = getMobilePosition(to);

        const active = isConnectionActive(from, to);

        const related =
          selectedSkill &&
          (from === selectedSkill ||
            to === selectedSkill);

        return (
         <line
  key={`mobile-${from}-${to}`}
  x1={fromPosition.x}
  y1={fromPosition.y}
  x2={toPosition.x}
  y2={toPosition.y}
  stroke={
    active
      ? "url(#mobileSkillConnection)"
      : "rgba(255,255,255,0.045)"
  }
  strokeWidth={active ? 0.7 : 0.25}
  strokeDasharray={active ? "2 4" : "none"}
  opacity={
    selectedSkill
      ? related
        ? 1
        : 0.18
      : 0.7
  }
  className={
    active
      ? "animate-[skillDash_3s_linear_infinite]"
      : ""
  }
  vectorEffect="non-scaling-stroke"
/>
        );
      })}
    </svg>

    {/* Central STACK */}
    <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      <div className="relative">

        {/* Glow */}
        <div className="absolute -inset-10 rounded-full bg-purple-500/[0.08] blur-3xl" />

        {/* Pulse ring */}
        <div className="absolute -inset-5 animate-pulse rounded-full border border-purple-400/[0.12]" />

        {/* Center */}
        <div className="relative flex h-[118px] w-[118px] flex-col items-center justify-center rounded-[30px] border border-purple-400/20 bg-[#0C0A10]/95 shadow-[0_0_55px_rgba(168,85,247,0.12)] backdrop-blur-xl">

          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-purple-300/60">
            My
          </span>

          <span className="mt-1 text-xl font-semibold tracking-tight text-white">
            STACK
          </span>

          <span className="mt-2 font-mono text-[7px] uppercase tracking-[0.25em] text-white/20">
            Fullstack
          </span>
        </div>
      </div>
    </div>

    {/* Skill Nodes */}
   {visibleSkills.map((skill) => {
      const Icon = skill.icon;

      const position = getMobilePosition(skill.name);

      const isSelected =
        selectedSkill === skill.name;

      const isConnected =
        isNodeConnected(skill.name);

      return (
        <button
          key={skill.name}
          type="button"
          onClick={() =>
            handleSkillClick(skill.name)
          }
          className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            selectedSkill && !isConnected
              ? "opacity-25"
              : "opacity-100"
          }`}
          style={{
  left: `${position.x}%`,
  top: `${position.y}%`
}}
        >
          {/* Node glow */}
          <span
            className={`absolute -inset-5 rounded-full blur-xl transition-all duration-500 ${
              isSelected
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              backgroundColor: skill.color
            }}
          />

          {/* Node */}
          <span
            className={`relative flex h-[58px] w-[58px] items-center justify-center rounded-2xl border transition-all duration-500 ${
              isSelected
                ? "scale-125 border-purple-400/50 bg-purple-400/[0.1]"
                : "border-white/[0.09] bg-[#0C0A10]/90"
            }`}
            style={{
              boxShadow: isSelected
                ? `0 0 28px ${skill.color}30`
                : "none"
            }}
          >
            <Icon
              size={24}
              style={{
                color: isSelected
                  ? skill.color
                  : "rgba(255,255,255,0.5)"
              }}
            />

            {/* Active indicator */}
            {isSelected && (
              <span
                className="absolute -right-1 -top-1 h-2 w-2 rounded-full"
                style={{
                  backgroundColor: skill.color,
                  boxShadow: `0 0 10px ${skill.color}`
                }}
              />
            )}
          </span>

          {/* Label */}
          <span
            className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] uppercase tracking-wider transition-all duration-300 ${
              isSelected
                ? "text-white/80"
                : "text-white/25"
            }`}
          >
            {skill.name}
          </span>
        </button>
      );
    })}

    {/* Top hint */}
    {!selectedSkill && (
      <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2">
        <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/20">
          Tap a technology
        </span>
      </div>
    )}

    {/* Counter */}
    <div className="pointer-events-none absolute bottom-4 right-4">
      <span className="font-mono text-[7px] uppercase tracking-widest text-white/20">
        {String(visibleSkills.length).padStart(2, "0")}{" "}
        technologies
      </span>
    </div>
  </div>
</div>
</div>

{/* Mobile description */}
<div className="mt-5 md:hidden">
  {activeSkillData && (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor:
              activeSkillData.color,
            boxShadow:
              `0 0 10px ${activeSkillData.color}`
          }}
        />

        <span className="font-mono text-xs text-white/70">
          {activeSkillData.name}
        </span>

        <span className="ml-auto font-mono text-[8px] uppercase tracking-widest text-white/20">
          {activeSkillData.level}
        </span>
      </div>

      <p className="mt-3 text-xs leading-6 text-white/35">
        {activeSkillData.description}
      </p>
    </div>
  )}
</div>
        
      </div>

      {/* ======================================== */}
      {/* GLOBAL ANIMATION */}
      {/* ======================================== */}

      <style jsx global>{`
        @keyframes skillDash {
          to {
            stroke-dashoffset: -20;
          }
        }

          @keyframes skillOrbitSpin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
      `}</style>
    </section>
  );
}

export default SkillsSection;