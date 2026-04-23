export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/20 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}
