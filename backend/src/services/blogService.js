import { Blog } from "../models/Blog.js";
import { validateBlogPayload } from "../middleware/validateBlog.js";

export async function createBlog(input, env) {
  const values = validateBlogPayload(input, null, env);
  if (values.status === "published") values.publishedAt = new Date();
  const blog = await Blog.create(values);
  return blog;
}

export async function updateBlog(blog, input, env) {
  const values = validateBlogPayload(input, blog.toObject(), env);
  values.publishedAt = values.status === "published" && blog.status !== "published" ? new Date() : blog.publishedAt;
  blog.set(values);
  await blog.save();
  return blog;
}

export async function updateBlogStatus(blog, status) {
  if (!["draft", "published"].includes(status)) {
    const error = new Error("Status must be draft or published."); error.status = 400; throw error;
  }
  if (blog.status !== status) {
    blog.status = status;
    if (status === "published") blog.publishedAt = new Date();
    await blog.save();
  }
  return blog;
}

export async function createSitemap(baseUrl) {
  const blogs = await Blog.find({ status: "published" }).select("slug updatedAt").sort({ publishedAt: -1 }).lean();
  const escapedBase = baseUrl.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const pages = [
    `<url><loc>${escapedBase}/blogs</loc></url>`,
    ...blogs.map((blog) => `<url><loc>${escapedBase}/blogs/${encodeURIComponent(blog.slug)}</loc><lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod></url>`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.join("")}</urlset>`;
}
