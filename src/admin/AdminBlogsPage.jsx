import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../lib/api";
import { BLOG_CATEGORIES, formatBlogDate, resolveMediaUrl } from "../blogs/content";
import "./Admin.css";

export default function AdminBlogsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [viewState, setViewState] = useState("loading");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const loadBlogs = useCallback(async (signal) => {
    setViewState("loading"); setError("");
    try {
      const query = new URLSearchParams({ page: String(page), limit: "15" });
      if (search.trim()) query.set("search", search.trim());
      if (category) query.set("category", category);
      if (status) query.set("status", status);
      const result = await apiRequest(`/blogs/admin?${query}`, { signal });
      setBlogs(result.blogs || []); setPagination(result.pagination || { pages: 1, total: 0 });
      setViewState(result.blogs?.length ? "ready" : "empty");
    } catch (err) { if (err.name !== "AbortError") { setError(err.message); setViewState("error"); } }
  }, [search, category, status, page]);

  useEffect(() => { const controller = new AbortController(); const timer = setTimeout(() => loadBlogs(controller.signal), 180); return () => { clearTimeout(timer); controller.abort(); }; }, [loadBlogs, refresh]);
  const changeFilter = (setter) => (event) => { setter(event.target.value); setPage(1); };
  const articleIdentity = (blog) => <div className="admin-article-cell">
    <span className="admin-article-thumb">{resolveMediaUrl(blog.coverImage) ? <img src={resolveMediaUrl(blog.coverImage)} alt={blog.coverImage?.alt || blog.title} loading="lazy" onError={(event) => { event.currentTarget.parentElement?.classList.add("is-unavailable"); event.currentTarget.remove(); }} /> : "SG"}</span>
    <span className="admin-table-title">{blog.title}<small>/{blog.slug}</small></span>
  </div>;
  const articleActions = (blog) => <div className="admin-row-actions"><Link to={`/admin/blogs/preview/${blog._id}`}>Preview</Link><Link to={`/admin/blogs/edit/${blog._id}`}>Edit</Link><button disabled={busyId === blog._id} onClick={() => changeStatus(blog)}>{blog.status === "published" ? "Unpublish" : "Publish"}</button><button className="delete" disabled={busyId === blog._id} onClick={() => removeBlog(blog)}>Delete</button></div>;

  const removeBlog = async (blog) => {
    if (!window.confirm(`Delete “${blog.title}”? This cannot be undone.`)) return;
    setBusyId(blog._id); setError("");
    try { await apiRequest(`/blogs/admin/${blog._id}`, { method: "DELETE" }); setRefresh((value) => value + 1); }
    catch (err) { setError(err.message); }
    finally { setBusyId(""); }
  };
  const changeStatus = async (blog) => {
    const nextStatus = blog.status === "published" ? "draft" : "published";
    if (nextStatus === "draft" && !window.confirm(`Unpublish “${blog.title}”? Public visitors will no longer be able to open it.`)) return;
    setBusyId(blog._id); setError("");
    try { await apiRequest(`/blogs/admin/${blog._id}/status`, { method: "PATCH", body: JSON.stringify({ status: nextStatus }) }); setRefresh((value) => value + 1); }
    catch (err) { setError(err.message); }
    finally { setBusyId(""); }
  };

  return <section>
    <div className="admin-page-heading"><div><span className="admin-eyebrow">ADMINISTRATION</span><h1>Blog Management</h1><p>{pagination.total} {pagination.total === 1 ? "article" : "articles"} in your journal. Search, edit, and manage publication status.</p></div><Link className="admin-primary" to="/admin/blogs/new">＋ Create New Blog</Link></div>
    {error && <div className="admin-alert error" role="alert">{error}</div>}
    <div className="admin-filters"><input type="search" placeholder="Search titles and descriptions" aria-label="Search articles" value={search} onChange={changeFilter(setSearch)} /><select aria-label="Filter by category" value={category} onChange={changeFilter(setCategory)}><option value="">All categories</option>{BLOG_CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Filter by status" value={status} onChange={changeFilter(setStatus)}><option value="">All statuses</option><option value="published">Published</option><option value="draft">Draft</option></select></div>
    <div className="admin-table-wrap">
      {viewState === "loading" && <div className="admin-loading" role="status">Loading articles…</div>}
      {viewState === "error" && <div className="admin-empty"><p>Could not load the article list.</p><button className="admin-secondary" onClick={() => setRefresh((value) => value + 1)}>Retry</button></div>}
      {viewState === "empty" && <div className="admin-empty"><p>No articles match those filters yet.</p><Link className="admin-primary" to="/admin/blogs/new">Create an article</Link></div>}
      {viewState === "ready" && <>
        <table className="admin-table"><thead><tr><th>Article</th><th>Category</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{blogs.map((blog) => <tr key={blog._id}>
          <td>{articleIdentity(blog)}</td><td>{blog.category}</td><td><span className={`admin-status ${blog.status}`}>{blog.status}</span></td><td>{formatBlogDate(blog.updatedAt)}</td><td>{articleActions(blog)}</td>
        </tr>)}</tbody></table>
        <div className="admin-mobile-list">{blogs.map((blog) => <article className="admin-mobile-card" key={blog._id}>
          <div className="admin-mobile-card-head">{articleIdentity(blog)}</div>
          <div className="admin-mobile-card-meta"><span>{blog.category}</span><span className={`admin-status ${blog.status}`}>{blog.status}</span><time>{formatBlogDate(blog.updatedAt)}</time></div>
          {articleActions(blog)}
        </article>)}</div>
      </>}
    </div>
    {pagination.pages > 1 && <div className="admin-pagination"><button disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>Previous</button><span>Page {page} of {pagination.pages}</span><button disabled={page >= pagination.pages} onClick={() => setPage((value) => value + 1)}>Next</button></div>}
  </section>;
}
