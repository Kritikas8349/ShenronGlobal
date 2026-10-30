
import { lazy, Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import {
  AdminAuthProvider,
  AdminGuard,
} from "./admin/AdminAuth";
import AdminLoginPage from "./admin/AdminLoginPage";
import AdminLayout from "./admin/AdminLayout";

// Blog Pages
const BlogListPage = lazy(() => import("./blogs/BlogListPage"));
const BlogDetailPage = lazy(() => import("./blogs/BlogDetailPage"));

// Main Pages
const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/PortfolioM"));
const Contact = lazy(() => import("./pages/Contact"));

// Service Pages
const Forex = lazy(() => import("./Subpages/Forex"));
const Comex = lazy(() => import("./Subpages/Comex"));
const Crypto = lazy(() => import("./Subpages/Crypto"));

// Legal Pages
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer"));
const TermsAndConditions = lazy(
  () => import("./pages/legal/TermsAndConditions")
);
const PrivacyPolicy = lazy(
  () => import("./pages/legal/Policy")
);
const RefundPolicy = lazy(
  () => import("./pages/legal/RefundPolicy")
);

// Admin Pages
const AdminBlogsPage = lazy(() => import("./admin/AdminBlogsPage"));
const AdminEnquiriesPage = lazy(
  () => import("./admin/AdminEnquiriesPage")
);
const AdminBlogEditor = lazy(
  () => import("./admin/AdminBlogEditor")
);
const AdminBlogPreview = lazy(
  () => import("./admin/AdminBlogPreview")
);

// Loading Component
function AppLoading() {
  return (
    <main className="app-loading" role="status">
      Loading page...
    </main>
  );
}

// Admin Routes
function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route
          path="/admin/login"
          element={<AdminLoginPage />}
        />

        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route
            index
            element={
              <Navigate to="/admin/blogs" replace />
            }
          />

          <Route
            path="blogs"
            element={<AdminBlogsPage />}
          />

          <Route
            path="enquiries"
            element={<AdminEnquiriesPage />}
          />

          <Route
            path="blogs/new"
            element={<AdminBlogEditor />}
          />

          <Route
            path="blogs/edit/:id"
            element={<AdminBlogEditor />}
          />

          <Route
            path="blogs/preview/:id"
            element={<AdminBlogPreview />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/admin/blogs" replace />}
        />
      </Routes>
    </AdminAuthProvider>
  );
}

// Public Routes
function PublicRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact-us" element={<Contact />} />

        {/* Service Pages */}
        <Route path="/services/forex" element={<Forex />} />
        <Route path="/services/comex" element={<Comex />} />
        <Route path="/services/crypto" element={<Crypto />} />

        <Route
          path="/services/mentorship"
          element={<Navigate to="/contact-us" replace />}
        />

        {/* Blog Pages */}
        <Route path="/blogs" element={<BlogListPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />

        <Route
          path="/blog"
          element={<Navigate to="/blogs" replace />}
        />

        {/* Legal Pages */}
        <Route
          path="/legal/disclaimer"
          element={<Disclaimer />}
        />

        <Route
          path="/legal/terms-and-conditions"
          element={<TermsAndConditions />}
        />

        <Route
          path="/legal/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/legal/refund-policy"
          element={<RefundPolicy />}
        />

        {/* 404 Redirect */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <Footer />
    </>
  );
}

// Main App
export default function App() {
  const { pathname } = useLocation();

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<AppLoading />}>
        {isAdminRoute ? <AdminRoutes /> : <PublicRoutes />}
      </Suspense>
    </>
  );
}
