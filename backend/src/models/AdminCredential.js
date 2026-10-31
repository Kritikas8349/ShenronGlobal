import mongoose from "mongoose";

const adminCredentialSchema = new mongoose.Schema({
  _id: { type: String, default: "primary-admin" },
  email: { type: String, required: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true, select: false },
  sessionVersion: { type: Number, default: 0 },
}, { timestamps: true, versionKey: false });

export const AdminCredential = mongoose.models.AdminCredential || mongoose.model("AdminCredential", adminCredentialSchema);
