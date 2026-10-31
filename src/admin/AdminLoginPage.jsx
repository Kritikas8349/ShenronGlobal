import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuth";
import AdminAuthLayout from "./AdminAuthLayout";
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
  return (
    <AdminAuthLayout
      backTo="/blogs"
      backLabel="Visit the journal"
      title="Sign in to your desk."
      description="Manage market notes and published articles from your private workspace."
    >
      {location.state?.passwordReset && <div className="admin-alert" role="status">Your password has been reset. Sign in with the new password.</div>}
      {error && <div className="admin-alert error" role="alert">{error}</div>}
      <form className="admin-auth-form" onSubmit={submit}>
        <label className="admin-auth-field" htmlFor="admin-login-email">
          <span>Email address</span>
          <input id="admin-login-email" type="email" autoComplete="username" placeholder="you@example.com" required value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <div className="admin-auth-field">
          <div className="admin-auth-field-head">
            <label htmlFor="admin-login-password">Password</label>
            <Link to="/admin/forgot-password">Forgot password?</Link>
          </div>
          <input id="admin-login-password" type="password" autoComplete="current-password" placeholder="Enter your password" required value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button className="admin-primary admin-auth-submit" disabled={busy}>
          <span>{busy ? "Signing in..." : "Sign in to admin"}</span>
          <span className="admin-auth-submit-arrow" aria-hidden="true">→</span>
        </button>
      </form>
    </AdminAuthLayout>
  );
}
