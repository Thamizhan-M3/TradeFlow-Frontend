import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

function formatChartData(history) {
  return history.map((item) => ({
    time: new Date(item.timestamp).toLocaleString([], {
      day: "2-digit",
      // month: "short",
      // hour: "2-digit",
      // minute: "2-digit"
    }),
    price: Number(item.price)
  }));
}

export default function StockChart({ history }) {
  const data = formatChartData(history);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
          <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px"
            }}
          />
          <Line type="monotone" dataKey="price" stroke="#34d399" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
