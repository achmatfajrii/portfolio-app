import Link from "next/link";
import { FaExternalLinkAlt, FaChartLine, FaCheckCircle, FaClock, FaDatabase, FaGithub, FaPython, FaRegCircle } from "react-icons/fa";

/**
 * DataJourney — featured case study for the portfolio's Data & Analytics section.
 * The public-facing dashboard is hosted in the same Next.js application.
 * Database credentials remain server-side on the dashboard route.
 */

const GITHUB_URL = "https://github.com/achmatfajrii";
const DASHBOARD_URL = "/projects/msci-market-watch";

type StageState = "done" | "running" | "next";

type ProjectStage = {
  number: string;
  title: string;
  status: string;
  state: StageState;
  description: string;
};

const stages: ProjectStage[] = [
  {
    number: "01",
    title: "Model the data",
    status: "Foundation ready",
    state: "done",
    description:
      "Set up a dedicated PostgreSQL schema, date dimension, source catalog, event catalog, and market-data tables.",
  },
  {
    number: "02",
    title: "Ingest & validate IHSG",
    status: "In progress",
    state: "running",
    description:
      "The first Python ETL run loaded 427 observations into the fact table from 428 source rows. Four quality issues were recorded, including two ERROR-level issues, and are being reviewed.",
  },
  {
    number: "03",
    title: "Build the BI prototype",
    status: "Desktop prototype",
    state: "running",
    description:
      "The Power BI Desktop prototype has initial IHSG price, daily-return, event, and data-quality visuals. Public embedding is on hold while account access is resolved.",
  },
  {
    number: "04",
    title: "Build the public dashboard",
    status: "In progress",
    state: "running",
    description:
      "Create a responsive Next.js dashboard that reads curated PostgreSQL views on the server, keeping database credentials out of client-side code.",
  },
  {
    number: "05",
    title: "Analyze and communicate findings",
    status: "Next",
    state: "next",
    description:
      "Compare market observations around recorded events and explain limitations without treating timing alone as proof of causation.",
  },
];

const stateStyles: Record<StageState, { dot: string; label: string; badge: string }> = {
  done: {
    dot: "bg-emerald-600 dark:bg-emerald-400",
    label: "text-foreground",
    badge: "border-emerald-600/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
  },
  running: {
    dot: "bg-primary ring-4 ring-primary/15",
    label: "text-foreground",
    badge: "border-primary/25 bg-primary/10 text-primary",
  },
  next: {
    dot: "border-2 border-border bg-card",
    label: "text-muted-foreground",
    badge: "border-border bg-muted/40 text-muted-foreground",
  },
};

const tools = [
  { name: "PostgreSQL / Supabase", status: "In use" },
  { name: "Python & pandas", status: "In use" },
  { name: "Power BI Desktop", status: "Prototype" },
  { name: "Next.js", status: "Dashboard in progress" },
] as const;

