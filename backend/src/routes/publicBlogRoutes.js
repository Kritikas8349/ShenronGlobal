import { Router } from "express";
import { getPublicBlog, listPublicBlogs } from "../controllers/blogController.js";

export function publicBlogRoutes() {
  const router = Router();
  router.get("/", listPublicBlogs);
  router.get("/:slug", getPublicBlog);
  return router;
}
