import { Link } from "react-router-dom";

export default function AdminAuthLayout({ backTo, backLabel, title, description, children }) {
  return (
    <main className="admin-auth-page">
      <div className="admin-auth-orb admin-auth-orb-one" aria-hidden="true" />
      <div className="admin-auth-orb admin-auth-orb-two" aria-hidden="true" />
      <section className="admin-auth-card" aria-labelledby="admin-auth-title">
        <div className="admin-auth-topbar">
          <Link className="admin-auth-back" to={backTo}>
            <span aria-hidden="true">←</span>
            {backLabel}
          </Link>
          <span className="admin-auth-secure"><span aria-hidden="true" />Secure portal</span>
        </div>

        <header className="admin-auth-heading">
          <div className="admin-auth-brand-mark" aria-hidden="true">SG</div>
          <span className="admin-auth-eyebrow">SHENRON GLOBAL <i /> ADMIN PORTAL</span>
          <h1 id="admin-auth-title">{title}</h1>
          <p>{description}</p>
        </header>

        {children}

        <footer className="admin-auth-footer">
          <span className="admin-auth-footer-mark" aria-hidden="true">●</span>
          <span>PRIVATE ADMIN WORKSPACE</span>
          <i />
          <span>SHENRON GLOBAL</span>
        </footer>
      </section>
      <p className="admin-auth-copyright">© 2026 Shenron Global</p>
    </main>
  );
}
