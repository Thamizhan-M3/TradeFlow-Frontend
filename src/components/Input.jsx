export default function Input({ label, error, className = "", ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <input
        className={`w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400 ${className}`}
        {...props}
      />
      {error ? <span className="text-sm text-rose-400">{error}</span> : null}
    </label>
  );
}
