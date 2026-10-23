import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaChartLine,
  FaDatabase,
  FaDownload,
  FaExternalLinkAlt,
  FaFilePdf,
  FaPython,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "MSCI Market Watch | Data & Analytics",
  description:
    "A data analytics case study exploring Indonesian equity market movements around MSCI-related events, with Power BI report screenshots and PDF preview.",
};

const projectRoot = "/projects/msci-market-watch";
const reportPdf = `${projectRoot}/msci-market-watch-report.pdf`;

const reportScreenshots = [
  {
    src: `${projectRoot}/powerbi-overview.webp`,
    alt: "Power BI report page showing the MSCI Market Watch market overview",
    title: "Market Overview",
    description: "IHSG closing-price history, latest indicators, and daily returns.",
  },
  {
    src: `${projectRoot}/powerbi-events.webp`,
    alt: "Power BI report page showing event timeline and data-quality checks",
    title: "Events & Data Quality",
    description: "MSCI-related event context alongside data-quality monitoring.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Model the data",
    detail: "Create a dedicated PostgreSQL schema, date dimension, source catalog, event catalog, and fact tables.",
    status: "Foundation set up",
  },
  {
    number: "02",
    title: "Ingest & validate",
    detail: "Use Python to collect daily IHSG observations, preserve raw data, validate records, and log quality issues.",
    status: "Ongoing",
  },
  {
    number: "03",
    title: "Analyze market movements",
    detail: "Compare daily returns and event timing without treating temporal association as proof of causation.",
    status: "In progress",
  },
  {
    number: "04",
    title: "Visualize the findings",
    detail: "Build a Power BI report for market trends, event context, and data-quality checks.",
    status: "Prototype",
  },
];

export default function MSCIMarketWatchPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 md:py-14 lg:px-12">
        <Link
          href="/#data"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <FaArrowLeft aria-hidden className="h-3.5 w-3.5" />
          Back to data projects
        </Link>

        <header className="mt-8 border-b border-border pb-8 md:mt-12 md:pb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
              Case study 01
            </span>
            <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              In progress
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Data &amp; Analytics
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            MSCI Market <span className="text-primary">Watch.</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            Indonesia Market Reaction &amp; Transparency — exploring IHSG movements around selected MSCI-related events,
            with an emphasis on traceable sources, data quality, and responsible interpretation.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm"><FaDatabase className="text-primary" aria-hidden /> PostgreSQL / Supabase</span>
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm"><FaPython className="text-primary" aria-hidden /> Python</span>
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm"><FaChartLine className="text-primary" aria-hidden /> Power BI</span>
          </div>
        </header>

        <section aria-labelledby="report-heading" className="mt-8 md:mt-10">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaFilePdf aria-hidden className="h-5 w-5" />
              </span>
              <div>
                <h2 id="report-heading" className="text-lg font-semibold">Power BI report</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  View the exported report as a PDF. The screenshots below show the original report pages built in Power BI Desktop.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <a
                href={reportPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Open PDF <FaExternalLinkAlt aria-hidden className="h-3 w-3" />
              </a>
              <a
                href={reportPdf}
                download="msci-market-watch-report.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Download <FaDownload aria-hidden className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {reportScreenshots.map((screenshot) => (
              <article key={screenshot.src} className="overflow-hidden rounded-2xl border border-border bg-card">
                <a
                  href={screenshot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open full screenshot: ${screenshot.title}`}
                  className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary"
                >
                  <div className="relative aspect-video bg-muted/30">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                </a>
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold">{screenshot.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{screenshot.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex flex-col gap-2 border-b border-border bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex items-center gap-2">
                <FaFilePdf aria-hidden className="text-primary" />
                <h3 className="text-sm font-semibold">Report preview · PDF</h3>
              </div>
              <a href={reportPdf} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                Open in new tab
              </a>
            </div>
            <iframe
              src={`${reportPdf}#view=FitH`}
              title="MSCI Market Watch Power BI report PDF preview"
              className="h-[620px] w-full border-0 sm:h-[760px]"
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            This is a static export of the Power BI report, not a live embedded Power BI session. Filters and interactions are available in Power BI Desktop, not in this PDF preview.
          </p>
        </section>

        <section aria-labelledby="overview-heading" className="mt-12 grid gap-8 border-t border-border pt-8 md:mt-16 md:grid-cols-[0.8fr_1.2fr] md:pt-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Project overview</p>
            <h2 id="overview-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">What am I investigating?</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The goal is to understand how the Indonesian equity market moved around selected MSCI-related announcements and government statements, then compare those movements with available context such as exchange-rate observations.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              This is a market-reaction and transparency study, not a stock-price prediction model. Temporal proximity alone does not establish causation.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">01 / Research</span>
              <h3 className="mt-3 text-base font-semibold">Event-aware analysis</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Align market observations with event dates and publication timing, without treating association as proof of causation.</p>
            </article>
            <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">02 / Data</span>
              <h3 className="mt-3 text-base font-semibold">Traceable pipeline</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Keep raw observations, validated facts, source references, and data-quality issues separate.</p>
            </article>
          </div>
        </section>

        <section aria-labelledby="workflow-heading" className="mt-12 border-t border-border pt-8 md:mt-16 md:pt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Method &amp; workflow</p>
          <h2 id="workflow-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">From source data to interpretation</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {workflow.map((step) => (
              <article key={step.number} className="rounded-xl border border-border bg-card p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{step.number}</span>
                  <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">{step.status}</span>
                </div>
                <h3 className="mt-4 text-sm font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-5 text-muted-foreground">
            Data coverage and source definitions are still being validated. Third-party OHLCV data is used for the initial IHSG prototype; provider volume is not treated as a verified headline metric.
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
