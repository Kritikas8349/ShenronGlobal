import path from "node:path";
import { mkdir, writeFile, rm } from "node:fs/promises";

let s3ClientPromise;
async function getS3Client(env) {
  s3ClientPromise ||= import("@aws-sdk/client-s3").then(({ S3Client }) => new S3Client({
    region: env.s3Region,
    ...(env.s3Endpoint ? { endpoint: env.s3Endpoint, forcePathStyle: true } : {}),
    ...(env.s3AccessKeyId && env.s3SecretAccessKey ? { credentials: { accessKeyId: env.s3AccessKeyId, secretAccessKey: env.s3SecretAccessKey } } : {}),
  }));
  return s3ClientPromise;
}

export async function saveUpload({ env, filename, mimeType, buffer }) {
  if (env.storageProvider === "s3") {
    const { PutObjectCommand } = await import("@aws-sdk/client-s3");
    const client = await getS3Client(env);
    await client.send(new PutObjectCommand({ Bucket: env.s3Bucket, Key: `uploads/${filename}`, Body: buffer, ContentType: mimeType, CacheControl: "public, max-age=31536000, immutable" }));
  } else {
    await mkdir(env.uploadDir, { recursive: true });
    await writeFile(path.join(env.uploadDir, filename), buffer, { flag: "wx", mode: 0o640 });
  }
  return `${env.mediaBaseUrl}/uploads/${filename}`;
}

export async function deleteUpload(url, env) {
  const filename = uploadFilename(url, env);
  if (!filename) return;
  if (env.storageProvider === "s3") {
    const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");
    const client = await getS3Client(env);
    await client.send(new DeleteObjectCommand({ Bucket: env.s3Bucket, Key: `uploads/${filename}` }));
    return;
  }
  const root = path.resolve(env.uploadDir);
  const target = path.resolve(root, filename);
  if (target.startsWith(`${root}${path.sep}`)) await rm(target, { force: true });
}

export function uploadFilename(url, env) {
  if (typeof url !== "string") return null;
  let pathname = url;
  if (env.mediaBaseUrl) {
    try { const parsed = new URL(url); const base = new URL(env.mediaBaseUrl); if (parsed.origin !== base.origin) return null; pathname = parsed.pathname; }
    catch { return null; }
  }
  const match = pathname.match(/^\/uploads\/([A-Za-z0-9_.-]+)$/);
  return match?.[1] || null;
}
