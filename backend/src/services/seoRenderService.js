import { sanitizeContent, safeVideoUrl, isUploadedVideoUrl } from "../utils/sanitizeContent.js";
import { createSlug } from "../utils/createSlug.js";

const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function safeImageUrl(value) {
  if (typeof value !== "string") return "";
  if (/^\/uploads\/[A-Za-z0-9_.-]+$/.test(value)) return value;
  try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) ? value : ""; }
  catch { return ""; }
}

function safeEmbedUrl(value, mediaBaseUrl) {
  if (!safeVideoUrl(value, mediaBaseUrl) || isUploadedVideoUrl(value, mediaBaseUrl)) return "";
  const url = new URL(value);
  if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
    const id = url.searchParams.get("v") || url.pathname.match(/^\/embed\/([\w-]{11})$/)?.[1];
    if (id && /^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
  }
  if (url.hostname === "youtu.be" && /^[\w-]{11}$/.test(url.pathname.slice(1))) return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`;
  if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(url.hostname)) {
    const id = url.pathname.match(/(?:\/video)?\/(\d+)\/?$/)?.[1];
    if (id) return `https://player.vimeo.com/video/${id}`;
  }
  return "";
}

function renderMarks(text, marks = []) {
  let result = escapeHtml(text);
  for (const mark of marks) {
    const tag = { bold: "strong", italic: "em", underline: "u", strike: "s", code: "code" }[mark.type];
    if (tag) result = `<${tag}>${result}</${tag}>`;
    if (mark.type === "link") {
      const href = mark.attrs?.href || "";
      const valid = /^https?:\/\//i.test(href) || /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(href);
      if (valid) result = `<a href="${escapeHtml(href)}"${href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${result}</a>`;
    }
  }
  return result;
}

function renderNode(node, mediaBaseUrl, headingCounts = new Map()) {
  const children = (node.content || []).map((child) => renderNode(child, mediaBaseUrl, headingCounts)).join("");
  switch (node.type) {
    case "doc": return children;
    case "text": return renderMarks(node.text || "", node.marks || []);
    case "paragraph": return `<p>${children || "<br>"}</p>`;
    case "heading": {
      const level = Number(node.attrs?.level);
      const text = (node.content || []).map((child) => child.text || "").join("");
      const baseId = createSlug(text) || "section";
      const count = (headingCounts.get(baseId) || 0) + 1;
      headingCounts.set(baseId, count);
      const id = count > 1 ? `${baseId}-${count}` : baseId;
      return [2, 3, 4].includes(level) ? `<h${level} id="${escapeHtml(id)}">${children}</h${level}>` : "";
    }
    case "bulletList": return `<ul>${children}</ul>`;
    case "orderedList": return `<ol>${children}</ol>`;
    case "listItem": return `<li>${children}</li>`;
    case "blockquote": return `<blockquote>${children}</blockquote>`;
    case "horizontalRule": return "<hr>";
    case "hardBreak": return "<br>";
    case "codeBlock": return `<pre><code>${children}</code></pre>`;
    case "image": {
      const src = safeImageUrl(node.attrs?.src);
      if (!src) return "";
      const alt = escapeHtml(node.attrs?.alt || "");
      const title = node.attrs?.title ? `<figcaption>${escapeHtml(node.attrs.title)}</figcaption>` : "";
      return `<figure><img src="${escapeHtml(src)}" alt="${alt}" loading="lazy">${title}</figure>`;
    }
    case "video": {
      const src = node.attrs?.src || "";
      if (isUploadedVideoUrl(src, mediaBaseUrl)) {
        const mime = ["video/mp4", "video/webm"].includes(node.attrs?.mimeType) ? ` type="${node.attrs.mimeType}"` : "";
        return `<div class="article-video"><video controls preload="metadata" title="${escapeHtml(node.attrs?.title || "Article video")}"><source src="${escapeHtml(src)}"${mime}></video></div>`;
      }
      const embed = safeEmbedUrl(src, mediaBaseUrl);
      return embed ? `<div class="article-video"><iframe src="${escapeHtml(embed)}" title="${escapeHtml(node.attrs?.title || "Article video")}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>` : "";
    }
    default: return "";
  }
}

