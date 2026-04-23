import { Link, useParams } from "react-router-dom";
import { getStock, getStockHistory } from "../api/stocks";
import Card from "../components/Card";
import PageShell from "../components/PageShell";
import StockChart from "../components/StockChart";
import { ErrorMessage, LoadingMessage } from "../components/StatusMessage";
import TradePanel from "../components/TradePanel";
import { useAsync } from "../hooks/useAsync";

export default function StockDetailsPage() {
  const { symbol = "" } = useParams();
  const stockState = useAsync(() => getStock(symbol), [symbol]);
  const historyState = useAsync(() => getStockHistory(symbol), [symbol]);

  const history = historyState.data?.history || [];

  return (
    <PageShell>
      <div className="mb-6">
        <Link to="/" className="text-sm text-emerald-300 hover:text-emerald-200">
          ← Back to dashboard
        </Link>
      </div>

      {stockState.loading ? <LoadingMessage message="Loading stock details..." /> : null}
      {stockState.error ? <ErrorMessage message={stockState.error} /> : null}

      {stockState.data ? (
        <div className="space-y-6">
          <Card className="p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{stockState.data.symbol}</p>
                <h2 className="mt-3 text-4xl text-white [font-family:'Space_Grotesk',sans-serif]">{stockState.data.name}</h2>
                <p className="mt-3 text-slate-400">{stockState.data.sector}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Current Price</p>
                <p className="mt-2 text-4xl font-semibold text-emerald-300">
                  ${Number(stockState.data.price).toFixed(2)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Price History</p>
                <h3 className="mt-2 text-2xl text-white [font-family:'Space_Grotesk',sans-serif]">Historical movement</h3>
              </div>
            </div>

            {historyState.loading ? <LoadingMessage message="Loading chart data..." /> : null}
            {historyState.error ? <ErrorMessage message={historyState.error} /> : null}
            {history.length ? (
              <StockChart history={history} />
            ) : (
              !historyState.loading && (
                <p className="text-sm text-slate-400">No price history found for this stock yet.</p>
              )
            )}
          </Card>

          <TradePanel 
            stockId={stockState.data._id} 
            currentPrice={stockState.data.price} 
          />
        </div>
      ) : null}
    </PageShell>
  );
}
