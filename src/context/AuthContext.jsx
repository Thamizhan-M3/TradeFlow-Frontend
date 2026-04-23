import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, loginUser } from "../api/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("tradeflow_token"));
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch {
        localStorage.removeItem("tradeflow_token");
        setToken(null);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    }

    restoreSession();
  }, [token]);

  async function login(credentials) {
    const data = await loginUser(credentials);
    localStorage.setItem("tradeflow_token", data.token);
    setToken(data.token);
    setUser(data.user);
    navigate("/", { replace: true });
  }

  function logout() {
    localStorage.removeItem("tradeflow_token");
    setToken(null);
    setUser(null);
    navigate("/login", { replace: true });
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isAuthLoading,
      login,
      logout,
      setUser
    }),
    [user, token, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
