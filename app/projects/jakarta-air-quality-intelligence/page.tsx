import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaDownload,
  FaExternalLinkAlt,
  FaDatabase,
  FaPython,
  FaChartLine,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Jakarta Air Quality Intelligence | Data & Analytics",
  description:
    "A historical ISPU analytics case study using Python, PostgreSQL, and Power BI to explore air-quality patterns across five Jakarta monitoring stations.",
};

const assetBase = "/projects/jakarta-air-quality-intelligence";
const reportUrl = `${assetBase}/jakarta-air-quality-intelligence-report.pdf`;

const screenshots = [
  {
    src: `${assetBase}/powerbi-overview.webp`,
    alt: "Power BI Air Quality Overview report showing historical ISPU analysis",
    title: "Air Quality Overview",
    description: "Historical trends, station comparisons, and ISPU category distribution.",
  },
  {
    src: `${assetBase}/powerbi-pollutant-analysis.webp`,
    alt: "Power BI Pollutant Analysis report comparing ISPU parameters and stations",
    title: "Pollutant Analysis",
    description: "Comparison of parameter-level ISPU values and patterns across stations.",
  },
  {
    src: `${assetBase}/powerbi-data-quality.webp`,
    alt: "Power BI Data Quality and Coverage report for the ISPU dataset",
    title: "Data Quality & Coverage",
    description: "Coverage by station and a transparent summary of data-quality issues.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Source & ingest",
    detail:
      "Retrieve the official Jakarta ISPU dataset, preserve the raw response, and profile its schema and coverage.",
  },
  {
    number: "02",
    title: "Clean & validate",
    detail:
      "Normalize station aliases, parse dates and numeric fields, retain missing measurements as NULL, and record data-quality issues.",
  },
  {
    number: "03",
    title: "Model the data",
    detail:
      "Store staged records, dates, stations, and validated station-day observations in PostgreSQL.",
  },
  {
    number: "04",
    title: "Analyze & communicate",
    detail:
      "Build Power BI views for historical trends, station comparisons, pollutant parameters, and data-quality coverage.",
  },
];

export default function JakartaAirQualityIntelligencePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 md:py-16">
        <Link
          href="/#data"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <FaArrowLeft aria-hidden className="h-3.5 w-3.5" /> Back to data projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
              Case study 02
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Historical analysis · 2024–2025
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Jakarta Air Quality <span className="text-primary">Intelligence.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Exploring historical ISPU patterns across five Jakarta monitoring stations using Python, PostgreSQL, and Power BI.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <TechChip icon={<FaPython aria-hidden />} label="Python / pandas" />
            <TechChip icon={<FaDatabase aria-hidden />} label="PostgreSQL" />
            <TechChip icon={<FaChartLine aria-hidden />} label="Power BI" />
          </div>
        </header>

        <section aria-label="Project coverage" className="mt-10 grid gap-3 sm:grid-cols-3">
          <Metric label="Station-day observations" value="3,500" />
          <Metric label="Monitoring stations" value="5" />
          <Metric label="Source coverage" value="Jan 2024 – Nov 2025" />
        </section>

        <section aria-labelledby="report-heading" className="mt-14 md:mt-20">
          <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Power BI report</p>
              <h2 id="report-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Dashboard preview
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Screenshots from the Power BI report. The downloadable PDF contains the report pages for review; its charts are static and not interactive.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Open PDF <FaExternalLinkAlt aria-hidden className="h-3 w-3" />
              </a>
              <a
                href={reportUrl}
                download="jakarta-air-quality-intelligence-report.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Download PDF <FaDownload aria-hidden className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-5">
            {screenshots.map((shot, index) => (
              <article key={shot.src} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex flex-col gap-1 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                    <h3 className="text-base font-semibold">{shot.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{shot.description}</p>
                </div>
                <a href={shot.src} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1600}
                    height={900}
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="h-auto w-full bg-muted/20"
                  />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex flex-col gap-1 border-b border-border px-4 py-4 sm:px-5">
              <h3 className="text-base font-semibold">Full report (PDF)</h3>
              <p className="text-sm text-muted-foreground">Use the controls above to open or download the exported Power BI report.</p>
            </div>
            <div className="h-[520px] bg-muted/20 sm:h-[720px]">
              <iframe
                src={`${reportUrl}#toolbar=1&navpanes=0`}
                title="Jakarta Air Quality Intelligence Power BI report PDF"
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="overview-heading" className="mt-14 grid gap-8 border-t border-border pt-8 md:mt-20 md:grid-cols-[0.8fr_1.2fr] md:pt-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Project overview</p>
            <h2 id="overview-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">What does this project explore?</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              This project examines historical ISPU observations recorded at five Jakarta monitoring stations. It explores changes over time, differences between stations, parameter-level index values, and the quality and coverage of the source data.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The source coverage currently ends on 30 November 2025. This is a historical analysis, not a real-time air-quality monitoring service. Parameter-level ISPU values are index values, not automatically physical pollutant concentrations.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">01 / Data pipeline</span>
              <h3 className="mt-3 text-base font-semibold">Traceable ingestion</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Preserve the raw response, standardize station labels, validate dates and values, and record data-quality issues.</p>
            </article>
            <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">02 / Analysis</span>
              <h3 className="mt-3 text-base font-semibold">Compare with context</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Use consistent station names and explicit date coverage to compare index patterns without overstating what the dataset proves.</p>
            </article>
          </div>
        </section>

        <section aria-labelledby="workflow-heading" className="mt-14 border-t border-border pt-8 md:mt-20 md:pt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Method &amp; workflow</p>
          <h2 id="workflow-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">From raw source to dashboard</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {workflow.map((step) => (
              <article key={step.number} className="rounded-xl border border-border bg-card p-4 sm:p-5">
                <span className="font-mono text-xs text-muted-foreground">{step.number}</span>
                <h3 className="mt-4 text-sm font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-14 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-5 text-muted-foreground">
            Dataset coverage and definitions are based on the source records inspected for this project. Values may be missing for some parameters; missing values are not treated as zero.
          </p>
          <Link
            href="/#data"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <FaArrowLeft aria-hidden className="h-3.5 w-3.5" /> Back to projects
          </Link>
        </footer>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{value}</p>
    </div>
  );
}

function TechChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground/90">
      <span className="text-primary">{icon}</span> {label}
    </span>
  );
}
