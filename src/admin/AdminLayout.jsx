import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuth";
import "./Admin.css";

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const signOut = async () => { await logout(); navigate("/admin/login", { replace: true }); };
  return <div className="admin-shell">
    <aside className="admin-sidebar" aria-label="Admin navigation"><div className="admin-brand"><span className="admin-brand-mark">S</span><div><strong>Shenron</strong><small>CONTENT DESK</small></div></div>
      <div className="admin-nav-label">WORKSPACE</div><NavLink to="/admin/blogs" end aria-label="All articles" className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}><span>▤</span>All articles</NavLink>
      <NavLink to="/admin/blogs/new" aria-label="New article" className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}><span>＋</span>New article</NavLink>
      <a className="admin-nav-link" aria-label="Enquiry form" href="/contact-us" target="_blank" rel="noreferrer" title="Open the existing contact enquiry form"><span>✉</span>Enquiry form</a>
      <div className="admin-sidebar-foot"><span className="admin-user-dot">{user?.email?.slice(0, 1)?.toUpperCase() || "A"}</span><div className="admin-user-info"><strong>{user?.email}</strong><small>Administrator</small></div><button aria-label="Sign out" title="Sign out" onClick={signOut}>↗</button></div>
    </aside>
    <div className="admin-main"><header className="admin-topbar"><div><span>CONTENT MANAGEMENT</span><strong>Blog desk</strong></div><NavLink to="/blogs" target="_blank">View public journal ↗</NavLink></header><div className="admin-content"><Outlet /></div></div>
  </div>;
}
