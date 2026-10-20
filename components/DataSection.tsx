"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Database,
  FileText,
  Globe2,
  Layers3,
  Users,
} from "lucide-react";

type ProjectMeta = {
  title: string;
  subtitle: string;
  source: string;
  sourceUrl: string;
  dataset: string;
  dataAsOf: string;
  datasetLastUpdated: string;
  license: string;
};

type AnalyticsData = {
  project: ProjectMeta;
  methodology: {
    sourceRecordCount: number;
    analysisRecordCount: number;
    exactDuplicateRowsRemoved: number;
    dateRange: { from: string; to: string };
    recordsWithAmount: number;
    recordsMissingAmount: number;
    amountCoveragePct: number;
    uniqueSupplierCountries: number;
    interpretationNotes: string[];
  };
  kpis: {
    awardRecords: number;
    suppliers: number;
    categories: number;
    availableAmountSumUsd: number;
    medianAvailableAmountUsd: number;
    recordsWithAmount: number;
    recordsMissingAmount: number;
  };
  insights: {
    title: string;
    value: string;
    detail: string;
    metric: string;
    category?: string;
    country?: string;
  }[];
  categoriesBySpend: {
    category: string;
    recordCount: number;
    amountRecordCount: number;
    availableAmountUsd: number;
    amountSharePct: number;
  }[];
  categoriesByRecordCount: {
    category: string;
    recordCount: number;
    amountRecordCount: number;
    availableAmountUsd: number;
    amountSharePct: number;
  }[];
  topSuppliersByAvailableAmount: {
    supplier: string;
    recordCount: number;
    amountRecordCount: number;
    availableAmountUsd: number;
    amountSharePct: number;
  }[];
  topSupplierRegistrationCountriesByAvailableAmount: {
    country: string;
    recordCount: number;
    amountRecordCount: number;
    availableAmountUsd: number;
    amountSharePct: number;
  }[];
  annualTrendByCalendarYear: {
    year: number;
    recordCount: number;
    amountRecordCount: number;
    missingAmountCount: number;
    availableAmountUsd: number;
    medianAvailableAmountUsd: number;
    partialYear: boolean;
  }[];
};

type CategoryMode = "amount" | "records";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

const formatCompactUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));

