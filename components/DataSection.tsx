"use client";

import {
  ArrowUpRight,
  BarChart3,
  Database,
  Github,
  LineChart,
  PieChart,
} from "lucide-react";

import { useState } from "react";

interface DataProject {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  tools: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  chart: number[];
  accent: string;
  github: string;
}

const dataProjects: DataProject[] = [
  {
    id: "ecommerce-sales",
    number: "01",
    title: "E-commerce Sales Analysis",
    description:
      "Exploring sales performance, customer behavior, and revenue trends to uncover the biggest opportunities for growth and retention.",
    category: "Business Analysis",
    tools: ["Python", "Pandas", "SQL", "Matplotlib"],
    metrics: [
      {
        label: "Orders",
        value: "1.1K",
      },
      {
        label: "Customers",
        value: "400",
      },
      {
        label: "Period",
        value: "12M",
      },
    ],
    chart: [28, 35, 32, 48, 42, 55, 51, 63, 58, 72, 86, 94],
    accent: "#A855F7",
    github: "https://github.com/achmatfajrii/ecommerce-sales-analysis",
  },

  {
    id: "customer-analysis",
    number: "02",
    title: "Customer Behavior Analysis",
    description:
      "Analyzing customer segments, purchasing patterns, and retention behavior to understand what separates repeat customers from one-time buyers.",
    category: "Customer Analytics",
    tools: ["Python", "Pandas", "SQL"],
    metrics: [
      {
        label: "Segments",
        value: "4",
      },
      {
        label: "Customers",
        value: "400",
      },
      {
        label: "Queries",
        value: "8",
      },
    ],
    chart: [72, 58, 65, 48, 55, 43, 49, 61, 67, 74, 81, 88],
    accent: "#8B5CF6",
    github: "https://github.com/achmatfajrii",
  },

  {
    id: "product-performance",
    number: "03",
    title: "Product Performance",
    description:
      "Breaking down product and category performance to identify high-performing products, weak categories, and potential opportunities.",
    category: "Product Analytics",
    tools: ["SQL", "Python", "Matplotlib"],
    metrics: [
      {
        label: "Products",
        value: "60",
      },
      {
        label: "Categories",
        value: "5",
      },
      {
        label: "Insights",
        value: "12",
      },
    ],
    chart: [42, 46, 38, 51, 64, 59, 68, 61, 75, 71, 83, 91],
    accent: "#C084FC",
    github: "https://github.com/achmatfajrii",
  },
];

