import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiRequest } from "../lib/api";
import { BLOG_CATEGORIES, formatBlogDate, resolveMediaUrl } from "./content";
import "./BlogPages.css";

const PAGE_SIZE = 9;

export default function BlogListPage() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [page, setPage] = useState(Number(params.get("page")) || 1);
  const [result, setResult] = useState({ blogs: [], pagination: { pages: 1, total: 0 } });
  const [state, setState] = useState("loading");
  const [retry, setRetry] = useState(0);

  const load = useCallback(async (signal) => {
    setState("loading");
    try {
      const query = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });
      if (search.trim()) query.set("search", search.trim());
      if (category !== "All") query.set("category", category);
      const data = await apiRequest(`/blogs?${query}`, { signal });
      setResult(data);
      setState(data.blogs?.length ? "ready" : "empty");
    } catch (error) {
      if (error.name !== "AbortError") setState("error");
    }
  }, [search, category, page]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => load(controller.signal), 220);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [load, retry]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (search.trim()) next.set("search", search.trim());
    if (category !== "All") next.set("category", category);
    if (page > 1) next.set("page", String(page));
    setParams(next, { replace: true });
  }, [search, category, page, setParams]);

  const chooseCategory = (value) => { setCategory(value); setPage(1); };
  const pages = Math.max(1, result.pagination?.pages || 1);

  return <main className="blog-list-page">
    <section className="blog-list-hero">
      <span className="blog-eyebrow">SHENRON JOURNAL</span>
      <h1>Market insights.<br /><em>Clearer decisions.</em></h1>
      <p>Research and practical education across Forex, Crypto, Comex, market fundamentals, and trading strategies.</p>
    </section>
    <section className="blog-list-body" aria-label="Market articles">
      <div className="blog-controls">
        <label className="blog-search"><span className="sr-only">Search articles</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search articles" /></label>
        <div className="blog-categories" role="group" aria-label="Filter by category">
          {["All", ...BLOG_CATEGORIES].map((item) => <button type="button" key={item} className={category === item ? "active" : ""} aria-pressed={category === item} onClick={() => chooseCategory(item)}>{item}</button>)}
        </div>
      </div>

      {state === "loading" && <div aria-busy="true"><span className="sr-only" role="status">Loading articles…</span><div className="blog-grid blog-skeleton-grid" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <article className="blog-skeleton" key={index}><span /><div><i /><b /><small /></div></article>)}</div></div>}
      {state === "error" && <div className="blog-state blog-error" role="alert"><h2>Articles are temporarily unavailable</h2><p>We couldn’t connect to the blog service. Please try again in a moment.</p><button className="blog-button" onClick={() => setRetry((value) => value + 1)}>Retry</button></div>}
      {state === "empty" && <div className="blog-state"><h2>No articles found</h2><p>{search || category !== "All" ? "Try another search or category." : "New market notes will appear here soon."}</p>{(search || category !== "All") && <button className="blog-button blog-button-quiet" onClick={() => { setSearch(""); chooseCategory("All"); }}>Clear filters</button>}</div>}
      {state === "ready" && <>
        <div className="blog-grid">
          {result.blogs.map((blog) => <article className="blog-card" key={blog._id}>
            <Link className="blog-card-image" to={`/blogs/${blog.slug}`} aria-label={`Read ${blog.title}`}>
              {resolveMediaUrl(blog.coverImage) ? <img src={resolveMediaUrl(blog.coverImage)} alt={blog.coverImage?.alt || blog.title} loading="lazy" onError={(event) => { event.currentTarget.parentElement?.classList.add("is-unavailable"); event.currentTarget.remove(); }} /> : <span className="blog-image-placeholder" aria-hidden="true">Shenron Journal</span>}
            </Link>
            <div className="blog-card-body"><div className="blog-card-meta"><span>{blog.category}</span><time dateTime={blog.publishedAt}>{formatBlogDate(blog.publishedAt)}</time></div>
              <h2><Link to={`/blogs/${blog.slug}`}>{blog.title}</Link></h2><p>{blog.description}</p><Link className="blog-read-link" to={`/blogs/${blog.slug}`}>Read article <span aria-hidden="true">↗</span></Link>
            </div>
          </article>)}
        </div>
        {pages > 1 && <nav className="blog-pagination" aria-label="Blog pagination"><button disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>Previous</button><span>Page {page} of {pages}</span><button disabled={page >= pages} onClick={() => setPage((value) => value + 1)}>Next</button></nav>}
      </>}
    </section>
  </main>;
}
