import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { publicBlogRoutes } from "./routes/publicBlogRoutes.js";
import { adminEnquiryRoutes, publicEnquiryRoutes } from "./routes/enquiryRoutes.js";
import { adminBlogRoutes } from "./routes/adminBlogRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { errorMiddleware, notFoundMiddleware } from "./middleware/errorMiddleware.js";
import { publicReadLimiter } from "./middleware/rateLimitMiddleware.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { createSitemap } from "./services/blogService.js";
import { createEnquiryMailer } from "./services/enquiryMailer.js";
import { renderBlogDocument, renderMissingBlogDocument } from "./services/seoRenderService.js";
import { Blog } from "./models/Blog.js";

export function createApp(env) {
  const app = express();
  if (env.nodeEnv === "production") app.set("trust proxy", 1);
  app.disable("x-powered-by");
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: { directives: {
      "default-src": ["'self'"],
      "base-uri": ["'self'"],
      "object-src": ["'none'"],
      "script-src": ["'self'"],
      "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
      "img-src": ["'self'", "data:", "blob:", "https:"],
      "media-src": ["'self'", "blob:", "https:"],
      "connect-src": ["'self'", "https:"],
      "frame-src": ["'self'", "https://www.youtube-nocookie.com", "https://player.vimeo.com"],
      "frame-ancestors": ["'self'"],
    } },
  }));
  app.use(cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || env.clientOrigins.includes(origin.replace(/\/$/, ""))) return callback(null, true);
      const error = new Error("Origin is not allowed by CORS.");
      error.status = 403;
      return callback(error);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
  }));
  app.use(express.json({ limit: "2mb" }));
  app.use(cookieParser());
  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/sitemap.xml", asyncHandler(async (req, res) => {
    const baseUrl = env.publicSiteUrl || `${req.protocol}://${req.get("host")}`;
    res.type("application/xml").send(await createSitemap(baseUrl));
  }));
  app.get("/api/sitemap.xml", asyncHandler(async (req, res) => {
    const baseUrl = env.publicSiteUrl || `${req.protocol}://${req.get("host")}`;
    res.type("application/xml").send(await createSitemap(baseUrl));
  }));
  app.use("/uploads", express.static(env.uploadDir, { dotfiles: "deny", index: false, immutable: true, maxAge: "1y", setHeaders(res) { res.setHeader("X-Content-Type-Options", "nosniff"); } }));
  const enquiryMailer = createEnquiryMailer(env);
  app.use("/api/enquiries/admin", adminEnquiryRoutes(env, enquiryMailer));
  app.use("/api/enquiries", publicEnquiryRoutes());
  app.use("/api/blogs/admin", adminBlogRoutes(env));
  app.use("/api/blogs", publicReadLimiter, publicBlogRoutes());
  app.use("/api/auth/admin", authRoutes(env, enquiryMailer));
  const frontendIndex = env.frontendDistDir ? path.join(env.frontendDistDir, "index.html") : "";
  if (frontendIndex && !existsSync(frontendIndex)) throw new Error("FRONTEND_DIST_DIR must contain the built frontend index.html.");
  if (frontendIndex && existsSync(frontendIndex)) {
    app.get("/blogs/:slug", asyncHandler(async (req, res) => {
      const template = await readFile(frontendIndex, "utf8");
      const baseUrl = env.publicSiteUrl || `${req.protocol}://${req.get("host")}`;
      const blog = await Blog.findOne({ slug: req.params.slug, status: "published" }).lean();
      res.setHeader("Cache-Control", "no-store");
      if (!blog) return res.status(404).type("html").send(renderMissingBlogDocument(template));
      return res.type("html").send(renderBlogDocument(template, blog, baseUrl, env.mediaBaseUrl));
    }));
    app.use(express.static(env.frontendDistDir, { index: false }));
    app.use((req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD") return next();
      if (req.path === "/api" || req.path.startsWith("/api/") || req.path === "/uploads" || req.path.startsWith("/uploads/") || path.extname(req.path)) return next();
      return res.sendFile(frontendIndex, (error) => { if (error) next(error); });
    });
  }
  app.use(notFoundMiddleware);
  app.use(errorMiddleware(env));
  mkdir(env.uploadDir, { recursive: true }).catch((error) => console.error("Could not prepare upload directory:", error.message));
  return app;
}