function MiniChart({
  values,
  accent,
}: {
  values: number[];
  accent: string;
}) {
  const max = Math.max(...values);
  const min = Math.min(...values);

  const points = values
    .map((value, index) => {
      const x =
        (index / (values.length - 1)) * 100;

      const normalized =
        (value - min) / (max - min || 1);

      const y = 85 - normalized * 65;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative h-32 w-full overflow-hidden">
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-0 right-0 top-1/4 border-t border-white/10" />
        <div className="absolute left-0 right-0 top-1/2 border-t border-white/10" />
        <div className="absolute left-0 right-0 top-3/4 border-t border-white/10" />

        <div className="absolute bottom-0 left-1/4 top-0 border-l border-white/10" />
        <div className="absolute bottom-0 left-1/2 top-0 border-l border-white/10" />
        <div className="absolute bottom-0 left-3/4 top-0 border-l border-white/10" />
      </div>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {/* Glow */}
        <polyline
          points={points}
          fill="none"
          stroke={accent}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.08"
          vectorEffect="non-scaling-stroke"
          className="transition-all duration-700"
        />

        {/* Main line */}
        <polyline
          points={points}
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="transition-all duration-700"
        />

        {/* Area */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={`url(#gradient-${accent.replace("#", "")})`}
          opacity="0.08"
        />

        <defs>
          <linearGradient
            id={`gradient-${accent.replace("#", "")}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor={accent}
            />
            <stop
              offset="100%"
              stopColor={accent}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
      </svg>

      {/* Data points */}
      <div className="absolute inset-0">
        {values.map((value, index) => {
          const x =
            (index / (values.length - 1)) * 100;

          const normalized =
            (value - min) / (max - min || 1);

          const y =
            85 - normalized * 65;

          return (
            <span
              key={index}
              className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: accent,
                boxShadow: `0 0 10px ${accent}`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function ProjectIcon({
  category,
}: {
  category: string;
}) {
  if (category === "Customer Analytics") {
    return <PieChart size={18} />;
  }

  if (category === "Product Analytics") {
    return <BarChart3 size={18} />;
  }

  return <LineChart size={18} />;
}

export function DataSection() {
  const [activeProject, setActiveProject] =
    useState<string | null>(null);

  return (
    <section
      id="data-projects"
      className="relative w-full overflow-hidden border-t border-white/5 bg-transparent py-24"
    >
      {/* ================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================= */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-purple-500/5 blur-[120px]" />

        <div className="absolute bottom-[10%] right-[10%] h-80 w-80 rounded-full bg-violet-500/5 blur-[140px]" />
      </div>

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <div className="relative z-10 container">
        {/* Header */}

        <div className="mb-14 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-purple-500/60" />

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-400/70">
              Data & Analytics
            </span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Turning data into
            <span className="text-white/30">
              {" "}
              something meaningful.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-xs md:text-sm leading-5 md:leading-7 text-white/40">
            A growing collection of data analysis
            projects exploring business questions,
            customer behavior, and patterns hidden
            inside numbers.
          </p>
        </div>

        {/* ================================= */}
        {/* PROJECT GRID */}
        {/* ================================= */}

        <div className="grid gap-5 lg:grid-cols-2">
          {dataProjects.map((project) => {
            const isActive =
              activeProject === project.id;

            return (
              <article
                key={project.id}
                onMouseEnter={() =>
                  setActiveProject(project.id)
                }
                onMouseLeave={() =>
                  setActiveProject(null)
                }
                className={`
                  group relative overflow-hidden rounded-2xl
                  border border-white/10
                  bg-[#100D15]/70
                  backdrop-blur-md
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:border-purple-400/30
                  hover:shadow-[0_20px_80px_rgba(168,85,247,0.08)]
                  ${
                    project.number === "01"
                      ? "lg:col-span-2"
                      : ""
                  }
                `}
              >
                {/* Hover glow */}

                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{
                    backgroundColor:
                      project.accent,
                  }}
                />

                <div
                  className={`
                    relative z-10
                    ${
                      project.number === "01"
                        ? "grid lg:grid-cols-[1fr_0.9fr]"
                        : ""
                    }
                  `}
                >
                  {/* ================================= */}
                  {/* INFORMATION */}
                  {/* ================================= */}

                  <div className="p-6 sm:p-8">
                    {/* Top */}

                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-purple-400/30"
                          style={{
                            color: project.accent,
                          }}
                        >
                          <ProjectIcon
                            category={
                              project.category
                            }
                          />
                        </div>

                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                            {project.category}
                          </p>

                          <p
                            className="mt-1 font-mono text-[10px]"
                            style={{
                              color:
                                project.accent,
                            }}
                          >
                            {project.number} /{" "}
                            {String(
                              dataProjects.length
                            ).padStart(2, "0")}
                          </p>
                        </div>
                      </div>

                      {/* GitHub */}

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} on GitHub`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
                      >
                        <Github
                          size={15}
                        />
                      </a>
                    </div>

                    {/* Title */}

                    <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-white">
                      {project.title}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                      {project.description}
                    </p>

                    {/* Tools */}

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tools.map(
                        (tool) => (
                          <span
                            key={tool}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[9px] text-white/35 transition-colors group-hover:border-white/15 group-hover:text-white/50"
                          >
                            {tool}
                          </span>
                        )
                      )}
                    </div>

                    {/* Metrics */}

                    <div className="mt-8 grid grid-cols-3 border-t border-white/5 pt-5">
                      {project.metrics.map(
                        (metric) => (
                          <div
                            key={metric.label}
                            className="border-r border-white/5 last:border-r-0"
                          >
                            <p className="font-mono text-[9px] uppercase tracking-wider text-white/20">
                              {metric.label}
                            </p>

                            <p className="mt-1 text-sm font-medium text-white/70">
                              {metric.value}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* ================================= */}
                  {/* CHART */}
                  {/* ================================= */}

                  <div
                    className={`
                      relative flex items-end
                      border-t border-white/5
                      p-6
                      lg:border-l lg:border-t-0
                      ${
                        project.number ===
                        "01"
                          ? "min-h-[280px]"
                          : "min-h-[220px]"
                      }
                    `}
                  >
                    {/* Chart label */}

                    <div className="absolute left-6 top-6">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              project.accent,
                            boxShadow: `0 0 8px ${project.accent}`,
                          }}
                        />

                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                          Trend
                        </span>
                      </div>
                    </div>

                    {/* Decorative number */}

                    <div className="absolute right-6 top-5 font-mono text-[9px] text-white/10">
                      2025
                    </div>

                    <div className="w-full pt-8">
                      <div className="group">
                        <MiniChart
                          values={
                            project.chart
                          }
                          accent={
                            project.accent
                          }
                        />
                      </div>

                      <div className="mt-3 flex justify-between font-mono text-[8px] text-white/15">
                        <span>JAN</span>
                        <span>MAR</span>
                        <span>JUN</span>
                        <span>SEP</span>
                        <span>DEC</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom line */}

                <div
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
                  style={{
                    backgroundColor:
                      project.accent,
                  }}
                />

                {/* View project */}

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 right-6 hidden items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-white/20 transition-colors hover:text-white sm:flex"
                >
                  View analysis
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </article>
            );
          })}
        </div>

        {/* ================================= */}
        {/* FOOTER NOTE */}
        {/* ================================= */}

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/5 pt-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Database
              size={14}
              className="text-purple-400/50"
            />

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              More analysis projects coming soon
            </span>
          </div>

          <span className="font-mono text-[9px] text-white/10">
            Python · SQL · Data Analysis
          </span>
        </div>
      </div>
    </section>
  );
}