import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaChartLine, FaDatabase, FaPython } from "react-icons/fa";

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
            A growing collection of projects in data engineering, analysis, and visualization.
          </p>
        </div>

        <Link
          href="/projects/msci-market-watch"
          aria-label="View MSCI Market Watch case study"
          className="group grid overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:grid-cols-[0.92fr_1.08fr]"
        >
          <div className="flex min-w-0 flex-col justify-between p-5 sm:p-7 lg:p-8">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
                  In progress
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Case study 01
                </span>
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                MSCI Market Watch
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Exploring IHSG movements around MSCI-related events and market transparency.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground/90">
                  <FaDatabase aria-hidden className="text-primary" /> PostgreSQL
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground/90">
                  <FaPython aria-hidden className="text-primary" /> Python
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground/90">
                  <FaChartLine aria-hidden className="text-primary" /> Power BI
                </span>
              </div>
            </div>

            <div className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary">
              View case study
              <FaArrowRight aria-hidden className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div className="relative min-h-[230px] overflow-hidden border-t border-border bg-muted/30 p-3 sm:min-h-[300px] sm:p-5 md:border-l md:border-t-0">
            <div className="relative h-full min-h-[210px] overflow-hidden rounded-lg border border-border bg-background">
              <Image
                src="/projects/msci-market-watch/powerbi-overview.webp"
                alt="Screenshot of the MSCI Market Watch report created in Power BI"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-contain object-center"
              />
              <div className="absolute bottom-3 right-3 rounded-full border border-border bg-background/95 px-3 py-1.5 text-[10px] font-medium text-foreground shadow-sm">
                Power BI report preview
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default DataJourney;
