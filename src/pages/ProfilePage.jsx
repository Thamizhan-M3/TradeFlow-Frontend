import { getStocks } from "../api/stocks";
import Card from "../components/Card";
import HoldingCard from "../components/HoldingCard";
import PageShell from "../components/PageShell";
import { ErrorMessage, LoadingMessage } from "../components/StatusMessage";
import { useAsync } from "../hooks/useAsync";
import { useAuth } from "../hooks/useAuth";
import { usePortfolio } from "../hooks/usePortfolio";

export default function ProfilePage() {
  const { user: profile, isAuthLoading: loading } = useAuth();
  const { data: stocks } = useAsync(getStocks, []);
  const { holdings, loading: portfolioLoading, error: portfolioError } = usePortfolio();

  console.log("USER:", profile);
  console.log("STOCKS:", stocks);

  return (
    <PageShell>
      <section className="mb-8 space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">User Profile</p>
        <h2 className="text-4xl text-white [font-family:'Space_Grotesk',sans-serif]">Your account details</h2>
      </section>

      {loading ? <LoadingMessage message="Loading profile..." /> : null}
      {portfolioError ? <ErrorMessage message={portfolioError} /> : null}

      {profile ? (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm text-slate-400">Name</p>
            <p className="mt-3 text-2xl font-semibold text-white">{profile.name}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-3 text-xl font-semibold text-white">{profile.email}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-slate-400">Balance</p>
            <p className="mt-3 text-2xl font-semibold text-emerald-300">
              ${Number(profile.balance || 0).toFixed(2)}
            </p>
          </Card>
        </div>
      ) : null}

      <section className="mt-12 mb-6 space-y-2">
        <h3 className="text-2xl text-white [font-family:'Space_Grotesk',sans-serif]">Portfolio Holdings</h3>
        <p className="text-slate-400">Your currently active stock positions.</p>
      </section>

      {portfolioLoading ? <LoadingMessage message="Loading portfolio..." /> : null}
      {portfolioError ? <ErrorMessage message={portfolioError} /> : null}

      {!portfolioLoading && !portfolioError && holdings?.length === 0 ? (
        <Card className="p-8 text-center text-slate-400">
          You don't have any holdings yet. Head to the dashboard to start trading!
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {holdings?.map((holding) => {
            const stock = stocks?.find((s) => String(s._id) === String(holding.stockId));
            return <HoldingCard key={holding.stockId} holding={holding} stock={stock} />;
          })}
        </div>
      )}
    </PageShell>
  );
}
