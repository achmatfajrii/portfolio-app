import { getMarketDashboardData } from "@/lib/msci-market-watch-db";
import { MsciMarketWatchDashboard } from "@/components/msci-market-watch/msci-market-watch-dashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "MSCI Market Watch | Achmat Fajri",
  description:
    "Indonesia equity market monitoring: IHSG, USD/IDR JISDOR, MSCI-related events, and data quality.",
};

export default async function MsciMarketWatchPage() {
  try {
    const data = await getMarketDashboardData();
    return <MsciMarketWatchDashboard data={data} />;
  } catch (error) {
    console.error("MSCI Market Watch dashboard load failed:", error);

    return (
      <main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-500">
            MSCI Market Watch
          </p>
          <h1 className="mt-3 text-2xl font-semibold">Dashboard data is temporarily unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The page is available, but the server could not read the dashboard data from PostgreSQL.
            Check the server-side DATABASE_URL, Supabase pooler settings, and that the required views exist.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            This message intentionally does not expose database credentials or raw connection errors.
          </p>
        </div>
      </main>
    );
  }
}
