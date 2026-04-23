import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import PageShell from "../components/PageShell";
import { ErrorMessage } from "../components/StatusMessage";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      console.log("logging in...");
      setError("");
      await login(form);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-md">
        <Card className="p-8">
          <div className="mb-8 space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Welcome Back</p>
            <h2 className="text-3xl text-white [font-family:'Space_Grotesk',sans-serif]">Login to TradeFlow</h2>
            <p className="text-sm text-slate-400">Access your market dashboard and profile.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="Enter your password"
              required
            />

            {error ? <ErrorMessage message={error} /> : null}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-medium text-emerald-300 hover:text-emerald-200">
              Register
            </Link>
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
