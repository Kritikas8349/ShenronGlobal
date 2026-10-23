import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cookieOptions, requireAdmin, requireSameOrigin } from "../middleware/authMiddleware.js";
import { loginLimiter } from "../middleware/rateLimitMiddleware.js";

export function authRoutes(env) {
  const router = Router();
  router.post("/login", loginLimiter, requireSameOrigin(env), asyncHandler(async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (email.length > 320 || password.length > 256) return res.status(400).json({ message: "Email or password is too long." });
    const passwordMatches = await bcrypt.compare(password || "invalid", env.adminPasswordHash);
    if (email !== env.adminEmail || !passwordMatches) return res.status(401).json({ message: "Email or password is incorrect." });
    const token = jwt.sign({ role: "admin" }, env.jwtSecret, { subject: env.adminEmail, issuer: "shenron-global", audience: "shenron-admin", expiresIn: "8h" });
    res.cookie(env.jwtCookieName, token, cookieOptions(env));
    return res.json({ user: { email: env.adminEmail, role: "admin" } });
  }));
  router.get("/me", requireAdmin(env), (req, res) => res.json({ user: req.admin }));
  router.post("/logout", requireSameOrigin(env), (req, res) => {
    res.clearCookie(env.jwtCookieName, cookieOptions(env));
    return res.json({ message: "Signed out." });
  });
  return router;
}
