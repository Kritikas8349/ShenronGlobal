import { Router } from "express";
import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cookieOptions, requireAdmin, requireSameOrigin } from "../middleware/authMiddleware.js";
import { AdminCredential } from "../models/AdminCredential.js";
import { AdminPasswordReset } from "../models/AdminPasswordReset.js";
import { loginLimiter, passwordResetLimiter, passwordResetRequestLimiter } from "../middleware/rateLimitMiddleware.js";

const resetTokenLifetimeMs = 15 * 60 * 1000;
const resetRequestMessage = "If this email matches the admin account, a password reset link will arrive shortly.";

function hashResetToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

export function authRoutes(env, mailer) {
  const router = Router();
  router.post("/login", loginLimiter, requireSameOrigin(env), asyncHandler(async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (email.length > 320 || password.length > 256) return res.status(400).json({ message: "Email or password is too long." });
    let credential = await AdminCredential.findById("primary-admin").select("+passwordHash").lean();
    if (!credential && env.adminPasswordHash) {
      credential = await AdminCredential.findOneAndUpdate(
        { _id: "primary-admin" },
        { $setOnInsert: { email: env.adminEmail, passwordHash: env.adminPasswordHash, sessionVersion: 0 } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      ).select("+passwordHash").lean();
    }
    const passwordMatches = credential?.passwordHash
      ? await bcrypt.compare(password || "invalid", credential.passwordHash)
      : false;
    if (email !== env.adminEmail || !passwordMatches) return res.status(401).json({ message: "Email or password is incorrect." });
    const token = jwt.sign({ role: "admin", sessionVersion: credential.sessionVersion || 0 }, env.jwtSecret, { subject: env.adminEmail, issuer: "shenron-global", audience: "shenron-admin", expiresIn: "8h" });
    res.cookie(env.jwtCookieName, token, cookieOptions(env));
    return res.json({ user: { email: env.adminEmail, role: "admin" } });
  }));

  router.post("/forgot-password", passwordResetRequestLimiter, requireSameOrigin(env), asyncHandler(async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    if (email.length <= 320 && email === env.adminEmail && mailer?.configured) {
      const token = randomBytes(32).toString("base64url");
      const tokenHash = hashResetToken(token);
      const expiresAt = new Date(Date.now() + resetTokenLifetimeMs);
      await AdminPasswordReset.findOneAndUpdate(
        { _id: "primary-admin" },
        { $set: { tokenHash, expiresAt } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );

      const resetUrl = new URL("/admin/reset-password", env.publicSiteUrl || env.clientOrigins[0]);
      resetUrl.hash = new URLSearchParams({ token }).toString();
      void mailer.sendAdminPasswordReset(env.adminEmail, resetUrl.toString()).catch(async (error) => {
        await AdminPasswordReset.deleteOne({ _id: "primary-admin", tokenHash }).catch(() => {});
        console.error("Admin password reset email could not be sent.", error.code || error.name || "unknown error");
      });
    }
    return res.status(202).json({ message: resetRequestMessage });
  }));

  router.post("/reset-password", passwordResetLimiter, requireSameOrigin(env), asyncHandler(async (req, res) => {
    const token = typeof req.body?.token === "string" ? req.body.token : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!/^[A-Za-z0-9_-]{43}$/.test(token)) return res.status(400).json({ message: "This password reset link is invalid or has expired." });
    if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({ message: "Choose a password with at least 8 characters and no more than 72 UTF-8 bytes." });
    }

    const tokenHash = hashResetToken(token);
    const reset = await AdminPasswordReset.findOneAndDelete({
      _id: "primary-admin",
      tokenHash,
      expiresAt: { $gt: new Date() },
    });
    if (!reset) return res.status(400).json({ message: "This password reset link is invalid or has expired." });

    const passwordHash = await bcrypt.hash(password, 12);
    await AdminCredential.findOneAndUpdate(
      { _id: "primary-admin" },
      { $set: { email: env.adminEmail, passwordHash }, $inc: { sessionVersion: 1 } },
      { upsert: true, new: true },
    );
    return res.json({ message: "Your password has been reset. Sign in with your new password." });
  }));

  router.get("/me", requireAdmin(env), (req, res) => res.json({ user: req.admin }));
  router.post("/logout", requireSameOrigin(env), (req, res) => {
    res.clearCookie(env.jwtCookieName, cookieOptions(env));
    return res.json({ message: "Signed out." });
  });
  return router;
}
