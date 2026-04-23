import { Link } from "react-router-dom";
import { getStocks } from "../api/stocks";
import Card from "../components/Card";
import PageShell from "../components/PageShell";
import { ErrorMessage, LoadingMessage } from "../components/StatusMessage";
import { useAsync } from "../hooks/useAsync";

export default function DashboardPage() {
  const { data: stocks, loading, error } = useAsync(getStocks, []);

  return (
    <PageShell>
      <section className="mb-8 space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Stocks Dashboard</p>
        <h2 className="text-4xl text-white [font-family:'Space_Grotesk',sans-serif]">Track the latest listed stocks</h2>
        <p className="max-w-2xl text-slate-400">
          Browse the stock list, inspect prices, and open the detail page for historical movement.
        </p>
      </section>

      {loading ? <LoadingMessage message="Fetching stocks..." /> : null}
      {error ? <ErrorMessage message={error} /> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stocks?.map((stock) => (
          <Link key={stock._id} to={`/stocks/${stock.symbol}`}>
            <Card className="h-full p-6 transition hover:-translate-y-1 hover:border-emerald-400/30">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{stock.symbol}</p>
                  <h3 className="mt-2 text-2xl text-white [font-family:'Space_Grotesk',sans-serif]">{stock.name}</h3>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {stock.sector}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-400">Current Price</p>
                <p className="text-3xl font-semibold text-emerald-300">${Number(stock.price).toFixed(2)}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
