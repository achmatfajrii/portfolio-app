import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaChartLine,
  FaDatabase,
  FaPython,
} from "react-icons/fa";

/**
 * A concise index of data projects. Keep project descriptions short here;
 * detailed methods, findings, and Power BI evidence live on each case-study page.
 */
export function DataJourney() {
  return (
    <section
      id="data"
      aria-labelledby="data-heading"
      className="relative w-full border-t border-border bg-background py-16 text-foreground md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-primary/70" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Data &amp; Analytics
              </span>
            </div>
            <h2
              id="data-heading"
              className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
            >
              Selected <span className="text-primary">data projects.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
            A growing collection of work in data engineering, analysis, and visualization.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Project 01: MSCI Market Watch */}
          <Link
            href="/projects/msci-market-watch"
            aria-label="View MSCI Market Watch project details"
            className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <div className="relative aspect-video overflow-hidden border-b border-border bg-muted/30">
              <Image
                src="/projects/msci-market-watch/powerbi-overview.webp"
                alt="Power BI Market Overview report preview for MSCI Market Watch"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 pb-4 pt-12 text-white sm:px-5">
                <span className="text-xs font-medium">Power BI · Market Overview</span>
                <span className="rounded-full border border-white/25 bg-black/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider">Preview</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
                    In progress
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Case study 01</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">MSCI Market Watch</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Exploring IHSG movements around MSCI-related events, with data quality and market transparency at the center.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <TechChip icon={<FaDatabase aria-hidden />} label="PostgreSQL" />
                  <TechChip icon={<FaPython aria-hidden />} label="Python" />
                  <TechChip icon={<FaChartLine aria-hidden />} label="Power BI" />
                </div>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                View project <FaArrowRight aria-hidden className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Project 02: Jakarta Air Quality Intelligence */}
          <Link
            href="/projects/jakarta-air-quality-intelligence"
            aria-label="View Jakarta Air Quality Intelligence project details"
            className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <div className="relative aspect-video overflow-hidden border-b border-border bg-muted/30">
              <Image
                src="/projects/jakarta-air-quality-intelligence/powerbi-overview.webp"
                alt="Power BI report preview for Jakarta Air Quality Intelligence"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 pb-4 pt-12 text-white sm:px-5">
                <span className="text-xs font-medium">Power BI · Air Quality Overview</span>
                <span className="rounded-full border border-white/25 bg-black/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider">Preview</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
                    In progress
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Case study 02</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">Jakarta Air Quality Intelligence</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Exploring historical ISPU patterns across five Jakarta monitoring stations, with pollutant and data-quality analysis.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <TechChip icon={<FaDatabase aria-hidden />} label="PostgreSQL" />
                  <TechChip icon={<FaPython aria-hidden />} label="Python" />
                  <TechChip icon={<FaChartLine aria-hidden />} label="Power BI" />
                </div>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                View project <FaArrowRight aria-hidden className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TechChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground/90">
      <span className="text-primary">{icon}</span> {label}
    </span>
  );
}

export default DataJourney;
