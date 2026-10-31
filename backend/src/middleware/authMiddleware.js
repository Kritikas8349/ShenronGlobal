import jwt from "jsonwebtoken";
import { AdminCredential } from "../models/AdminCredential.js";

export function requireAdmin(env) {
  return async (req, res, next) => {
    const token = req.cookies?.[env.jwtCookieName];
    if (!token) return res.status(401).json({ message: "Admin sign-in is required." });
    let payload;
    try {
      payload = jwt.verify(token, env.jwtSecret, { issuer: "shenron-global", audience: "shenron-admin" });
    } catch {
      res.clearCookie(env.jwtCookieName, cookieOptions(env));
      return res.status(401).json({ message: "Your admin session has expired. Sign in again." });
    }

    if (payload.role !== "admin" || payload.sub !== env.adminEmail) {
      res.clearCookie(env.jwtCookieName, cookieOptions(env));
      return res.status(401).json({ message: "Your admin session has expired. Sign in again." });
    }

    try {
      const credential = await AdminCredential.findById("primary-admin").select("sessionVersion").lean();
      if (!credential || (payload.sessionVersion || 0) !== (credential.sessionVersion || 0)) {
        res.clearCookie(env.jwtCookieName, cookieOptions(env));
        return res.status(401).json({ message: "Your admin session has expired. Sign in again." });
      }
      req.admin = { email: payload.sub, role: payload.role };
      return next();
    } catch (error) {
      return next(error);
    }
  };
}

export function requireSameOrigin(env) {
  return (req, res, next) => {
    const origin = req.get("origin");
    if (origin && !env.clientOrigins.includes(origin.replace(/\/$/, ""))) return res.status(403).json({ message: "This request origin is not allowed." });
    return next();
  };
}

export function cookieOptions(env) {
  return { httpOnly: true, secure: env.cookieSecure, sameSite: env.cookieSameSite, path: "/api", maxAge: 8 * 60 * 60 * 1000 };
}
