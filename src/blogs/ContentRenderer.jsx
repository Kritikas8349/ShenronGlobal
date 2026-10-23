import { useMemo } from "react";
import { headingsFromContent, plainTextFromContent, resolveMediaUrl, safeVideoSource, slugify } from "./content";

function safeLink(value = "") {
  try {
    const url = new URL(value, window.location.origin);
    return ["https:", "http:", "mailto:"].includes(url.protocol) ? value : undefined;
  } catch { return undefined; }
}

function renderNode(node, key, context) {
  if (!node) return null;
  const children = (node.content || []).map((child, index) => renderNode(child, `${key}-${index}`, context));
  switch (node.type) {
    case "text": {
      let output = node.text || "";
      (node.marks || []).forEach((mark, i) => {
        if (mark.type === "bold") output = <strong key={`${key}-b${i}`}>{output}</strong>;
        if (mark.type === "italic") output = <em key={`${key}-i${i}`}>{output}</em>;
        if (mark.type === "underline") output = <u key={`${key}-u${i}`}>{output}</u>;
        if (mark.type === "strike") output = <s key={`${key}-s${i}`}>{output}</s>;
        if (mark.type === "code") output = <code key={`${key}-c${i}`}>{output}</code>;
        if (mark.type === "link") {
          const href = safeLink(mark.attrs?.href);
          if (href) output = <a key={`${key}-l${i}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{output}</a>;
        }
      });
      return <span key={key}>{output}</span>;
    }
    case "paragraph": return <p key={key}>{children.length ? children : <br />}</p>;
    case "heading": {
      const text = plainTextFromContent(node).trim();
      const baseId = slugify(text) || `section-${key}`;
      const count = (context.headingCounts.get(baseId) || 0) + 1;
      context.headingCounts.set(baseId, count);
      const id = count > 1 ? `${baseId}-${count}` : baseId;
      const level = Math.min(4, Math.max(2, Number(node.attrs?.level) || 2));
      const Tag = `h${level}`;
      return <Tag key={key} id={id}>{children}</Tag>;
    }
    case "bulletList": return <ul key={key}>{children}</ul>;
    case "orderedList": return <ol key={key}>{children}</ol>;
    case "listItem": return <li key={key}>{children}</li>;
    case "blockquote": return <blockquote key={key}>{children}</blockquote>;
    case "horizontalRule": return <hr key={key} />;
    case "hardBreak": return <br key={key} />;
    case "codeBlock": return <pre key={key}><code>{plainTextFromContent(node)}</code></pre>;
    case "image": {
      const src = node.attrs?.src;
      if (!src || (!src.startsWith("/uploads/") && !safeLink(src))) return null;
      return <figure key={key} className="article-image"><img src={resolveMediaUrl(src)} alt={node.attrs?.alt || ""} loading="lazy" onError={(event) => { event.currentTarget.closest("figure")?.classList.add("is-unavailable"); event.currentTarget.remove(); }} /><figcaption>{node.attrs?.title}</figcaption></figure>;
    }
    case "video": {
      const media = safeVideoSource(node.attrs?.src || "", node.attrs?.mimeType || "");
      if (!media) return null;
      return <div key={key} className="article-video">{media.type === "file" ? <video controls preload="metadata" title={node.attrs?.title || "Article video"}><source src={media.src} type={node.attrs?.mimeType || undefined} /></video> : <iframe src={media.src} title={node.attrs?.title || "Article video"} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}</div>;
    }
    case "doc": return <div key={key} className="article-content">{children}</div>;
    default: return null;
  }
}

export function ArticleContent({ content }) {
  return renderNode(content, "root", { headingCounts: new Map() });
}

export function TableOfContents({ content }) {
  const headings = useMemo(() => headingsFromContent(content), [content]);
  if (headings.length < 2) return null;
  return <nav className="article-toc" aria-label="Table of contents"><strong>In this article</strong><ol>{headings.map((heading, index) => <li className={`toc-level-${heading.level}`} key={`${heading.id}-${index}`}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ol></nav>;
}

export function FaqList({ faqs = [] }) {
  if (!faqs.length) return null;
  return <section className="article-faq"><h2>Frequently asked questions</h2>{faqs.map((faq, index) => <details key={`${faq.question}-${index}`}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>;
}
