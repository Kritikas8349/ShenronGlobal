import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuth";
import "./Admin.css";

function ArticleIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 2.75h6.2L15 6.6v10.65H5z" /><path d="M11 2.9v4h4M7.8 10h4.4m-4.4 3h4.4" /></svg>;
}

function PlusIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" /></svg>;
}

function MailIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.8" y="4.5" width="14.4" height="11" rx="2" /><path d="m3.6 6 6.4 5 6.4-5" /></svg>;
}

function SignOutIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 3H4.5v14H8m3-3 4-4-4-4m4 4H7" /></svg>;
}

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const signOut = async () => {
    closeMenu();
    await logout();
    navigate("/admin/login", { replace: true });
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) setMenuOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return <div className="admin-shell">
    <aside ref={sidebarRef} className={`admin-sidebar${menuOpen ? " is-open" : ""}`} aria-label="Admin navigation">
      <div className="admin-brand"><span className="admin-brand-mark">S</span><div><strong>Shenron</strong><small>CONTENT DESK</small></div></div>
      <button className={`admin-menu-toggle${menuOpen ? " is-active" : ""}`} type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="admin-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span /><span /><span />
      </button>
      <nav className="admin-navigation" id="admin-navigation" aria-label="Workspace">
        <div className="admin-nav-label">WORKSPACE</div>
        <NavLink to="/admin/blogs" end aria-label="All articles" className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}><ArticleIcon />All articles</NavLink>
        <NavLink to="/admin/blogs/new" aria-label="New article" className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}><PlusIcon />New article</NavLink>
        <NavLink to="/admin/enquiries" aria-label="Client enquiries" className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}><MailIcon />Enquiries</NavLink>
      </nav>
      <div className="admin-sidebar-foot"><span className="admin-user-dot">{user?.email?.slice(0, 1)?.toUpperCase() || "A"}</span><div className="admin-user-info"><strong>{user?.email}</strong><small>Administrator</small></div><button aria-label="Sign out" title="Sign out" onClick={signOut}><SignOutIcon /></button></div>
    </aside>
    <div className="admin-main">
      <header className="admin-topbar"><div><span>CONTENT MANAGEMENT</span><strong>Blog desk</strong></div><NavLink to="/blogs" target="_blank">View public journal <span aria-hidden="true">↗</span></NavLink></header>
      <div className="admin-content"><Outlet /></div>
    </div>
  </div>;
}
