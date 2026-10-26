import "dotenv/config";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { loadEnv } from "../src/config/env.js";

const env = loadEnv();
let failed = false;
const mongoHostname = new URL(env.mongoUri).hostname.toLowerCase();
const localMongo = ["localhost", "127.0.0.1", "::1"].includes(mongoHostname);
console.log(`MongoDB target: ${localMongo ? "local" : "remote"} database`);

try {
  await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 });
  console.log("MongoDB connection: OK");
} catch (error) {
  failed = true;
  const causes = [...(error.reason?.servers?.values?.() || [])]
    .map((server) => server.error?.cause?.code || server.error?.code || server.error?.name)
    .filter(Boolean);
  console.error("MongoDB connection: FAILED");
  console.error(`MongoDB error: ${causes.join(", ") || error.name}`);
} finally {
  await mongoose.disconnect().catch(() => {});
}

if (!env.smtpConfigured) {
  failed = true;
  console.error("SMTP connection: NOT CONFIGURED");
  console.error("Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD, and SMTP_FROM_EMAIL in backend/.env.");
} else {
  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    requireTLS: !env.smtpSecure,
    auth: { user: env.smtpUser, pass: env.smtpPassword },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
  try {
    await transporter.verify();
    console.log(`SMTP connection: OK (${env.smtpFromEmail})`);
  } catch (error) {
    failed = true;
    console.error("SMTP connection: FAILED");
    console.error(`SMTP error: ${error.code || error.name || "unknown"}${error.responseCode ? ` (${error.responseCode})` : ""}`);
  } finally {
    transporter.close();
  }
}

process.exitCode = failed ? 1 : 0;