function StatusBadge({ state, children }: { state: StageState; children: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${stateStyles[state].badge}`}
    >
      {children}
    </span>
  );
}

function Metric({ value, label, note }: { value: string; label: string; note: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/70 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{note}</p>
    </div>
  );
}

export function DataJourney() {
  return (
    <section
      id="data"
      aria-labelledby="data-heading"
      className="relative w-full border-t border-border bg-background py-16 text-foreground md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-10 max-w-3xl md:mb-14">
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-primary/70" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Data &amp; Analytics · Case Study 01
            </span>
          </div>

          <h2
            id="data-heading"
            className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
          >
            From raw data to <span className="text-primary">market insight.</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            As a full-stack developer, I&apos;m expanding into data analytics through my first end-to-end case study:
            exploring Indonesian market movements around MSCI-related events with a focus on transparent data,
            reproducible workflows, and evidence-based interpretation.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-28px_rgba(126,34,206,0.20)] dark:shadow-[0_0_60px_rgba(168,85,247,0.08)]">
          {/* Notebook-inspired window bar retained from the original section */}
          <div className="flex flex-wrap items-center gap-3 border-b border-border bg-muted/50 px-4 py-3 sm:px-5">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            </div>
            <span className="font-mono text-xs text-foreground/80">msci_market_watch / project-log</span>
            <span className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
              Active project
            </span>
          </div>

          <div className="space-y-8 p-4 sm:p-6 lg:p-8">
            {/* Project introduction */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(270px,0.8fr)] lg:gap-10">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <StatusBadge state="running">In progress</StatusBadge>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Indonesia · Equity market
                  </span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  MSCI Market Watch
                </h3>
                <p className="mt-2 text-sm font-medium text-primary sm:text-base">
                  Indonesia Market Reaction &amp; Transparency
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  The project brings together daily IHSG observations, a timeline of market-related events, and a planned
                  USD/IDR JISDOR series. The goal is to examine what happened around key announcements—not to claim that
                  one statement alone caused a market move.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool.name}
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground/90"
                    >
                      <span className="font-medium">{tool.name}</span>
                      <span className="text-muted-foreground">· {tool.status}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Research question card */}
              <aside className="rounded-lg border border-primary/20 bg-primary/[0.04] p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  <FaChartLine aria-hidden className="h-3.5 w-3.5" />
                  Research question
                </div>
                <p className="text-lg font-medium leading-7 text-foreground sm:text-xl">
                  How did the Indonesian equity market move around MSCI-related announcements—and what other indicators should we examine alongside it?
                </p>
                <p className="mt-4 text-xs leading-6 text-muted-foreground">
                  Analytical lens: timing, daily returns, data coverage, and source quality. Association is not proof of causation.
                </p>
              </aside>
            </div>

            {/* Initial ETL checkpoint */}
            <div>
              <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Pipeline checkpoint</p>
                  <h4 className="mt-1 text-base font-semibold text-foreground">Initial IHSG ETL run</h4>
                </div>
                <span className="text-[11px] text-muted-foreground">Snapshot from the first successful load</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Metric value="428" label="Source rows" note="Observations returned by the provider" />
                <Metric value="427" label="Fact rows" note="Observations loaded to the market fact table" />
                <Metric value="4" label="Quality issues" note="Issues recorded by the ETL checks" />
                <Metric value="2" label="Error-level" note="Requires review before stronger conclusions" />
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                These figures describe the initial run, not a live counter. Provider volume remains unvalidated and is not used as a headline insight.
              </p>
            </div>

            {/* Project stages */}
            <div>
              <div className="mb-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Build log</p>
                <h4 className="mt-1 text-lg font-semibold text-foreground">From database to a public-facing analysis</h4>
              </div>

              <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                {stages.map((stage) => {
                  const styles = stateStyles[stage.state];
                  const Icon = stage.state === "done" ? FaCheckCircle : stage.state === "running" ? FaClock : FaRegCircle;

                  return (
                    <li key={stage.number} className="flex min-w-0 flex-col rounded-lg border border-border bg-background/60 p-4">
                      <div className="mb-4 flex items-center justify-between gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{stage.number}</span>
                        <Icon aria-hidden className={`h-4 w-4 ${stage.state === "done" ? "text-emerald-600 dark:text-emerald-400" : stage.state === "running" ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <h5 className={`text-sm font-semibold ${styles.label}`}>{stage.title}</h5>
                      <div className="mt-2">
                        <StatusBadge state={stage.state}>{stage.status}</StatusBadge>
                      </div>
                      <p className="mt-3 flex-1 text-xs leading-6 text-muted-foreground">{stage.description}</p>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Scope and principles */}
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <FaDatabase aria-hidden className="mb-3 h-4 w-4 text-primary" />
                <h5 className="text-sm font-semibold text-foreground">Traceable data</h5>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Preserve source context, separate raw from validated observations, and record quality issues rather than silently filling gaps.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <FaPython aria-hidden className="mb-3 h-4 w-4 text-primary" />
                <h5 className="text-sm font-semibold text-foreground">Reproducible workflow</h5>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Use Python for ingestion and validation, PostgreSQL for structured storage, and Power BI for exploratory reporting.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <FaChartLine aria-hidden className="mb-3 h-4 w-4 text-primary" />
                <h5 className="text-sm font-semibold text-foreground">Evidence before claims</h5>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Compare events and market observations carefully; distinguish observed movements from explanations that still need testing.
                </p>
              </div>
            </div>

            {/* Public-facing dashboard entry point */}
            <section aria-labelledby="dashboard-heading" className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Interactive web dashboard
                  </p>
                  <h4 id="dashboard-heading" className="mt-1 text-lg font-semibold text-foreground sm:text-xl">
                    Explore the market data
                  </h4>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Explore IHSG price movements, daily returns, available USD/IDR JISDOR observations, recorded events,
                    and data-quality checks in a responsive dashboard powered by this project&apos;s PostgreSQL views.
                    Power BI remains the exploratory BI prototype; this Next.js page provides the public-facing experience.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "IHSG trend", detail: "Closing prices across the selected period" },
                  { title: "Daily return", detail: "Change versus the prior available observation" },
                  { title: "USD/IDR JISDOR", detail: "Displayed when validated FX data is loaded" },
                  { title: "Event & quality log", detail: "Recorded context and data limitations" },
                ].map((item) => (
                  <div key={item.title} className="rounded-lg border border-border bg-background/60 p-4">
                    <h5 className="text-sm font-semibold text-foreground">{item.title}</h5>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <FaChartLine aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground">MSCI Market Watch dashboard</h5>
                    <p className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">
                      Interactive charts and event context, queried on the server from Supabase PostgreSQL. The page remains useful
                      even when JISDOR observations are not yet available.
                    </p>
                  </div>
                </div>
                <Link
                  href={DASHBOARD_URL}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Explore interactive dashboard
                  <span aria-hidden>→</span>
                </Link>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                Method note: the dashboard describes movements around recorded events. It does not establish that an event caused a market change.
                Provider volume remains excluded until its definition and units are verified.
              </p>
            </section>

            {/* Footer / CTA */}
            <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-medium text-foreground">A work in progress, documented as it develops.</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  The dashboard is a working project view. Data validation and market interpretation are still in progress.
                </p>
              </div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <FaGithub aria-hidden className="h-4 w-4" />
                Explore my GitHub
                <FaExternalLinkAlt aria-hidden className="h-3 w-3 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataJourney;
