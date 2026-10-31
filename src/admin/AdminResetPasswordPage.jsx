import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest, jsonBody } from "../lib/api";
import AdminAuthLayout from "./AdminAuthLayout";
import "./Admin.css";

export default function AdminResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.hash.slice(1)).get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      await apiRequest("/auth/admin/reset-password", {
        method: "POST",
        body: jsonBody({ token, password }),
      });
      window.dispatchEvent(new Event("sg:admin-session-expired"));
      navigate("/admin/login", { replace: true, state: { passwordReset: true } });
    } catch (requestError) {
      setError(requestError.message || "The password could not be reset.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminAuthLayout
      backTo="/admin/login"
      backLabel="Back to sign in"
      title="Choose a new password."
      description="Use at least 14 characters. This one-time link expires after 15 minutes."
    >
      {!token && <div className="admin-alert error" role="alert">This reset link is invalid or has expired.</div>}
      {error && <div className="admin-alert error" role="alert">{error}</div>}
      <form className="admin-auth-form" onSubmit={submit}>
        <label className="admin-auth-field" htmlFor="admin-new-password">
          <span>New password</span>
          <input id="admin-new-password" type="password" autoComplete="new-password" placeholder="At least 14 characters" required minLength={14} maxLength={72} value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <label className="admin-auth-field" htmlFor="admin-confirm-password">
          <span>Confirm new password</span>
          <input id="admin-confirm-password" type="password" autoComplete="new-password" placeholder="Enter it again" required minLength={14} maxLength={72} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </label>
        <button className="admin-primary admin-auth-submit" disabled={busy || !token}>
          <span>{busy ? "Updating password..." : "Save new password"}</span>
          <span className="admin-auth-submit-arrow" aria-hidden="true">→</span>
        </button>
      </form>
    </AdminAuthLayout>
  );
}
