import { Link } from "react-router-dom";
import Card from "./Card";

export default function HoldingCard({ holding, stock }) {
  if (!holding || holding.quantity === 0) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            {stock?.symbol || "Unknown"}
          </p>
          <h3 className="mt-1 text-xl text-white [font-family:'Space_Grotesk',sans-serif]">
            {stock?.name || "Loading..."}
          </h3>
        </div>
        {stock && (
          <Link 
            to={`/stocks/${stock.symbol}`} 
            className="text-xs text-emerald-400 hover:text-emerald-300"
          >
            Trade
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
        <div>
          <p className="text-sm text-slate-400">Quantity</p>
          <p className="mt-1 text-lg font-semibold text-white">{holding.quantity}</p>
        </div>
        <div>
          <p className="text-sm text-slate-400">Avg Buy Price</p>
          <p className="mt-1 text-lg font-semibold text-emerald-300">
            ${Number(holding.avgBuyPrice).toFixed(2)}
          </p>
        </div>
        {stock && (
          <>
            <div>
              <p className="text-sm text-slate-400">Current Price</p>
              <p className="mt-1 text-lg font-semibold text-white">
                ${Number(stock.price).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Value</p>
              <p className="mt-1 text-lg font-semibold text-emerald-300">
                ${(holding.quantity * Number(stock.price)).toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
