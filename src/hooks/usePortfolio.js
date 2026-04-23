import { useCallback, useEffect, useState } from "react";
import { getPortfolioHoldings } from "../api/portfolio.api";
import { useAuth } from "./useAuth";

export function usePortfolio() {
  const { user } = useAuth();
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHoldings = useCallback(async () => {
    if (!user?._id) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      const data = await getPortfolioHoldings(user._id);
      console.log("HOLDINGS RESPONSE:", data);
      setHoldings(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch portfolio");
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchHoldings();
  }, [fetchHoldings]);

  return { holdings, loading, error, refreshHoldings: fetchHoldings };
}
