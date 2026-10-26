import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  url: { type: String, trim: true, maxlength: 2048 },
  alt: { type: String, trim: true, maxlength: 300, default: "" },
  title: { type: String, trim: true, maxlength: 300, default: "" },
  mimeType: { type: String, trim: true, maxlength: 100, default: "" },
  size: { type: Number, min: 0, default: 0 },
}, { _id: false });

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true, maxlength: 300 },
  answer: { type: String, required: true, trim: true, maxlength: 3000 },
}, { _id: false });

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, maxlength: 180 },
  description: { type: String, required: true, trim: true, maxlength: 320 },
  category: { type: String, required: true, enum: ["Crypto Trading", "Forex Trading", "Market Education"] },
  coverImage: { type: mediaSchema, default: null },
  featuredVideo: { type: mediaSchema, default: null },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  author: { type: String, trim: true, maxlength: 100, default: "Shenron Global" },
  status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  seoTitle: { type: String, trim: true, maxlength: 180, default: "" },
  seoDescription: { type: String, trim: true, maxlength: 320, default: "" },
  seoKeywords: { type: [String], default: [] },
  faqs: { type: [faqSchema], default: [] },
  readingTime: { type: Number, min: 1, default: 1 },
  publishedAt: { type: Date, default: null },
}, { timestamps: true, minimize: false });

blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1, status: 1, publishedAt: -1 });
blogSchema.index({ title: "text", description: "text" });

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
