"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MarketDashboardData, MarketEvent } from "@/lib/msci-market-watch-db";

type Period = "3M" | "6M" | "1Y" | "ALL";

const numberFormat = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 2,
});
const priceFormat = new Intl.NumberFormat("id-ID", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const dateFormat = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
const monthFormat = new Intl.DateTimeFormat("id-ID", {
  month: "short",
  year: "2-digit",
  timeZone: "UTC",
});

function formatDate(value: string) {
  return dateFormat.format(new Date(`${value}T00:00:00Z`));
}

function formatMonth(value: string) {
  return monthFormat.format(new Date(`${value}T00:00:00Z`));
}

function formatPercent(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function cutoffForPeriod(period: Period, latestDate: string): string | null {
  if (period === "ALL") return null;
  const latest = new Date(`${latestDate}T00:00:00Z`);
  const monthOffset = period === "3M" ? 3 : period === "6M" ? 6 : 12;
  latest.setUTCMonth(latest.getUTCMonth() - monthOffset);
  return latest.toISOString().slice(0, 10);
}

function StatCard({
  label,
  value,
  detail,
  accent = "purple",
}: {
  label: string;
  value: string;
  detail: string;
  accent?: "purple" | "cyan" | "neutral";
}) {
  const accentClass =
    accent === "cyan"
      ? "text-cyan-500"
      : accent === "neutral"
        ? "text-foreground"
        : "text-purple-500";

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-3 text-2xl font-semibold tracking-tight sm:text-3xl ${accentClass}`}>{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 ${className}`}>
      <div className="mb-5">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border px-6 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}

export function MsciMarketWatchDashboard({ data }: { data: MarketDashboardData }) {
  const [period, setPeriod] = useState<Period>("1Y");
  const latestMarket = data.market.length ? data.market[data.market.length - 1] : undefined;
  const previousMarket = data.market.length > 1 ? data.market[data.market.length - 2] : undefined;
  const latestFx = data.fx.length ? data.fx[data.fx.length - 1] : undefined;
  const latestDate = latestMarket?.date ?? data.market[0]?.date;
  const cutoff = latestDate ? cutoffForPeriod(period, latestDate) : null;

  const filteredMarket = useMemo(
    () => data.market.filter((row) => !cutoff || row.date >= cutoff),
    [data.market, cutoff],
  );
  const filteredFx = useMemo(
    () => data.fx.filter((row) => !cutoff || row.date >= cutoff),
    [data.fx, cutoff],
  );
  const filteredEvents = useMemo(
    () => data.events.filter((row) => !cutoff || row.date >= cutoff),
    [data.events, cutoff],
  );

  const latestReturn = latestMarket?.daily_return_pct ?? null;
  const returnAccent = latestReturn === null ? "neutral" : latestReturn >= 0 ? "cyan" : "purple";

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/#data"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <span aria-hidden>←</span> Back to portfolio project
          </Link>
        </div>
        <header className="mb-8 border-b border-border pb-7 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-purple-500">
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            Data Analytics Project
            <span className="text-muted-foreground">/</span>
            Indonesia Market
          </div>
          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                MSCI Market Watch
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Monitoring IHSG, USD/IDR JISDOR, and market-related events to explore how Indonesian
                equities behave around important announcements.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(["3M", "6M", "1Y", "ALL"] as Period[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPeriod(item)}
                  className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                    period === item
                      ? "border-purple-500 bg-purple-500 text-white"
                      : "border-border bg-card text-muted-foreground hover:border-purple-400 hover:text-foreground"
                  }`}
                >
                  {item === "ALL" ? "All data" : item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span>IHSG observations: {numberFormat.format(data.market.length)}</span>
            <span>JISDOR observations: {numberFormat.format(data.fx.length)}</span>
            <span>Event records: {numberFormat.format(data.events.length)}</span>
            <span>Display period: {period === "ALL" ? "All available data" : `Latest ${period}`}</span>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Latest valid IHSG close"
            value={latestMarket ? priceFormat.format(latestMarket.close_price) : "—"}
            detail={latestMarket ? `As of ${formatDate(latestMarket.date)}` : "No validated IHSG data"}
          />
          <StatCard
            label="Latest daily return"
            value={formatPercent(latestReturn)}
            detail={previousMarket && latestMarket ? `Previous observation: ${formatDate(previousMarket.date)}` : "Not available"}
            accent={returnAccent}
          />
          <StatCard
            label="Latest USD/IDR JISDOR"
            value={latestFx ? `Rp ${priceFormat.format(latestFx.rate_value)}` : "—"}
            detail={latestFx ? `As of ${formatDate(latestFx.date)}` : "JISDOR data not loaded yet"}
            accent="cyan"
          />
          <StatCard
            label="Data quality errors"
            value={numberFormat.format(data.quality.errors)}
            detail={`${numberFormat.format(data.quality.total)} recorded issue(s), including ${numberFormat.format(data.quality.warnings)} warning(s)`}
            accent={data.quality.errors > 0 ? "purple" : "neutral"}
          />
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-2">
          <Panel title="IHSG historical closing price" subtitle="Daily closing level. Use the period selector above to focus the chart.">
            {filteredMarket.length ? (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredMarket} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                    <CartesianGrid stroke="currentColor" strokeOpacity={0.1} strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickFormatter={formatMonth} minTickGap={28} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={["auto", "auto"]} width={62} tickFormatter={(value: number) => numberFormat.format(value)} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      labelFormatter={(label) => formatDate(String(label))}
                      formatter={(value) => [priceFormat.format(Number(value)), "IHSG close"]}
                      contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))", fontSize: 12 }}
                    />
                    <Line type="monotone" dataKey="close_price" name="IHSG close" stroke="#A855F7" strokeWidth={2} dot={false} activeDot={{ r: 4 }} connectNulls={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyChart message="No IHSG observations are available for this period." />
            )}
          </Panel>

          <Panel title="Daily IHSG return" subtitle="Change versus the previous available market observation, in percent.">
            {filteredMarket.length ? (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredMarket} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                    <CartesianGrid stroke="currentColor" strokeOpacity={0.1} strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickFormatter={formatMonth} minTickGap={28} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis width={58} tickFormatter={(value: number) => `${value}%`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      labelFormatter={(label) => formatDate(String(label))}
                      formatter={(value) => [formatPercent(Number(value)), "Daily return"]}
                      contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))", fontSize: 12 }}
                    />
                    <Line type="monotone" dataKey="daily_return_pct" name="Daily return" stroke="#06B6D4" strokeWidth={1.8} dot={false} activeDot={{ r: 4 }} connectNulls={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyChart message="No return observations are available for this period." />
            )}
          </Panel>

          <Panel title="USD/IDR JISDOR" subtitle="Bank Indonesia's reference rate in rupiah per US dollar.">
            {filteredFx.length ? (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredFx} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                    <CartesianGrid stroke="currentColor" strokeOpacity={0.1} strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickFormatter={formatMonth} minTickGap={28} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={["auto", "auto"]} width={68} tickFormatter={(value: number) => numberFormat.format(value)} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      labelFormatter={(label) => formatDate(String(label))}
                      formatter={(value) => [`Rp ${priceFormat.format(Number(value))}`, "USD/IDR"]}
                      contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))", fontSize: 12 }}
                    />
                    <Line type="monotone" dataKey="rate_value" name="USD/IDR JISDOR" stroke="#06B6D4" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyChart message="JISDOR data has not been loaded to fact_fx_daily yet. The chart will populate automatically when the ETL is complete." />
            )}
          </Panel>

          <Panel title="Market events" subtitle="Recorded MSCI and government events. Dates show the event date, not necessarily the exact public-release time.">
            {filteredEvents.length ? (
              <div className="space-y-4">
                {filteredEvents.map((event: MarketEvent, index: number) => (
                  <article key={`${event.date}-${event.event_title}-${index}`} className="relative border-l-2 border-purple-500/40 pl-4">
                    <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-purple-500" />
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-purple-500">{formatDate(event.date)}</span>
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{event.event_category.replace(/_/g, " ")}</span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold leading-5">{event.event_title}</h3>
                    {event.event_description ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{event.event_description}</p> : null}
                    <p className="mt-2 text-[11px] text-muted-foreground">Source: {event.source_name ?? "Not recorded"}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyChart message="No events fall within the selected period." />
            )}
          </Panel>
        </section>

        <footer className="mt-8 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
          <p className="font-medium text-foreground">Methodology & limitations</p>
          <p className="mt-1">
            This dashboard describes market movements around recorded events; it does not establish that an event caused a price change. IHSG data is sourced from the configured market-data provider, while JISDOR is a Bank Indonesia reference rate. Provider volume is intentionally not visualized until its units and coverage have been validated.
          </p>
          <p className="mt-2">Rendered from Supabase PostgreSQL views · Updated at {`${data.updatedAt.slice(0, 16).replace("T", " ")} UTC`}</p>
        </footer>
      </div>
    </main>
  );
}
