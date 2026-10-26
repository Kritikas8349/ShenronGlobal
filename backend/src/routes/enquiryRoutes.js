import { Router } from "express";
import { createPublicEnquiry, listAdminEnquiries, sendAdminEnquiryReply, updateAdminEnquiry } from "../controllers/enquiryController.js";
import { requireAdmin, requireSameOrigin } from "../middleware/authMiddleware.js";
import { enquiryEmailLimiter, enquiryLimiter } from "../middleware/rateLimitMiddleware.js";

export function publicEnquiryRoutes() {
  const router = Router();
  router.post("/", enquiryLimiter, createPublicEnquiry);
  return router;
}

export function adminEnquiryRoutes(env, mailer) {
  const router = Router();
  router.use(requireAdmin(env), requireSameOrigin(env), (_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });
  router.get("/mail-status", (_req, res) => res.json({ configured: mailer.configured, fromEmail: mailer.fromEmail }));
  router.get("/", listAdminEnquiries);
  router.patch("/:id", updateAdminEnquiry);
  router.post("/:id/reply", enquiryEmailLimiter, sendAdminEnquiryReply(mailer));
  return router;
}
