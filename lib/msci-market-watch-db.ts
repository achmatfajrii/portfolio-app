import "server-only";

import postgres, { type Sql } from "postgres";

const globalForMsciDb = globalThis as unknown as {
  msciMarketWatchSql?: Sql;
};

function getSql(): Sql {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is missing. Add the Supabase Transaction Pooler connection string to .env.local."
    );
  }

  if (!globalForMsciDb.msciMarketWatchSql) {
    globalForMsciDb.msciMarketWatchSql = postgres(databaseUrl, {
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
      ssl: "require",
    });
  }

  return globalForMsciDb.msciMarketWatchSql;
}

export type MarketPoint = {
  date: string;
  close_price: number;
  daily_return_pct: number | null;
};

export type FxPoint = {
  date: string;
  rate_value: number;
  daily_change_pct: number | null;
};

export type MarketEvent = {
  date: string;
  event_category: string;
  event_title: string;
  organization: string | null;
  event_description: string | null;
  market_session: string;
  event_importance: number | null;
  event_timestamp: string | null;
  source_published_at: string | null;
  source_name: string | null;
};

export type QualitySummary = {
  total: number;
  errors: number;
  warnings: number;
};

export type MarketDashboardData = {
  market: MarketPoint[];
  fx: FxPoint[];
  events: MarketEvent[];
  quality: QualitySummary;
  updatedAt: string;
};

export async function getMarketDashboardData(): Promise<MarketDashboardData> {
  const sql = getSql();

  // Run sequentially: the Supabase transaction pooler is designed for short-lived
  // serverless queries and does not support PostgreSQL query pipelining.
  const marketRows = await sql<MarketPoint[]>`
      SELECT
        calendar_date::text AS date,
        close_price::double precision AS close_price,
        daily_return_pct::double precision AS daily_return_pct
      FROM msci_market_watch.vw_market_daily_metrics_pbi
      WHERE close_price IS NOT NULL
      ORDER BY calendar_date ASC
    `;
  const fxRows = await sql<FxPoint[]>`
      SELECT
        calendar_date::text AS date,
        rate_value::double precision AS rate_value,
        daily_change_pct::double precision AS daily_change_pct
      FROM msci_market_watch.vw_fx_daily_metrics_pbi
      WHERE rate_value IS NOT NULL
      ORDER BY calendar_date ASC
    `;
  const eventRows = await sql<MarketEvent[]>`
      SELECT
        d.calendar_date::text AS date,
        e.event_category,
        e.event_title,
        e.organization,
        e.event_description,
        e.market_session,
        e.event_importance,
        e.event_timestamp::text AS event_timestamp,
        e.source_published_at::text AS source_published_at,
        s.source_name
      FROM msci_market_watch.dim_event e
      JOIN msci_market_watch.dim_date d
        ON d.date_key = e.event_date_key
      LEFT JOIN msci_market_watch.dim_source s
        ON s.source_key = e.source_key
      ORDER BY d.calendar_date ASC, e.event_timestamp ASC NULLS LAST
    `;
  const qualityRows = await sql<QualitySummary[]>`
      SELECT
        COUNT(*)::integer AS total,
        COUNT(*) FILTER (WHERE UPPER(severity) = 'ERROR')::integer AS errors,
        COUNT(*) FILTER (WHERE UPPER(severity) IN ('WARNING', 'WARN'))::integer AS warnings
      FROM msci_market_watch.data_quality_issue
    `;

  return {
    market: marketRows,
    fx: fxRows,
    events: eventRows,
    quality: qualityRows[0] ?? { total: 0, errors: 0, warnings: 0 },
    updatedAt: new Date().toISOString(),
  };
}
