export function LoadingMessage({ message = "Loading..." }) {
  return <p className="text-sm text-slate-300">{message}</p>;
}

export function ErrorMessage({ message }) {
  return <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{message}</p>;
}
