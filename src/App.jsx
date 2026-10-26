import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { AdminAuthProvider, AdminGuard } from "./admin/AdminAuth";
import AdminLoginPage from "./admin/AdminLoginPage";
import AdminLayout from "./admin/AdminLayout";


const BlogListPage = lazy(() => import("./blogs/BlogListPage"));
const BlogDetailPage = lazy(() => import("./blogs/BlogDetailPage"));
const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/PortfolioM"));
const Contact = lazy(() => import("./pages/Contact"));
const Forex = lazy(() => import("./Subpages/Forex"));
const Comex = lazy(() => import("./Subpages/Comex"));
const Crypto = lazy(() => import("./Subpages/Crypto"));
const AdminBlogsPage = lazy(() => import("./admin/AdminBlogsPage"));
const AdminBlogEditor = lazy(() => import("./admin/AdminBlogEditor"));
const AdminBlogPreview = lazy(() => import("./admin/AdminBlogPreview"));

function AppLoading() {
  return <main className="app-loading" role="status">Loading page…</main>;
}

function AdminRoutes() {
  return <AdminAuthProvider><Routes>
    <Route path="/admin/login" element={<AdminLoginPage />} />
    <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
      <Route index element={<Navigate to="/admin/blogs" replace />} />
      <Route path="blogs" element={<AdminBlogsPage />} />
      <Route path="blogs/new" element={<AdminBlogEditor />} />
      <Route path="blogs/edit/:id" element={<AdminBlogEditor />} />
      <Route path="blogs/preview/:id" element={<AdminBlogPreview />} />
    </Route>
    <Route path="*" element={<Navigate to="/admin/blogs" replace />} />
  </Routes></AdminAuthProvider>;
}

function PublicRoutes() {
  return <><Navbar /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/portfolio" element={<Portfolio />} />
    <Route path="/contact-us" element={<Contact />} />
    <Route path="/services/forex" element={<Forex />} />
    <Route path="/services/comex" element={<Comex />} />
    <Route path="/services/crypto" element={<Crypto />} />
    <Route path="/services/mentorship" element={<Navigate to="/contact-us" replace />} />
    <Route path="/blogs" element={<BlogListPage />} />
    <Route path="/blogs/:slug" element={<BlogDetailPage />} />
    <Route path="/blog" element={<Navigate to="/blogs" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes><Footer /></>;
}

export default function App() {
  const { pathname } = useLocation();
  return <>
    <ScrollToTop />
    <Suspense fallback={<AppLoading />}>
      {pathname === "/admin" || pathname.startsWith("/admin/")
        ? <AdminRoutes />
        : <PublicRoutes />}
    </Suspense>
  </>;
}
 