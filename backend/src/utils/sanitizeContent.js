const ALLOWED_NODES = new Set(["doc", "paragraph", "heading", "text", "bulletList", "orderedList", "listItem", "blockquote", "horizontalRule", "hardBreak", "codeBlock", "image", "video"]);
const ALLOWED_MARKS = new Set(["bold", "italic", "underline", "strike", "code", "link"]);

function invalid(message) { const error = new Error(message); error.status = 400; throw error; }

function safeWebUrl(value) {
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol); }
  catch { return false; }
}

export function isUploadedVideoUrl(value, mediaBaseUrl = "") {
  if (typeof value !== "string") return false;
  if (/^\/uploads\/[A-Za-z0-9_.-]+$/.test(value)) return true;
  if (!mediaBaseUrl) return false;
  try {
    const url = new URL(value);
    const base = new URL(mediaBaseUrl);
    return url.protocol === "https:" && url.origin === base.origin && /^\/uploads\/[A-Za-z0-9_.-]+$/.test(url.pathname);
  } catch { return false; }
}

export function safeVideoUrl(value, mediaBaseUrl = "") {
  if (typeof value !== "string") return false;
  if (isUploadedVideoUrl(value, mediaBaseUrl)) return true;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) return /^[\w-]{11}$/.test(url.searchParams.get("v") || "") || /^\/embed\/[\w-]{11}$/.test(url.pathname);
    if (url.hostname === "youtu.be") return /^[\w-]{11}$/.test(url.pathname.slice(1));
    if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(url.hostname)) return /(?:\/video)?\/\d+\/?$/.test(url.pathname);
  } catch { return false; }
  return false;
}

function sanitizeUrl(value, { video = false, mediaBaseUrl = "" } = {}) {
  if (typeof value !== "string" || value.length > 2048) invalid("A media or link URL is invalid.");
  if (video) {
    if (!safeVideoUrl(value, mediaBaseUrl)) invalid("Videos must use an uploaded MP4/WebM file or a supported YouTube/Vimeo URL.");
    return value.trim();
  }
  if (/^\/uploads\/[A-Za-z0-9_.-]+$/.test(value)) return value;
  if (!safeWebUrl(value)) invalid("Media URLs must use HTTP or HTTPS.");
  return value.trim();
}

export function sanitizeContent(document, { mediaBaseUrl = "" } = {}) {
  if (!document || typeof document !== "object" || document.type !== "doc") invalid("Article content must be a structured editor document.");
  let nodeCount = 0;
  const visit = (node, depth = 0) => {
    nodeCount += 1;
    if (nodeCount > 2000 || depth > 30) invalid("Article content is too large or deeply nested.");
    if (!node || typeof node !== "object" || Array.isArray(node) || !ALLOWED_NODES.has(node.type)) invalid("Article content contains an unsupported block.");
    if (node.type === "text") {
      if (typeof node.text !== "string" || node.text.length > 20000) invalid("Article text is invalid or too long.");
      const marks = (node.marks || []).map((mark) => {
        if (!ALLOWED_MARKS.has(mark.type)) invalid("Article text contains unsupported formatting.");
        if (mark.type === "link") {
          const href = mark.attrs?.href;
          if (typeof href !== "string" || href.length > 2048 || !(safeWebUrl(href) || /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(href))) invalid("Links must use HTTP, HTTPS, or a valid email address.");
          return { type: "link", attrs: { href } };
        }
        return { type: mark.type };
      });
      return { type: "text", text: node.text, ...(marks.length ? { marks } : {}) };
    }
    if (node.type === "heading") {
      const level = Number(node.attrs?.level);
      if (![2, 3, 4].includes(level)) invalid("Headings must use H2, H3, or H4.");
      return { type: "heading", attrs: { level }, content: (node.content || []).map((child) => visit(child, depth + 1)) };
    }
    if (node.type === "image") {
      return { type: "image", attrs: { src: sanitizeUrl(node.attrs?.src), alt: String(node.attrs?.alt || "").slice(0, 300), title: String(node.attrs?.title || "").slice(0, 300) } };
    }
    if (node.type === "video") {
      const mimeType = ["video/mp4", "video/webm"].includes(node.attrs?.mimeType) ? node.attrs.mimeType : "";
      return { type: "video", attrs: { src: sanitizeUrl(node.attrs?.src, { video: true, mediaBaseUrl }), title: String(node.attrs?.title || "").slice(0, 300), mimeType } };
    }
    if (node.type === "hardBreak") return { type: "hardBreak" };
    if (node.type === "doc" || ["paragraph", "bulletList", "orderedList", "listItem", "blockquote", "codeBlock"].includes(node.type)) {
      if (node.type === "doc" && depth !== 0) invalid("Article content contains a nested document.");
      return { type: node.type, ...(node.type === "codeBlock" && node.attrs?.language ? { attrs: { language: String(node.attrs.language).slice(0, 40) } } : {}), ...(node.content ? { content: node.content.map((child) => visit(child, depth + 1)) } : {}) };
    }
    return { type: "horizontalRule" };
  };
  return visit(document);
}

export { sanitizeUrl };
