import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArticleContent, FaqList, TableOfContents } from "../blogs/ContentRenderer";
import { formatBlogDate, resolveMediaUrl } from "../blogs/content";
import { apiRequest } from "../lib/api";
import "../blogs/BlogPages.css";
import "./AdminPreview.css";

export default function AdminBlogPreview() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [state, setState] = useState("loading");
  useEffect(() => {
    let alive = true;
    apiRequest(`/blogs/admin/${id}`).then(({ blog: data }) => { if (alive) { setBlog(data); setState("ready"); } }).catch(() => { if (alive) setState("error"); });
    return () => { alive = false; };
  }, [id]);
  if (state === "loading") return <div className="admin-loading">Loading preview…</div>;
  if (state === "error") return <div className="admin-loading">The article preview could not be loaded. <Link to="/admin/blogs">Return to articles</Link></div>;
  return <main className="blog-article-page admin-preview-article">
    <div className="admin-preview-banner"><span>PRIVATE PREVIEW · {blog.status.toUpperCase()}</span><Link to={`/admin/blogs/edit/${blog._id}`}>Edit article ↗</Link></div>
    <div className="article-wrap"><Link className="back-to-blogs" to="/admin/blogs">← Back to articles</Link>
      <header className="article-header"><div className="article-meta"><span>{blog.category}</span><time>{formatBlogDate(blog.publishedAt || blog.updatedAt)}</time><span>{blog.readingTime || 1} min read</span></div><h1>{blog.title}</h1><p className="article-description">{blog.description}</p><p className="article-author">By {blog.author || "Shenron Global"}</p></header>
      <figure className={`article-cover${resolveMediaUrl(blog.coverImage) ? "" : " is-empty"}`}>{resolveMediaUrl(blog.coverImage) ? <img src={resolveMediaUrl(blog.coverImage)} alt={blog.coverImage?.alt || blog.title} onError={(event) => { event.currentTarget.closest("figure")?.classList.add("is-unavailable"); event.currentTarget.remove(); }} /> : <span>Shenron Global Journal</span>}</figure>
      <div className="article-layout"><aside><TableOfContents content={blog.content} /></aside><div>{blog.featuredVideo?.url && <div className="article-featured-video"><h2>Featured video</h2><ArticleContent content={{ type: "doc", content: [{ type: "video", attrs: { src: blog.featuredVideo.url, title: blog.featuredVideo.title || blog.title, mimeType: blog.featuredVideo.mimeType || "" } }] }} /></div>}<ArticleContent content={blog.content} /><FaqList faqs={blog.faqs} /></div></div>
    </div>
  </main>;
}
