import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../lib/api";
import { ArticleContent, FaqList, TableOfContents } from "./ContentRenderer";
import { formatBlogDate, resolveMediaUrl } from "./content";
import "./BlogPages.css";

function setArticleMetadata(blog) {
  const origin = window.location.origin;
  const canonical = `${origin}/blogs/${encodeURIComponent(blog.slug)}`;
  const image = resolveMediaUrl(blog.coverImage);
  const previousTitle = document.title;
  const previousMeta = [];
  const previousCanonical = document.head.querySelector('link[rel="canonical"]');
  const oldCanonicalHref = previousCanonical?.getAttribute("href");
  document.title = blog.seoTitle || `${blog.title} | Shenron Global`;
  const values = {
    description: blog.seoDescription || blog.description,
    "og:type": "article", "og:title": blog.seoTitle || blog.title,
    "og:description": blog.seoDescription || blog.description,
    "og:url": canonical, "og:image": image,
    "twitter:card": image ? "summary_large_image" : "summary",
    "twitter:title": blog.seoTitle || blog.title,
    "twitter:description": blog.seoDescription || blog.description,
    "keywords": (blog.seoKeywords || []).join(", "),
    "article:published_time": blog.publishedAt || "",
    "article:modified_time": blog.updatedAt || "",
    "article:author": blog.author || "Shenron Global",
    "og:site_name": "Shenron Global",
    "og:image:alt": blog.coverImage?.alt || blog.title,
  };
  for (const [name, content] of Object.entries(values)) {
    if (!content) continue;
    const isNamed = name === "description" || name === "keywords" || name.startsWith("twitter:");
    const selector = isNamed ? `meta[name="${name}"]` : `meta[property="${name}"]`;
    const current = document.head.querySelector(selector);
    const meta = current || document.head.appendChild(document.createElement("meta"));
    previousMeta.push({ meta, created: !current, name: meta.getAttribute("name"), property: meta.getAttribute("property"), content: meta.getAttribute("content") });
    if (isNamed) meta.name = name;
    else meta.setAttribute("property", name);
    meta.content = content;
  }
  let canonicalNode = previousCanonical;
  if (!canonicalNode) { canonicalNode = document.createElement("link"); canonicalNode.rel = "canonical"; document.head.appendChild(canonicalNode); }
  canonicalNode.href = canonical;
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: blog.title, description: blog.seoDescription || blog.description, image: image ? [image] : undefined, datePublished: blog.publishedAt, dateModified: blog.updatedAt, author: { "@type": "Person", name: blog.author || "Shenron Global" }, publisher: { "@type": "Organization", name: "Shenron Global", url: origin }, mainEntityOfPage: canonical };
  document.head.querySelectorAll('script[data-blog-schema="true"]').forEach((element) => element.remove());
  const script = document.createElement("script"); script.type = "application/ld+json"; script.dataset.blogSchema = "true"; script.textContent = JSON.stringify(schema); document.head.appendChild(script);
  return () => {
    script.remove();
    document.title = previousTitle;
    for (const previous of previousMeta) {
      if (previous.created) previous.meta.remove();
      else {
        if (previous.name == null) previous.meta.removeAttribute("name"); else previous.meta.setAttribute("name", previous.name);
        if (previous.property == null) previous.meta.removeAttribute("property"); else previous.meta.setAttribute("property", previous.property);
        if (previous.content == null) previous.meta.removeAttribute("content"); else previous.meta.setAttribute("content", previous.content);
      }
    }
    if (previousCanonical) {
      if (oldCanonicalHref == null) previousCanonical.removeAttribute("href"); else previousCanonical.setAttribute("href", oldCanonicalHref);
    } else canonicalNode.remove();
  };
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [state, setState] = useState("loading");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setState("loading"); setBlog(null);
    apiRequest(`/blogs/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then((data) => { setBlog(data.blog); setState("ready"); })
      .catch((error) => { if (error.name !== "AbortError") setState(error.status === 404 ? "not-found" : "error"); });
    return () => controller.abort();
  }, [slug, retry]);
  useEffect(() => { if (blog) return setArticleMetadata(blog); return undefined; }, [blog]);

  if (state === "loading") return <main className="blog-detail-state"><span className="loading-mark" />Loading article…</main>;
  if (state === "error") return <main className="blog-detail-state"><h1>Article unavailable</h1><p>The article service could not be reached.</p><button className="blog-button" onClick={() => setRetry((value) => value + 1)}>Retry</button></main>;
  if (state === "not-found") return <main className="blog-detail-state"><span className="blog-eyebrow">404 · ARTICLE NOT FOUND</span><h1>This article isn’t here.</h1><p>It may have been moved, unpublished, or the link may be incorrect.</p><Link className="blog-button" to="/blogs">Back to blogs</Link></main>;

  return <main className="blog-article-page">
    <div className="article-wrap"><Link className="back-to-blogs" to="/blogs">← Back to blogs</Link>
      <header className="article-header"><div className="article-meta"><span>{blog.category}</span><time dateTime={blog.publishedAt}>{formatBlogDate(blog.publishedAt)}</time><span>{blog.readingTime || 1} min read</span></div>
        <h1>{blog.title}</h1><p className="article-description">{blog.description}</p><p className="article-author">By {blog.author || "Shenron Global"}</p>
      </header>
      <figure className={`article-cover${resolveMediaUrl(blog.coverImage) ? "" : " is-empty"}`}>
        {resolveMediaUrl(blog.coverImage) ? <img src={resolveMediaUrl(blog.coverImage)} alt={blog.coverImage?.alt || blog.title} onError={(event) => { event.currentTarget.closest("figure")?.classList.add("is-unavailable"); event.currentTarget.remove(); }} /> : <span>Shenron Global Journal</span>}
      </figure>
      <div className="article-layout"><aside><TableOfContents content={blog.content} /></aside><div>
        {blog.featuredVideo?.url && <div className="article-featured-video"><h2>Featured video</h2><ArticleContent content={{ type: "doc", content: [{ type: "video", attrs: { src: blog.featuredVideo.url, title: blog.featuredVideo.title || blog.title, mimeType: blog.featuredVideo.mimeType || "" } }] }} /></div>}
        <ArticleContent content={blog.content} /><FaqList faqs={blog.faqs} />
      </div></div>
      {blog.relatedBlogs?.length > 0 && <section className="related-blogs"><span className="blog-eyebrow">CONTINUE READING</span><h2>Related articles</h2><div>{blog.relatedBlogs.map((item) => <Link key={item._id} to={`/blogs/${item.slug}`}><span>{item.category}</span><strong>{item.title}</strong><small>Read article ↗</small></Link>)}</div></section>}
      <div className="article-end"><Link className="blog-button" to="/blogs">View all blogs</Link></div>
    </div>
  </main>;
}
