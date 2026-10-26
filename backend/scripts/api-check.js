import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { validateBlogPayload } from "../src/middleware/validateBlog.js";

const testPassword = "Local-only-test-password-4938!";
const databaseName = `shenron_blog_check_${Date.now()}`;
const uploadDir = await mkdtemp(path.join(os.tmpdir(), "shenron-blog-check-"));
const frontendDistDir = await mkdtemp(path.join(os.tmpdir(), "shenron-blog-frontend-check-"));
await writeFile(path.join(frontendDistDir, "index.html"), '<!doctype html><html><head><title>Shenron Global</title><meta name="description" content="Default"></head><body><div id="root"></div></body></html>');
Object.assign(process.env, {
  NODE_ENV: "test",
  PORT: "5000",
  MONGODB_URI: `mongodb://127.0.0.1:27017/${databaseName}`,
  CLIENT_ORIGIN: "http://localhost:5173",
  PUBLIC_SITE_URL: "https://shenron-check.example",
  ADMIN_EMAIL: "cms-check@example.test",
  ADMIN_PASSWORD_HASH: await bcrypt.hash(testPassword, 4),
  JWT_SECRET: randomBytes(40).toString("hex"),
  JWT_COOKIE_NAME: "sg_admin_check",
  COOKIE_SAME_SITE: "lax",
  UPLOAD_DIR: uploadDir,
  FRONTEND_DIST_DIR: frontendDistDir,
  STORAGE_PROVIDER: "local",
  MAX_IMAGE_SIZE: String(2 * 1024 * 1024),
  MAX_VIDEO_SIZE: String(5 * 1024 * 1024),
});

