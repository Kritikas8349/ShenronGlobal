import { createSlug } from "../utils/createSlug.js";
import { calculateReadingTime } from "../utils/calculateReadingTime.js";
import { sanitizeContent, sanitizeUrl } from "../utils/sanitizeContent.js";

const categories = new Set(["Crypto Trading", "Forex Trading", "Market Education"]);
function bad(message) { const error = new Error(message); error.status = 400; throw error; }
function text(value, name, max, required = false) {
  if (value == null) { if (required) bad(`${name} is required.`); return ""; }
  if (typeof value !== "string") bad(`${name} must be text.`);
  const result = value.trim();
  if (required && !result) bad(`${name} is required.`);
  if (result.length > max) bad(`${name} must be ${max} characters or fewer.`);
  return result;
}

function media(input, type, env) {
  if (!input) return null;
  if (typeof input === "string") input = { url: input };
  if (!input || typeof input !== "object" || Array.isArray(input)) bad("Media metadata is invalid.");
  const mimeType = text(input.mimeType || "", "Media type", 100);
  const allowedMime = type === "image" ? ["image/jpeg", "image/png", "image/webp", "image/gif"] : ["video/mp4", "video/webm"];
  if (mimeType && !allowedMime.includes(mimeType)) bad(`The ${type} media type is not supported.`);
  const url = sanitizeUrl(input.url, { video: type === "video", mediaBaseUrl: env?.mediaBaseUrl || "" });
  return { url, alt: text(input.alt || "", "Image alt text", 300), title: text(input.title || "", "Media title", 300), mimeType, size: Number.isSafeInteger(input.size) && input.size >= 0 ? input.size : 0 };
}

export function validateBlogPayload(input, current = null, env = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) bad("The article payload is invalid.");
  const pick = (key) => input[key] === undefined && current ? current[key] : input[key];
  const title = text(pick("title"), "Title", 180, true);
  const description = text(pick("description"), "Description", 320, true);
  const category = text(pick("category"), "Category", 40, true);
  if (!categories.has(category)) bad("Choose one of the available article categories.");
  const slug = createSlug(text(input.slug === undefined && current ? current.slug : (input.slug || title), "URL slug", 180, true));
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) bad("URL slug must contain lowercase letters, numbers, and single hyphens.");
  const status = pick("status") || "draft";
  if (!["draft", "published"].includes(status)) bad("Article status must be draft or published.");
  const contentInput = pick("content") || { type: "doc", content: [{ type: "paragraph" }] };
  if (JSON.stringify(contentInput).length > 1_000_000) bad("Article content must be smaller than 1 MB.");
  const content = sanitizeContent(contentInput, { mediaBaseUrl: env.mediaBaseUrl || "" });
  const faqInput = pick("faqs") || [];
  if (!Array.isArray(faqInput) || faqInput.length > 30) bad("FAQ section must contain no more than 30 questions.");
  const faqs = faqInput.map((faq) => ({ question: text(faq?.question, "FAQ question", 300, true), answer: text(faq?.answer, "FAQ answer", 3000, true) }));
  const keywordsInput = pick("seoKeywords") || [];
  const seoKeywords = Array.isArray(keywordsInput) ? keywordsInput : String(keywordsInput).split(",");
  if (seoKeywords.length > 30) bad("Use no more than 30 SEO keywords.");
  return {
    title, slug, description, category,
    coverImage: media(pick("coverImage"), "image", env),
    featuredVideo: media(pick("featuredVideo"), "video", env),
    content,
    author: text(pick("author") || "Shenron Global", "Author", 100),
    status,
    seoTitle: text(pick("seoTitle") || "", "SEO title", 180),
    seoDescription: text(pick("seoDescription") || "", "SEO description", 320),
    seoKeywords: seoKeywords.map((keyword) => text(String(keyword), "SEO keyword", 80)).filter(Boolean),
    faqs,
    readingTime: calculateReadingTime(content),
  };
}
