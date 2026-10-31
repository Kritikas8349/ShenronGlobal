import { useState } from "react";
import { apiRequest, jsonBody } from "../lib/api";
import AdminAuthLayout from "./AdminAuthLayout";
import "./Admin.css";

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setError("");
    try {
      const data = await apiRequest("/auth/admin/forgot-password", {
        method: "POST",
        body: jsonBody({ email }),
      });
      setMessage(data.message);
    } catch (requestError) {
      setError(requestError.message || "The reset request could not be completed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminAuthLayout
      backTo="/admin/login"
      backLabel="Back to sign in"
      title="Recover your account."
      description="Enter the admin email address and we'll send a one-time password reset link."
    >
      {error && <div className="admin-alert error" role="alert">{error}</div>}
      {message && <div className="admin-alert" role="status">{message}</div>}
      <form className="admin-auth-form" onSubmit={submit}>
        <label className="admin-auth-field" htmlFor="admin-recovery-email">
          <span>Admin email address</span>
          <input id="admin-recovery-email" type="email" autoComplete="username" placeholder="you@example.com" required maxLength={320} value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <button className="admin-primary admin-auth-submit" disabled={busy}>
          <span>{busy ? "Sending link..." : "Send reset link"}</span>
          <span className="admin-auth-submit-arrow" aria-hidden="true">→</span>
        </button>
        <p className="admin-auth-form-note">For your security, the reset link can only be sent to the configured admin email address.</p>
      </form>
    </AdminAuthLayout>
  );
}
