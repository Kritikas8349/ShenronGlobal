import jwt from "jsonwebtoken";

export function requireAdmin(env) {
  return (req, res, next) => {
    const token = req.cookies?.[env.jwtCookieName];
    if (!token) return res.status(401).json({ message: "Admin sign-in is required." });
    try {
      const payload = jwt.verify(token, env.jwtSecret, { issuer: "shenron-global", audience: "shenron-admin" });
      if (payload.role !== "admin" || payload.sub !== env.adminEmail) throw new Error("Invalid admin token.");
      req.admin = { email: payload.sub, role: payload.role };
      return next();
    } catch {
      res.clearCookie(env.jwtCookieName, cookieOptions(env));
      return res.status(401).json({ message: "Your admin session has expired. Sign in again." });
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
