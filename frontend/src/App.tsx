import { lazy, Suspense, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { KPIRow } from "@/components/dashboard/kpi-row";
import {
  type FinancialMovement,
} from "@/lib/financial-types";
import { computeKPIs, computeMonthlyData } from "@/lib/financial-utils";

const IncomeOutcomeChart = lazy(() =>
  import("@/components/dashboard/income-outcome-chart").then((module) => ({
    default: module.IncomeOutcomeChart,
  })),
);

const ProfitPercentChart = lazy(() =>
  import("@/components/dashboard/profit-percent-chart").then((module) => ({
    default: module.ProfitPercentChart,
  })),
);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function fetchFinancialData(): Promise<FinancialMovement[]> {
  const response = await fetch(`${API_BASE_URL}/api/metrics`);
  if (!response.ok) {
    throw new Error(`Failed to fetch financial data: ${response.status}`);
  }
  return response.json();
}

function App() {
  const {
    data: movements,
    isPending: loading,
    isError,
  } = useQuery({
    queryKey: ["financial-metrics"],
    queryFn: fetchFinancialData,
    staleTime: 60_000,
  });

  const metrics = useMemo(
    () => (movements ? computeKPIs(movements) : null),
    [movements],
  );

  const monthlyData = useMemo(
    () => (movements ? computeMonthlyData(movements) : []),
    [movements],
  );

  const error = isError
    ? "No se pudo cargar la informacion financiera. Revisa la API de backend."
    : null;

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <DashboardHeader period="2024 - Full Year" />

          {error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground">
              {error}
            </div>
          ) : null}

          <section aria-label="Key performance indicators">
            <KPIRow metrics={metrics} loading={loading} />
          </section>

          <section
            aria-label="Financial charts"
            className="grid grid-cols-1 gap-4 xl:grid-cols-2"
          >
            <Suspense
              fallback={
                <div
                  className="col-span-1 xl:col-span-2 grid grid-cols-1 gap-4 xl:grid-cols-2"
                  aria-hidden="true"
                >
                  <div className="h-[360px] rounded-xl border border-border/60 bg-card" />
                  <div className="h-[360px] rounded-xl border border-border/60 bg-card" />
                </div>
              }
            >
              <IncomeOutcomeChart data={monthlyData} loading={loading} />
              <ProfitPercentChart data={monthlyData} loading={loading} />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
