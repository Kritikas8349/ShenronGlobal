/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { apiRequest, jsonBody } from "../lib/api";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    try { const data = await apiRequest("/auth/admin/me"); setUser(data.user); return data.user; }
    catch { setUser(null); return null; }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => {
    const expire = () => setUser(null);
    window.addEventListener("sg:admin-session-expired", expire);
    return () => window.removeEventListener("sg:admin-session-expired", expire);
  }, []);
  const login = useCallback(async (email, password) => {
    const data = await apiRequest("/auth/admin/login", { method: "POST", body: jsonBody({ email, password }) });
    setUser(data.user); return data.user;
  }, []);
  const logout = useCallback(async () => {
    try { await apiRequest("/auth/admin/logout", { method: "POST" }); }
    finally { setUser(null); }
  }, []);
  const value = useMemo(() => ({ user, loading, login, logout, refresh }), [user, loading, login, logout, refresh]);
  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const value = useContext(AdminAuthContext);
  if (!value) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return value;
}

export function AdminGuard({ children }) {
  const { user, loading } = useAdminAuth();
  const location = useLocation();
  if (loading) return <main className="admin-auth-loading" role="status">Checking admin access…</main>;
  if (!user) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  return children;
}
