import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false, message: { message: "Too many sign-in attempts. Wait 15 minutes and try again." } });
export const uploadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: "draft-8", legacyHeaders: false, message: { message: "Upload limit reached. Please wait before uploading again." } });
export const enquiryLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false, message: { message: "Too many enquiries were submitted from this connection. Please try again later." } });
export const enquiryEmailLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: "draft-8", legacyHeaders: false, message: { message: "Email reply limit reached. Please wait before sending more replies." } });
export const publicReadLimiter = rateLimit({ windowMs: 10 * 60 * 1000, limit: 180, standardHeaders: "draft-8", legacyHeaders: false, skip: (req) => req.path.startsWith("/admin"), message: { message: "Too many requests. Please try again shortly." } });