export function DataSection() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [categoryMode, setCategoryMode] = useState<CategoryMode>("amount");

  useEffect(() => {
    let active = true;

    fetch("/data/procurement-spend-analytics.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load procurement analytics data.");
        }
        return response.json() as Promise<AnalyticsData>;
      })
      .then((data) => {
        if (active) setAnalytics(data);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    if (!analytics) return [];
    return categoryMode === "amount"
      ? analytics.categoriesBySpend.slice(0, 5)
      : analytics.categoriesByRecordCount.slice(0, 5);
  }, [analytics, categoryMode]);

  const maxCategoryValue = useMemo(() => {
    if (!analytics || categories.length === 0) return 1;
    return categoryMode === "amount"
      ? Math.max(...categories.map((item) => item.availableAmountUsd), 1)
      : Math.max(...categories.map((item) => item.recordCount), 1);
  }, [analytics, categories, categoryMode]);

  const maxAnnualAmount = useMemo(() => {
    if (!analytics) return 1;
    return Math.max(...analytics.annualTrendByCalendarYear.map((item) => item.availableAmountUsd), 1);
  }, [analytics]);

  return (
    <section
      id="data-projects"
      className="relative w-full overflow-hidden border-t border-white/5 bg-transparent py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[8%] top-[18%] h-64 w-64 rounded-full bg-purple-500/[0.04] blur-[110px]" />
        <div className="absolute bottom-[8%] right-[7%] h-72 w-72 rounded-full bg-violet-500/[0.04] blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl md:mb-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-purple-400/70" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-300/80">
              Data &amp; Analytics / Featured Case Study
            </span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Procurement Spend <span className="text-white/35">Intelligence.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50 md:text-base md:leading-7">
            An exploratory analysis of World Bank Group corporate procurement contract award records, focused on award value, commodity categories, and supplier concentration.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {["Python", "Data Cleaning", "Exploratory Analysis", "Next.js"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-white/[0.025] px-3 py-1.5 font-mono text-[10px] text-white/55"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {loadError ? (
          <div className="rounded-2xl border border-border bg-[#100D15]/70 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <Database size={18} className="mt-0.5 shrink-0 text-purple-300" />
              <div>
                <h3 className="font-medium text-foreground">Analytics data could not be loaded</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  Check that the file exists at <code className="text-purple-200">public/data/procurement-spend-analytics.json</code> and that the filename matches exactly.
                </p>
              </div>
            </div>
          </div>
        ) : !analytics ? (
          <div className="rounded-2xl border border-border bg-[#100D15]/60 p-6 sm:p-8" aria-live="polite">
            <div className="flex items-center gap-3 text-sm text-white/50">
              <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
              Loading verified dataset summaries…
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="h-24 animate-pulse rounded-xl border border-white/5 bg-white/[0.025]" />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-5">
            {/* Project overview and source details */}
            <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-[#100D15]/80 p-5 sm:p-7">
                <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-purple-500/[0.07] blur-3xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple-300/75">Executive overview</p>
                    <p className="mt-2 text-sm leading-6 text-white/50">Total available award amount in the cleaned records.</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                      {formatCompactUsd(analytics.kpis.availableAmountSumUsd)}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/35">
                      Sum of records with a reported amount; this is not the full procurement spend.
                    </p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-300/20 bg-purple-400/[0.08] text-purple-200">
                    <BarChart3 size={20} />
                  </div>
                </div>

                <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">Dataset records</p>
                    <p className="mt-1.5 text-lg font-semibold tabular-nums text-foreground">{formatNumber(analytics.kpis.awardRecords)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">Records with amount</p>
                    <p className="mt-1.5 text-lg font-semibold tabular-nums text-foreground">{formatNumber(analytics.kpis.recordsWithAmount)}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">Median recorded award</p>
                    <p className="mt-1.5 text-lg font-semibold tabular-nums text-foreground">{formatCompactUsd(analytics.kpis.medianAvailableAmountUsd)}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-border bg-[#100D15]/60 p-5 sm:p-7">
                <div>
                  <div className="flex items-center gap-2 text-purple-200/80">
                    <FileText size={15} />
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em]">Dataset profile</p>
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-foreground">{analytics.project.dataset}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/45">Source: {analytics.project.source}</p>

                  <div className="mt-5 space-y-3 border-t border-white/[0.07] pt-4">
                    <div className="flex items-start justify-between gap-3 text-xs">
                      <span className="text-white/35">Award date range</span>
                      <span className="text-right text-white/70">{formatDate(analytics.methodology.dateRange.from)} – {formatDate(analytics.methodology.dateRange.to)}</span>
                    </div>
                    <div className="flex items-start justify-between gap-3 text-xs">
                      <span className="text-white/35">Unique suppliers</span>
                      <span className="text-white/70">{formatNumber(analytics.kpis.suppliers)}</span>
                    </div>
                    <div className="flex items-start justify-between gap-3 text-xs">
                      <span className="text-white/35">Commodity categories</span>
                      <span className="text-white/70">{formatNumber(analytics.kpis.categories)}</span>
                    </div>
                    <div className="flex items-start justify-between gap-3 text-xs">
                      <span className="text-white/35">Data as of</span>
                      <span className="text-white/70">{formatDate(analytics.project.dataAsOf)}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={analytics.project.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-medium text-purple-200/80 transition-colors hover:text-purple-100"
                >
                  View official dataset <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* KPI row */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Award records", value: formatNumber(analytics.kpis.awardRecords), note: "After removing one exact duplicate", Icon: Database },
                { label: "Unique suppliers", value: formatNumber(analytics.kpis.suppliers), note: "Supplier names in the dataset", Icon: Users },
                { label: "Categories", value: formatNumber(analytics.kpis.categories), note: "Raw commodity category labels", Icon: Layers3 },
                { label: "Supplier countries", value: formatNumber(analytics.methodology.uniqueSupplierCountries), note: "By supplier registration country", Icon: Globe2 },
              ].map(({ label, value, note, Icon }) => (
                <div key={label} className="rounded-xl border border-white/[0.08] bg-[#100D15]/55 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-white/45">{label}</p>
                    <Icon size={15} className="text-purple-300/70" />
                  </div>
                  <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums text-foreground">{value}</p>
                  <p className="mt-1.5 text-[10px] leading-4 text-white/30">{note}</p>
                </div>
              ))}
            </div>

            {/* Category chart + annual trend */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-[#100D15]/70 p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Category breakdown</p>
                    <h3 className="mt-2 text-lg font-medium text-foreground">Where awards are concentrated</h3>
                  </div>
                  <div className="inline-flex w-fit rounded-lg border border-border bg-black/20 p-1" role="group" aria-label="Category chart metric">
                    <button
                      type="button"
                      onClick={() => setCategoryMode("amount")}
                      aria-pressed={categoryMode === "amount"}
                      className={`rounded-md px-3 py-1.5 text-[10px] transition-colors ${categoryMode === "amount" ? "bg-purple-400/15 text-purple-100" : "text-white/40 hover:text-white/70"}`}
                    >
                      By value
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategoryMode("records")}
                      aria-pressed={categoryMode === "records"}
                      className={`rounded-md px-3 py-1.5 text-[10px] transition-colors ${categoryMode === "records" ? "bg-purple-400/15 text-purple-100" : "text-white/40 hover:text-white/70"}`}
                    >
                      By records
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {categories.map((item) => {
                    const value = categoryMode === "amount" ? item.availableAmountUsd : item.recordCount;
                    const width = Math.max(2, (value / maxCategoryValue) * 100);
                    const share = categoryMode === "amount"
                      ? item.amountSharePct
                      : (item.recordCount / analytics.kpis.awardRecords) * 100;

                    return (
                      <div key={`${categoryMode}-${item.category}`}>
                        <div className="mb-2 flex items-end justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-white/80">{item.category.trim()}</p>
                            <p className="mt-1 text-[10px] text-white/35">{formatNumber(item.recordCount)} records</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-xs font-medium tabular-nums text-white/80">{categoryMode === "amount" ? formatCompactUsd(item.availableAmountUsd) : formatNumber(item.recordCount)}</p>
                            <p className="mt-1 text-[10px] tabular-nums text-white/35">{share.toFixed(1)}% {categoryMode === "amount" ? "of available amount" : "of records"}</p>
                          </div>
                        </div>
                        <div
                          className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
                          role="progressbar"
                          aria-label={`${item.category.trim()} ${categoryMode === "amount" ? "available amount" : "record count"}`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={Math.min(100, share)}
                        >
                          <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-300 transition-[width] duration-300" style={{ width: `${width}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-5 text-[10px] leading-5 text-white/30">Category labels are shown as provided by the source; similar-looking raw labels are not automatically merged.</p>
              </div>

              <div className="rounded-2xl border border-border bg-[#100D15]/70 p-5 sm:p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Calendar year overview</p>
                  <h3 className="mt-2 text-lg font-medium text-foreground">Recorded award value over time</h3>
                  <p className="mt-2 text-xs leading-5 text-white/40">Annual sum of non-missing award amounts, in USD.</p>
                </div>

                <div className="mt-6 overflow-x-auto pb-1">
                  <div
                    className="grid min-w-[600px] items-end gap-2"
                    style={{ gridTemplateColumns: `repeat(${analytics.annualTrendByCalendarYear.length}, minmax(24px, 1fr))` }}
                  >
                    {analytics.annualTrendByCalendarYear.map((item) => {
                      const height = Math.max(4, (item.availableAmountUsd / maxAnnualAmount) * 100);
                      return (
                        <div key={item.year} className="flex h-36 flex-col items-center justify-end gap-2" title={`${item.year}${item.partialYear ? " (partial year)" : ""}: ${formatUsd(item.availableAmountUsd)} available amount; ${formatNumber(item.recordCount)} records`}>
                          <div className="flex h-28 w-full items-end justify-center">
                            <div
                              className={`w-full max-w-7 rounded-t-sm transition-colors ${item.partialYear ? "bg-purple-400/35" : "bg-purple-400/65 hover:bg-purple-300"}`}
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <span className={`text-[9px] tabular-nums ${item.partialYear ? "text-purple-200/70" : "text-white/35"}`}>{String(item.year).slice(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-white/35">
                  <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-sm bg-purple-400/65" /> Full calendar years</span>
                  <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-sm bg-purple-400/35" /> Partial calendar years</span>
                </div>
                <p className="mt-4 border-t border-white/[0.07] pt-4 text-[10px] leading-5 text-white/35">
                  Caution: reporting thresholds changed in Q3 FY25, so annual values across that change are not directly comparable. 2013 and 2026 are partial years.
                </p>
              </div>
            </div>

            {/* Supplier leaderboard and findings */}
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-2xl border border-border bg-[#100D15]/70 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Supplier leaderboard</p>
                    <h3 className="mt-2 text-lg font-medium text-foreground">Largest available award amounts</h3>
                  </div>
                  <Users size={17} className="mt-1 text-purple-300/70" />
                </div>
                <div className="mt-5 divide-y divide-white/[0.06]">
                  {analytics.topSuppliersByAvailableAmount.slice(0, 5).map((supplier, index) => (
                    <div key={supplier.supplier} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/[0.08] font-mono text-[10px] text-white/40">{String(index + 1).padStart(2, "0")}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-white/80">{supplier.supplier}</p>
                        <p className="mt-1 text-[10px] text-white/35">{formatNumber(supplier.recordCount)} award records</p>
                      </div>
                      <p className="shrink-0 text-xs font-medium tabular-nums text-white/75">{formatCompactUsd(supplier.availableAmountUsd)}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 border-t border-white/[0.07] pt-4 text-[10px] leading-5 text-white/30">Ranked by the sum of available amounts associated with each supplier name. Missing amount values are excluded.</p>
              </div>

              <div className="rounded-2xl border border-border bg-[#100D15]/70 p-5 sm:p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">What stands out</p>
                  <h3 className="mt-2 text-lg font-medium text-foreground">Signals from the dataset</h3>
                </div>
                <div className="mt-5 space-y-4">
                  {analytics.insights.slice(0, 3).map((insight, index) => (
                    <div key={insight.title} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-purple-400/[0.09] font-mono text-[9px] text-purple-200/80">0{index + 1}</span>
                      <div>
                        <p className="text-xs font-medium leading-5 text-white/80">{insight.title}</p>
                        <p className="mt-1 text-xs leading-5 text-white/45">{insight.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-amber-200/10 bg-amber-100/[0.035] p-3.5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-amber-100/70">Data limitation</p>
                  <p className="mt-1.5 text-xs leading-5 text-white/45">{formatNumber(analytics.kpis.recordsMissingAmount)} records ({(analytics.kpis.recordsMissingAmount / analytics.kpis.awardRecords * 100).toFixed(1)}%) have no award amount. The source also notes that this dataset does not include every contract.</p>
                </div>
              </div>
            </div>

            {/* Attribution */}
            <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-3xl text-[10px] leading-5 text-white/30">
                Source: World Bank Group, Corporate Procurement Contract Awards. Licensed under CC BY 4.0. Supplier country refers to registration in the source vendor database and may not indicate actual country of origin.
              </p>
              <a
                href={analytics.project.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex shrink-0 items-center gap-2 text-xs text-white/50 transition-colors hover:text-purple-200"
              >
                Source &amp; methodology <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
