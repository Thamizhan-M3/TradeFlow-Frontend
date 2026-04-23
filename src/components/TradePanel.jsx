import { useState } from "react";
import { getUserProfile } from "../api/auth";
import { buyStock, sellStock } from "../api/trade.api";
import { useAuth } from "../hooks/useAuth";
import { usePortfolio } from "../hooks/usePortfolio";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";

export default function TradePanel({ stockId, currentPrice, onSuccess }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, setUser } = useAuth();
  const { holdings, refreshHoldings } = usePortfolio();

  const handleTrade = async (type) => {
    setError("");
    setSuccess("");

    const qty = Number(quantity);

    if (qty <= 0 || isNaN(qty)) {
      setError("Quantity must be greater than 0");
      return;
    }

    if (type === "buy" && user?.balance < qty * currentPrice) {
      setError("Insufficient balance");
      return;
    }

    if (type === "sell") {
      const holding = holdings.find((h) => String(h.stockId) === String(stockId));
      if (!holding || holding.quantity < qty) {
        setError("Not enough holdings to sell");
        return;
      }
    }

    setLoading(true);
    try {
      const payload = {
        userId: user?._id,        // or user?.id depending on your backend
        stockId,
        quantity: qty,
        price: currentPrice
      };
      if (type === "buy") {
        await buyStock(payload);
        setSuccess(`Successfully bought ${qty} shares!`);
      } else {
        await sellStock(payload);
        setSuccess(`Successfully sold ${qty} shares!`);
      }

      setQuantity(1);

      const updatedProfile = await getUserProfile();
      setUser(updatedProfile);
      if (refreshHoldings) refreshHoldings();

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || err.message || `Failed to ${type} stock`);
    } finally {
      setLoading(false);
    }
  };

  const totalValue = (Number(quantity) * currentPrice) || 0;

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-xl font-semibold text-white">Trade</h3>
      <div className="space-y-4">
        <Input
          type="number"
          min="1"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          disabled={loading}
        />

        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Estimated Value</span>
          <span className="font-medium text-white">${totalValue.toFixed(2)}</span>
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}
        {success && <p className="text-sm text-emerald-400">{success}</p>}

        <div className="flex gap-3 pt-2">
          <Button
            className="flex-1"
            onClick={() => handleTrade("buy")}
            disabled={loading}
          >
            Buy
          </Button>
          <Button
            className="flex-1 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
            onClick={() => handleTrade("sell")}
            disabled={loading}
          >
            Sell
          </Button>
        </div>
      </div>
    </Card>
  );
}
