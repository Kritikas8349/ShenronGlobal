import mongoose from "mongoose";
import { Enquiry } from "../models/Enquiry.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const statuses = new Set(["new", "in_progress", "resolved"]);
const sources = new Set(["Contact page", "Portfolio enquiry popup"]);

function parsePage(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function validationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function validateSubmission(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw validationError("Please complete the enquiry form and try again.");
  if (typeof input.website === "string" && input.website.trim()) return null;

  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const source = typeof input.source === "string" && sources.has(input.source) ? input.source : "Contact page";

  if (name.length < 2 || name.length > 100) throw validationError("Please enter a name between 2 and 100 characters.");
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw validationError("Please enter a valid email address.");
  if (phone.length > 30 || (phone && !/^\+?[0-9\s().-]{7,30}$/.test(phone))) throw validationError("Please enter a valid phone number.");
  if (message.length < 5 || message.length > 3000) throw validationError("Please enter a message between 5 and 3000 characters.");

  return { name, email, phone, message, source };
}

export const createPublicEnquiry = asyncHandler(async (req, res) => {
  const enquiry = validateSubmission(req.body);
  // Honeypot submissions receive the same success response without being stored.
  if (!enquiry) return res.status(201).json({ message: "Your enquiry has been received." });
  await Enquiry.create(enquiry);
  return res.status(201).json({ message: "Your enquiry has been received." });
});

export const listAdminEnquiries = asyncHandler(async (req, res) => {
  const page = parsePage(req.query.page, 1);
  const limit = Math.min(50, parsePage(req.query.limit, 20));
  const filter = {};
  if (statuses.has(req.query.status)) filter.status = req.query.status;
  if (typeof req.query.search === "string" && req.query.search.trim()) {
    const search = escapeRegExp(req.query.search.trim().slice(0, 100));
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } },
    ];
  }
  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Enquiry.countDocuments(filter),
  ]);
  return res.json({ enquiries, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const updateAdminEnquiry = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "The enquiry identifier is invalid." });
  const input = req.body;
  if (!input || typeof input !== "object" || Array.isArray(input)) throw validationError("The enquiry update is invalid.");

  const changes = {};
  if (input.status !== undefined) {
    if (!statuses.has(input.status)) throw validationError("Choose a valid enquiry status.");
    changes.status = input.status;
  }
  for (const field of ["adminNote", "replyDraft"]) {
    if (input[field] === undefined) continue;
    const max = field === "adminNote" ? 2000 : 4000;
    if (typeof input[field] !== "string" || input[field].length > max) throw validationError(`${field === "adminNote" ? "Internal note" : "Reply draft"} must be ${max} characters or fewer.`);
    changes[field] = input[field].trim();
  }
  if (!Object.keys(changes).length) throw validationError("Choose an enquiry update to save.");

  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) return res.status(404).json({ message: "Enquiry not found." });
  Object.assign(enquiry, changes);
  if (changes.status === "resolved") enquiry.resolvedAt = enquiry.resolvedAt || new Date();
  if (changes.status && changes.status !== "resolved") enquiry.resolvedAt = null;
  await enquiry.save();
  return res.json({ enquiry: enquiry.toObject() });
});

export const sendAdminEnquiryReply = (mailer) => asyncHandler(async (req, res) => {
  if (!mailer.configured) {
    const error = new Error("Company email is not configured. Add the SMTP settings to the VPS environment file and restart the service.");
    error.status = 503;
    throw error;
  }
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "The enquiry identifier is invalid." });
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (message.length < 2 || message.length > 4000) throw validationError("Enter an email reply between 2 and 4000 characters.");
  const requestedStatus = req.body?.status;
  if (requestedStatus !== undefined && !statuses.has(requestedStatus)) throw validationError("Choose a valid enquiry status.");

  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) return res.status(404).json({ message: "Enquiry not found." });

  // Persist the draft before delivery so a failed SMTP attempt does not lose it.
  enquiry.replyDraft = message;
  await enquiry.save();
  try {
    await mailer.send(enquiry, message);
  } catch {
    const error = new Error("Email could not be sent. Check the SMTP settings and sender permissions; your reply draft is saved.");
    error.status = 502;
    throw error;
  }

  enquiry.lastReplySentAt = new Date();
  enquiry.status = requestedStatus || (enquiry.status === "new" ? "in_progress" : enquiry.status);
  enquiry.resolvedAt = enquiry.status === "resolved" ? enquiry.resolvedAt || enquiry.lastReplySentAt : null;
  await enquiry.save();
  return res.json({
    message: `Email sent to ${enquiry.email} from ${mailer.fromEmail}.`,
    enquiry: enquiry.toObject(),
  });
});
