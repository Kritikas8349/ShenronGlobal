import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuth";
import "./Admin.css";

export default function AdminLoginPage() {
  const { user, loading, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (!loading && user) return <Navigate to="/admin/blogs" replace />;
  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setError("");
    try { await login(email, password); navigate(location.state?.from?.pathname || "/admin/blogs", { replace: true }); }
    catch (err) { setError(err.message || "Sign in failed."); }
    finally { setBusy(false); }
  };
  return <main className="admin-login-page"><form className="admin-login-card" onSubmit={submit}>
    <Link className="admin-login-back" to="/blogs">← Visit the journal</Link>
    <span className="admin-eyebrow">SHENRON GLOBAL · ADMIN</span><h1>Sign in to your desk.</h1><p>Manage market notes and published articles.</p>
    {error && <div className="admin-alert error" role="alert">{error}</div>}
    <label>Email address<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
    <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
    <button className="admin-primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
  </form></main>;
}