function replaceOrInsert(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `${replacement}</head>`);
}

export function renderBlogDocument(template, blog, baseUrl, mediaBaseUrl = "") {
  const title = blog.seoTitle || `${blog.title} | Shenron Global`;
  const description = blog.seoDescription || blog.description;
  const canonical = `${baseUrl}/blogs/${encodeURIComponent(blog.slug)}`;
  const coverImage = typeof blog.coverImage === "string" ? { url: blog.coverImage, alt: "" } : blog.coverImage;
  const coverUrl = safeImageUrl(coverImage?.url);
  const image = coverUrl ? new URL(coverUrl, baseUrl).href : "";
  const content = sanitizeContent(blog.content, { mediaBaseUrl });
  const publishedAt = blog.publishedAt ? new Date(blog.publishedAt).toISOString() : "";
  const modifiedAt = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : publishedAt;
  const articleHtml = `<article class="seo-prerendered-article"><a href="/blogs">Back to blogs</a><header><p>${escapeHtml(blog.category)} · ${publishedAt ? escapeHtml(new Date(blog.publishedAt).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })) : ""}</p><h1>${escapeHtml(blog.title)}</h1><p>${escapeHtml(blog.description)}</p><p>By ${escapeHtml(blog.author || "Shenron Global")} · ${Number(blog.readingTime) || 1} min read</p></header>${image ? `<figure><img src="${escapeHtml(coverUrl)}" alt="${escapeHtml(coverImage?.alt || blog.title)}"></figure>` : ""}<div>${renderNode(content, mediaBaseUrl)}</div>${blog.faqs?.length ? `<section><h2>Frequently asked questions</h2>${blog.faqs.map((faq) => `<details><summary>${escapeHtml(faq.question)}</summary><p>${escapeHtml(faq.answer)}</p></details>`).join("")}</section>` : ""}<p><a href="/blogs">View all blogs</a></p></article>`;
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: blog.title, description, image: image ? [image] : undefined, datePublished: publishedAt || undefined, dateModified: modifiedAt || undefined, author: { "@type": "Person", name: blog.author || "Shenron Global" }, publisher: { "@type": "Organization", name: "Shenron Global", url: baseUrl }, mainEntityOfPage: canonical };
  const metas = [
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    `<meta property="og:type" content="article"><meta property="og:title" content="${escapeHtml(blog.seoTitle || blog.title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${escapeHtml(canonical)}">`,
    ...(image ? [`<meta property="og:image" content="${escapeHtml(image)}"><meta property="og:image:alt" content="${escapeHtml(coverImage?.alt || blog.title)}">`] : []),
    `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}"><meta name="twitter:title" content="${escapeHtml(blog.seoTitle || blog.title)}"><meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="keywords" content="${escapeHtml((blog.seoKeywords || []).join(", "))}">`,
    `<meta property="article:published_time" content="${escapeHtml(publishedAt)}"><meta property="article:modified_time" content="${escapeHtml(modifiedAt)}"><meta property="article:author" content="${escapeHtml(blog.author || "Shenron Global")}">`,
    `<script type="application/ld+json" data-blog-schema>${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
  ].join("");
  let html = template.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = replaceOrInsert(html, /<meta\s+name="description"[^>]*>/i, metas);
  html = html.replace('<div id="root"></div>', `<div id="seo-prerender-content">${articleHtml}</div><div id="root"></div>`);
  return html;
}

export function renderMissingBlogDocument(template) {
  let html = template.replace(/<title>[^<]*<\/title>/i, "<title>Article not found | Shenron Global</title>");
  return replaceOrInsert(html, /<meta\s+name="robots"[^>]*>/i, '<meta name="robots" content="noindex,follow">');
}
