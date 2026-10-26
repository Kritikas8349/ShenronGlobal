import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  phone: { type: String, trim: true, maxlength: 30, default: "" },
  message: { type: String, required: true, trim: true, maxlength: 3000 },
  source: { type: String, enum: ["Contact page", "Portfolio enquiry popup"], default: "Contact page" },
  status: { type: String, enum: ["new", "in_progress", "resolved"], default: "new" },
  adminNote: { type: String, trim: true, maxlength: 2000, default: "" },
  replyDraft: { type: String, trim: true, maxlength: 4000, default: "" },
  lastReplySentAt: { type: Date, default: null },
  resolvedAt: { type: Date, default: null },
}, { timestamps: true, minimize: false });

enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ createdAt: -1 });

export const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
