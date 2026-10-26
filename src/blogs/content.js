import { API_BASE_URL } from "../lib/api";

export const BLOG_CATEGORIES = ["Crypto Trading", "Forex Trading", "Market Education"];

export function resolveMediaUrl(media) {
  const value = typeof media === "string" ? media : media?.url;
  if (typeof value !== "string" || !value.trim()) return "";
  const url = value.trim();
  if (/^https?:\/\//i.test(url) || url.startsWith("//")) return url;
  if (typeof window === "undefined") return url;

  try {
    const apiOrigin = new URL(API_BASE_URL, window.location.origin).origin;
    const relativePath = url.startsWith("/") ? url : `/${url}`;
    return new URL(relativePath, apiOrigin).href;
  } catch {
    return url;
  }
}

export function normalizeMedia(media) {
  if (typeof media === "string") return { url: media, alt: "" };
  return media && typeof media === "object" ? media : null;
}

export function slugify(value = "") {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function plainTextFromContent(node) {
  if (!node) return "";
  if (node.type === "text") return node.text || "";
  return (node.content || []).map(plainTextFromContent).join(" ");
}

export function headingsFromContent(node, result = [], counts = new Map()) {
  if (!node) return result;
  if (node.type === "heading") {
    const text = plainTextFromContent(node).trim();
    if (text) {
      const baseId = slugify(text) || "section";
      const count = (counts.get(baseId) || 0) + 1;
      counts.set(baseId, count);
      result.push({ level: node.attrs?.level || 2, text, id: count > 1 ? `${baseId}-${count}` : baseId });
    }
  }
  (node.content || []).forEach((child) => headingsFromContent(child, result, counts));
  return result;
}

export function safeVideoSource(src = "", mimeType = "") {
  if (src.startsWith("/uploads/")) return { type: "file", src: resolveMediaUrl(src) };
  try {
    const url = new URL(src);
    if (url.protocol !== "https:") return null;
    if (["video/mp4", "video/webm"].includes(mimeType) && /^\/uploads\/[A-Za-z0-9_.-]+$/.test(url.pathname)) return { type: "file", src: url.href };
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
      const id = url.searchParams.get("v");
      if (id && /^[\w-]{11}$/.test(id)) return { type: "embed", src: `https://www.youtube-nocookie.com/embed/${id}` };
      const match = url.pathname.match(/^\/embed\/([\w-]{11})$/);
      if (match) return { type: "embed", src: `https://www.youtube-nocookie.com/embed/${match[1]}` };
    }
    if (url.hostname === "youtu.be") {
      const id = url.pathname.slice(1);
      if (/^[\w-]{11}$/.test(id)) return { type: "embed", src: `https://www.youtube-nocookie.com/embed/${id}` };
    }
    if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(url.hostname)) {
      const match = url.pathname.match(/(?:\/video)?\/(\d+)\/?$/);
      if (match) return { type: "embed", src: `https://player.vimeo.com/video/${match[1]}` };
    }
  } catch {
    return null;
  }
  return null;
}

export function formatBlogDate(value) {
  if (!value) return "Unpublished";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unpublished";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(date);
}
