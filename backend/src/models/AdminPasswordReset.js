import mongoose from "mongoose";

const adminPasswordResetSchema = new mongoose.Schema({
  _id: { type: String, default: "primary-admin" },
  tokenHash: { type: String, required: true, select: false },
  expiresAt: { type: Date, required: true, expires: 0 },
}, { timestamps: true, versionKey: false });

export const AdminPasswordReset = mongoose.models.AdminPasswordReset || mongoose.model("AdminPasswordReset", adminPasswordResetSchema);
