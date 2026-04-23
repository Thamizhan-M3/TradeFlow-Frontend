import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import PageShell from "../components/PageShell";
import { ErrorMessage } from "../components/StatusMessage";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      await registerUser(form);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-md">
        <Card className="p-8">
          <div className="mb-8 space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Create Account</p>
            <h2 className="text-3xl text-white [font-family:'Space_Grotesk',sans-serif]">Join TradeFlow</h2>
            <p className="text-sm text-slate-400">Register to explore stocks and manage your profile.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Your full name"
              required
            />
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
              placeholder="Create a password"
              required
            />

            {error ? <ErrorMessage message={error} /> : null}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-emerald-300 hover:text-emerald-200">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
