import mongoose from "mongoose";
import { Blog } from "../models/Blog.js";
import { createBlog, updateBlog, updateBlogStatus } from "../services/blogService.js";
import { deleteUpload, uploadFilename } from "../services/uploadService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function parsePage(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function badId(id) { return !mongoose.isValidObjectId(id); }
function notFound(res) { return res.status(404).json({ message: "Article not found." }); }
function normalizeMedia(value) {
  if (typeof value === "string") return { url: value, alt: "" };
  return value && typeof value === "object" ? value : null;
}
function normalizeBlogMedia(blog) {
  return { ...blog, coverImage: normalizeMedia(blog.coverImage), featuredVideo: normalizeMedia(blog.featuredVideo) };
}

export const listPublicBlogs = asyncHandler(async (req, res) => {
  const page = parsePage(req.query.page, 1);
  const limit = Math.min(30, parsePage(req.query.limit, 9));
  const filter = { status: "published" };
  if (typeof req.query.category === "string" && req.query.category.trim()) filter.category = req.query.category.trim();
  if (typeof req.query.search === "string" && req.query.search.trim()) {
    const search = escapeRegExp(req.query.search.trim().slice(0, 100));
    filter.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }, { category: { $regex: search, $options: "i" } }];
  }
  const [blogs, total] = await Promise.all([
    Blog.find(filter).select("title slug description category coverImage author publishedAt readingTime updatedAt").sort({ publishedAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Blog.countDocuments(filter),
  ]);
  res.json({ blogs: blogs.map(normalizeBlogMedia), pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const getPublicBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, status: "published" }).lean();
  if (!blog) return notFound(res);
  const relatedBlogs = await Blog.find({ status: "published", category: blog.category, _id: { $ne: blog._id } }).select("title slug category coverImage publishedAt readingTime").sort({ publishedAt: -1 }).limit(3).lean();
  return res.json({ blog: { ...normalizeBlogMedia(blog), relatedBlogs: relatedBlogs.map(normalizeBlogMedia) } });
});

export const listAdminBlogs = asyncHandler(async (req, res) => {
  const page = parsePage(req.query.page, 1);
  const limit = Math.min(50, parsePage(req.query.limit, 15));
  const filter = {};
  if (["draft", "published"].includes(req.query.status)) filter.status = req.query.status;
  if (["Crypto Trading", "Forex Trading", "Market Education"].includes(req.query.category)) filter.category = req.query.category;
  if (typeof req.query.search === "string" && req.query.search.trim()) {
    const search = escapeRegExp(req.query.search.trim().slice(0, 100));
    filter.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }, { slug: { $regex: search, $options: "i" } }];
  }
  const [blogs, total] = await Promise.all([
    Blog.find(filter).select("title slug description category coverImage status author publishedAt readingTime createdAt updatedAt").sort({ updatedAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Blog.countDocuments(filter),
  ]);
  res.json({ blogs: blogs.map(normalizeBlogMedia), pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const getAdminBlog = asyncHandler(async (req, res) => {
  if (badId(req.params.id)) return res.status(400).json({ message: "The article identifier is invalid." });
  const blog = await Blog.findById(req.params.id).lean();
  return blog ? res.json({ blog: normalizeBlogMedia(blog) }) : notFound(res);
});

export const createAdminBlog = (env) => asyncHandler(async (req, res) => {
  const blog = await createBlog(req.body, env);
  res.status(201).json({ blog });
});

export const updateAdminBlog = (env) => asyncHandler(async (req, res) => {
  if (badId(req.params.id)) return res.status(400).json({ message: "The article identifier is invalid." });
  const blog = await Blog.findById(req.params.id);
  if (!blog) return notFound(res);
  await updateBlog(blog, req.body, env);
  return res.json({ blog });
});

export const updateAdminBlogStatus = asyncHandler(async (req, res) => {
  if (badId(req.params.id)) return res.status(400).json({ message: "The article identifier is invalid." });
  const blog = await Blog.findById(req.params.id);
  if (!blog) return notFound(res);
  await updateBlogStatus(blog, req.body?.status);
  return res.json({ blog });
});

function collectUrls(value, set = new Set()) {
  if (!value) return set;
  if (typeof value === "string") return set;
  if (Array.isArray(value)) { value.forEach((item) => collectUrls(item, set)); return set; }
  if (typeof value === "object") {
    if (typeof value.url === "string") set.add(value.url);
    if (value.type === "image" || value.type === "video") if (typeof value.attrs?.src === "string") set.add(value.attrs.src);
    Object.values(value).forEach((item) => collectUrls(item, set));
  }
  return set;
}

async function cleanUnusedUploads(deletedBlog, env) {
  const urls = collectUrls({ coverImage: deletedBlog.coverImage, featuredVideo: deletedBlog.featuredVideo, content: deletedBlog.content });
  const candidates = [...urls].filter((url) => uploadFilename(url, env));
  if (!candidates.length) return;
  const remaining = await Blog.find({ _id: { $ne: deletedBlog._id } }).select("coverImage featuredVideo content").lean();
  const inUse = new Set(); remaining.forEach((item) => collectUrls(item, inUse));
  for (const candidateUrl of candidates) {
    const basename = uploadFilename(candidateUrl, env);
    const canonicalUrl = env.mediaBaseUrl ? `${env.mediaBaseUrl}/uploads/${basename}` : `/uploads/${basename}`;
    if (!inUse.has(candidateUrl) && !inUse.has(canonicalUrl) && !inUse.has(`/uploads/${basename}`)) await deleteUpload(candidateUrl, env).catch((error) => console.warn("Media cleanup failed:", error.message));
  }
}

export const deleteAdminBlog = (env) => asyncHandler(async (req, res) => {
  if (badId(req.params.id)) return res.status(400).json({ message: "The article identifier is invalid." });
  const blog = await Blog.findById(req.params.id);
  if (!blog) return notFound(res);
  const deleted = blog.toObject();
  await blog.deleteOne();
  await cleanUnusedUploads(deleted, env);
  return res.json({ message: "Article deleted." });
});
