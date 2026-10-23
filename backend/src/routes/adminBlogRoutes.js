import { Router } from "express";
import { createAdminBlog, deleteAdminBlog, getAdminBlog, listAdminBlogs, updateAdminBlog, updateAdminBlogStatus } from "../controllers/blogController.js";
import { uploadMedia } from "../controllers/uploadController.js";
import { requireAdmin, requireSameOrigin } from "../middleware/authMiddleware.js";
import { createUploadMiddleware } from "../middleware/uploadMiddleware.js";
import { uploadLimiter } from "../middleware/rateLimitMiddleware.js";

export function adminBlogRoutes(env) {
  const router = Router();
  router.use(requireAdmin(env), requireSameOrigin(env), (_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });
  router.get("/", listAdminBlogs);
  router.post("/", createAdminBlog(env));
  router.post("/upload", uploadLimiter, createUploadMiddleware(env), uploadMedia(env));
  router.get("/:id", getAdminBlog);
  router.put("/:id", updateAdminBlog(env));
  router.patch("/:id/status", updateAdminBlogStatus);
  router.delete("/:id", deleteAdminBlog(env));
  return router;
}
