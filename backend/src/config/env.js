import "dotenv/config";
import path from "node:path";

function integer(name, fallback) {
  const value = Number(process.env[name] || fallback);
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${name} must be a positive integer.`);
  return value;
}

export function loadEnv() {
  const required = ["MONGODB_URI", "ADMIN_EMAIL", "ADMIN_PASSWORD_HASH", "JWT_SECRET"];
  const missing = required.filter((name) => !process.env[name]?.trim());
  if (missing.length) throw new Error(`Missing required environment values: ${missing.join(", ")}`);
  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret.length < 32) throw new Error("JWT_SECRET must contain at least 32 characters.");
  if (!/^\$2[aby]\$\d\d\$/.test(process.env.ADMIN_PASSWORD_HASH)) throw new Error("ADMIN_PASSWORD_HASH must be a bcrypt hash. Generate one with npm run hash-password.");
  const clientOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",").map((origin) => origin.trim().replace(/\/$/, "")).filter(Boolean);
  for (const origin of clientOrigins) {
    let parsedOrigin;
    try { parsedOrigin = new URL(origin); } catch { throw new Error("CLIENT_ORIGIN must contain valid frontend origins."); }
    if (!["http:", "https:"].includes(parsedOrigin.protocol) || parsedOrigin.origin !== origin) throw new Error("CLIENT_ORIGIN entries must be origins without paths, queries, or fragments.");
  }
  let publicSiteUrl = (process.env.PUBLIC_SITE_URL || clientOrigins[0] || "").replace(/\/$/, "");
  if (publicSiteUrl) {
    let parsedPublicUrl;
    try { parsedPublicUrl = new URL(publicSiteUrl); } catch { throw new Error("PUBLIC_SITE_URL must be a valid website origin."); }
    if (!["http:", "https:"].includes(parsedPublicUrl.protocol) || parsedPublicUrl.origin !== publicSiteUrl) throw new Error("PUBLIC_SITE_URL must be an origin without a path, query, or fragment.");
    publicSiteUrl = parsedPublicUrl.origin;
  }
  let mediaBaseUrl = (process.env.MEDIA_BASE_URL || "").trim().replace(/\/$/, "");
  if (mediaBaseUrl) {
    let mediaUrl;
    try { mediaUrl = new URL(mediaBaseUrl); } catch { throw new Error("MEDIA_BASE_URL must be a valid HTTPS origin when configured."); }
    if (mediaUrl.protocol !== "https:" || mediaUrl.pathname !== "/" || mediaUrl.search || mediaUrl.hash) throw new Error("MEDIA_BASE_URL must be an HTTPS origin without a path, query, or fragment.");
    mediaBaseUrl = mediaUrl.origin;
  }
  const storageProvider = (process.env.STORAGE_PROVIDER || "local").trim().toLowerCase();
  if (!["local", "s3"].includes(storageProvider)) throw new Error("STORAGE_PROVIDER must be local or s3.");
  if (storageProvider === "s3" && (!process.env.S3_BUCKET || !process.env.S3_REGION || !mediaBaseUrl)) throw new Error("S3_BUCKET, S3_REGION, and MEDIA_BASE_URL are required when STORAGE_PROVIDER=s3.");
  const cookieSameSite = (process.env.COOKIE_SAME_SITE || "lax").toLowerCase();
  if (!["lax", "strict", "none"].includes(cookieSameSite)) throw new Error("COOKIE_SAME_SITE must be lax, strict, or none.");
  if (cookieSameSite === "none" && process.env.NODE_ENV === "production" && !process.env.COOKIE_SECURE) throw new Error("COOKIE_SECURE=true is required when COOKIE_SAME_SITE=none in production.");
  return {
    nodeEnv: process.env.NODE_ENV || "development",
    port: integer("PORT", 5000),
    mongoUri: process.env.MONGODB_URI,
    clientOrigins,
    publicSiteUrl,
    adminEmail: process.env.ADMIN_EMAIL.trim().toLowerCase(),
    adminPasswordHash: process.env.ADMIN_PASSWORD_HASH,
    jwtSecret,
    jwtCookieName: process.env.JWT_COOKIE_NAME || "sg_admin_session",
    cookieSameSite,
    cookieSecure: process.env.COOKIE_SECURE === "true" || process.env.NODE_ENV === "production",
    uploadDir: path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads")),
    frontendDistDir: process.env.FRONTEND_DIST_DIR?.trim() ? path.resolve(process.env.FRONTEND_DIST_DIR) : "",
    mediaBaseUrl,
    storageProvider,
    s3Bucket: process.env.S3_BUCKET || "",
    s3Region: process.env.S3_REGION || "us-east-1",
    s3Endpoint: process.env.S3_ENDPOINT || "",
    s3AccessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
    maxImageSize: integer("MAX_IMAGE_SIZE", 5 * 1024 * 1024),
    maxVideoSize: integer("MAX_VIDEO_SIZE", 50 * 1024 * 1024),
  };
}
