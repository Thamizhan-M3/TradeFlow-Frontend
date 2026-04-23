import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm transition ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`;

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-400 text-sm font-bold text-slate-950">
            TF
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Stock Trading Platform</p>
            <h1 className="text-xl font-semibold text-white [font-family:'Space_Grotesk',sans-serif]">TradeFlow</h1>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
              <Button type="button" className="px-3 py-2 text-sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