let server;
let passed = 0;
try {
  const [{ loadEnv }, { connectDatabase }, { createApp }, { Blog }] = await Promise.all([
    import("../src/config/env.js"), import("../src/config/database.js"), import("../src/app.js"), import("../src/models/Blog.js"),
  ]);
  const env = loadEnv();
  await connectDatabase(env.mongoUri);
  await Blog.init();
  const app = createApp(env);
  server = app.listen(0);
  await new Promise((resolve, reject) => { server.once("listening", resolve); server.once("error", reject); });
  const origin = `http://127.0.0.1:${server.address().port}`;
  const originHeader = { Origin: "http://localhost:5173" };
  const call = async (route, { method = "GET", body, cookie = "", headers = {} } = {}) => {
    const requestHeaders = { ...originHeader, ...headers };
    if (cookie) requestHeaders.Cookie = cookie;
    let requestBody = body;
    if (body && !(body instanceof FormData)) { requestHeaders["Content-Type"] = "application/json"; requestBody = JSON.stringify(body); }
    const response = await fetch(`${origin}${route}`, { method, headers: requestHeaders, body: requestBody });
    const payload = response.headers.get("content-type")?.includes("json")
      ? await response.json().catch(() => null)
      : await response.text().catch(() => "");
    return { response, payload };
  };
  const check = (name, condition) => { assert.ok(condition, name); passed += 1; console.log(`PASS ${name}`); };

  const cdnVideoUrl = "https://media.example.test/uploads/asset.mp4";
  const objectStoragePayload = validateBlogPayload({
    title: "Object storage media check", slug: "object-storage-media-check", description: "Check configured object storage references.", category: "Market Education",
    featuredVideo: { url: cdnVideoUrl, mimeType: "video/mp4" }, status: "draft",
    content: { type: "doc", content: [{ type: "video", attrs: { src: cdnVideoUrl, title: "Stored video", mimeType: "video/mp4" } }] },
  }, null, { mediaBaseUrl: "https://media.example.test" });
  let rejectsUnconfiguredMediaHost = false;
  try { validateBlogPayload({ title: "Bad video", slug: "bad-video", description: "Reject an unconfigured upload host.", category: "Market Education", content: { type: "doc", content: [{ type: "video", attrs: { src: "https://elsewhere.example/uploads/asset.mp4", mimeType: "video/mp4" } }] } }, null, { mediaBaseUrl: "https://media.example.test" }); }
  catch { rejectsUnconfiguredMediaHost = true; }
  check("configured object storage videos are accepted and unconfigured media hosts are rejected", objectStoragePayload.content.content[0].attrs.mimeType === "video/mp4" && rejectsUnconfiguredMediaHost);

  const unauthorized = await call("/api/blogs/admin");
  check("admin CRUD is protected", unauthorized.response.status === 401);
  const deniedOrigin = await call("/api/auth/admin/login", { method: "POST", body: { email: "cms-check@example.test", password: testPassword }, headers: { Origin: "https://untrusted.example" } });
  check("admin sign-in rejects unconfigured origins", deniedOrigin.response.status === 403);

  const login = await call("/api/auth/admin/login", { method: "POST", body: { email: "cms-check@example.test", password: testPassword } });
  const setCookie = login.response.headers.get("set-cookie") || "";
  const cookie = setCookie.split(";")[0];
  check("admin login issues an HttpOnly session", login.response.status === 200 && Boolean(cookie) && /HttpOnly/i.test(setCookie));

  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/d2sAAAAASUVORK5CYII=", "base64");
  const uploadForm = new FormData();
  uploadForm.append("file", new Blob([png], { type: "image/png" }), "cover.png");
  const upload = await call("/api/blogs/admin/upload", { method: "POST", body: uploadForm, cookie });
  check("authorized image upload validates and stores media", upload.response.status === 201 && upload.payload.media.url.startsWith("/uploads/") && upload.payload.media.mimeType === "image/png");
  const uploadedImage = await fetch(`${origin}${upload.payload.media.url}`);
  check("uploaded cover file is served from its saved relative media URL", uploadedImage.status === 200 && uploadedImage.headers.get("content-type") === "image/png");
  const mp4 = Buffer.from([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]);
  const videoForm = new FormData();
  videoForm.append("file", new Blob([mp4], { type: "video/mp4" }), "overview.mp4");
  const videoUpload = await call("/api/blogs/admin/upload", { method: "POST", body: videoForm, cookie });
  check("authorized video uploads validate file signatures and retain MIME metadata", videoUpload.response.status === 201 && videoUpload.payload.media.mimeType === "video/mp4");

  const article = {
    title: "Market Volatility Desk Note",
    slug: "market-volatility-desk-note",
    description: "A practical look at market volatility and risk controls.",
    category: "Market Education",
    coverImage: { ...upload.payload.media, alt: "Market volatility chart" },
    featuredVideo: { url: "https://youtu.be/dQw4w9WgXcQ", title: "Volatility overview" },
    author: "Shenron Global",
    status: "draft",
    seoTitle: "Market Volatility | Shenron Global",
    seoDescription: "Understand volatility and risk controls.",
    seoKeywords: ["volatility", "risk"],
    faqs: [{ question: "What is volatility?", answer: "A measure of how much prices change." }],
    content: { type: "doc", content: [
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Why markets move" }] },
      { type: "paragraph", content: [{ type: "text", text: "Markets move as conditions change." }] },
      { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "A measured response" }] },
      { type: "image", attrs: { src: upload.payload.media.url, alt: "A small market chart", title: "Market chart" } },
      { type: "video", attrs: { src: videoUpload.payload.media.url, title: "Market video", mimeType: videoUpload.payload.media.mimeType } },
      { type: "orderedList", content: [{ type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Plan the risk." }] }] }] },
    ] },
  };
  const created = await call("/api/blogs/admin", { method: "POST", body: article, cookie });
  check("draft create persists structured article data", created.response.status === 201 && created.payload.blog.status === "draft" && created.payload.blog.readingTime >= 1);
  const id = created.payload.blog._id;

  const draftListing = await call("/api/blogs?page=1&limit=10", { cookie });
  const draftRead = await call(`/api/blogs/${article.slug}`);
  check("drafts never appear in public listing or slug reads", !draftListing.payload.blogs.some((blog) => blog.slug === article.slug) && draftRead.response.status === 404);

  const adminRead = await call(`/api/blogs/admin/${id}`, { cookie });
  check("admin can read draft content and its saved cover image", adminRead.response.status === 200 && adminRead.payload.blog.content.content[0].type === "heading" && adminRead.payload.blog.coverImage.url === upload.payload.media.url);
  check("uploaded inline image and video references persist in article content", adminRead.payload.blog.content.content[3].attrs.src === upload.payload.media.url && adminRead.payload.blog.content.content[4].attrs.src === videoUpload.payload.media.url);

  const duplicate = await call("/api/blogs/admin", { method: "POST", body: { ...article, title: "Duplicate slug check" }, cookie });
  check("duplicate slugs return conflict", duplicate.response.status === 409);

  const update = await call(`/api/blogs/admin/${id}`, { method: "PUT", body: { ...article, title: "Updated Market Volatility Note", content: { type: "doc", content: [
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Updated first section" }] },
    { type: "paragraph", content: [{ type: "text", text: "Updated text. <script>alert(1)</script>" }] },
  ] } }, cookie });
  check("update changes the existing record and preserves its slug and cover image", update.response.status === 200 && update.payload.blog._id === id && update.payload.blog.slug === article.slug && update.payload.blog.title === "Updated Market Volatility Note" && update.payload.blog.coverImage.url === upload.payload.media.url);
  check("saved editor block order is retained", update.payload.blog.content.content[0].type === "heading" && update.payload.blog.content.content[1].type === "paragraph");

  const publish = await call(`/api/blogs/admin/${id}/status`, { method: "PATCH", body: { status: "published" }, cookie });
  const publicList = await call("/api/blogs?search=volatility&category=Market%20Education&page=1&limit=5");
  const publicRead = await call(`/api/blogs/${article.slug}`);
  const listedArticle = publicList.payload.blogs.find((blog) => blog.slug === article.slug);
  check("publish exposes the article and the same saved cover image in list and detail APIs", publish.response.status === 200 && listedArticle?.coverImage?.url === upload.payload.media.url && publicRead.response.status === 200 && publicRead.payload.blog.coverImage.url === upload.payload.media.url);
  check("public article returns authored blocks and FAQ", publicRead.payload.blog.content.content[0].type === "heading" && publicRead.payload.blog.faqs[0].question === "What is volatility?");

  const renderedPage = await call(`/blogs/${article.slug}`);
  check("published article has server-rendered cover image, SEO metadata, and readable content", renderedPage.response.status === 200 && renderedPage.payload.includes(`<title>${article.seoTitle}</title>`) && renderedPage.payload.includes(`https://shenron-check.example/blogs/${article.slug}`) && renderedPage.payload.includes(`src="${upload.payload.media.url}"`) && renderedPage.payload.includes("Updated first section") && renderedPage.payload.includes("application/ld+json"));
  check("server-rendered article escapes editor text instead of injecting HTML", renderedPage.payload.includes("&lt;script&gt;alert(1)&lt;/script&gt;") && !renderedPage.payload.includes("<script>alert(1)</script>"));
  const adminSpaRoute = await call("/admin/blogs");
  check("built frontend paths support direct navigation and refresh", adminSpaRoute.response.status === 200 && adminSpaRoute.payload.includes('<div id="root"></div>'));

  const sitemap = await call("/sitemap.xml");
  check("published article appears in sitemap", sitemap.response.status === 200 && sitemap.payload.includes(article.slug));

  const unpublish = await call(`/api/blogs/admin/${id}/status`, { method: "PATCH", body: { status: "draft" }, cookie });
  const hiddenAgain = await call(`/api/blogs/${article.slug}`);
  check("unpublish immediately removes the public slug", unpublish.response.status === 200 && hiddenAgain.response.status === 404);
  const hiddenRenderedPage = await call(`/blogs/${article.slug}`);
  check("unpublished server-rendered article returns 404 and noindex", hiddenRenderedPage.response.status === 404 && hiddenRenderedPage.payload.includes('name="robots" content="noindex,follow"'));

  const deleted = await call(`/api/blogs/admin/${id}`, { method: "DELETE", cookie });
  const deletedRead = await call(`/api/blogs/admin/${id}`, { cookie });
  let uploadRemoved = false;
  try { await readFile(path.join(uploadDir, path.basename(upload.payload.media.url))); }
  catch { uploadRemoved = true; }
  check("delete removes the record and its unreferenced uploaded media", deleted.response.status === 200 && deletedRead.response.status === 404 && uploadRemoved);

  const invalidUploadForm = new FormData();
  invalidUploadForm.append("file", new Blob(["not an image"], { type: "image/png" }), "bad.png");
  const invalidUpload = await call("/api/blogs/admin/upload", { method: "POST", body: invalidUploadForm, cookie });
  check("upload rejects files whose bytes do not match their MIME type", invalidUpload.response.status === 400);

  const logout = await call("/api/auth/admin/logout", { method: "POST", cookie });
  const afterLogout = await call("/api/blogs/admin");
  check("logout revokes the admin browser session", logout.response.status === 200 && afterLogout.response.status === 401);
  console.log(`API checks passed: ${passed}`);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  if (server) await new Promise((resolve) => server.close(resolve));
  await mongoose.connection.dropDatabase().catch(() => {});
  await mongoose.disconnect().catch(() => {});
  await rm(uploadDir, { recursive: true, force: true }).catch(() => {});
  await rm(frontendDistDir, { recursive: true, force: true }).catch(() => {});
}
