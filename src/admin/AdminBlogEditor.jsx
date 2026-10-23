import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest, jsonBody } from "../lib/api";
import { BLOG_CATEGORIES, normalizeMedia, resolveMediaUrl, safeVideoSource, slugify } from "../blogs/content";
import { VideoNode } from "../blogs/VideoNode";
import "./Admin.css";
import "./AdminEditor.css";

const EMPTY_CONTENT = { type: "doc", content: [{ type: "paragraph" }] };
const blankForm = { title: "", slug: "", description: "", category: "", coverImage: null, featuredVideo: null, author: "Shenron Global", seoTitle: "", seoDescription: "", seoKeywords: "", faqs: [], status: "draft" };
const BlogImage = Image.extend({
  renderHTML({ HTMLAttributes }) {
    return ["img", { ...HTMLAttributes, src: resolveMediaUrl(HTMLAttributes.src) }];
  },
});

export default function AdminBlogEditor() {
  const { id } = useParams();
  const editMode = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(blankForm);
  const [content, setContent] = useState(EMPTY_CONTENT);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(editMode);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dirty, setDirty] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const loadedContentRef = useRef(EMPTY_CONTENT);
  const extensions = useMemo(() => [StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: false, underline: false }), Underline, Link.configure({ openOnClick: false, autolink: true, protocols: ["https", "http", "mailto"] }), BlogImage.configure({ inline: false, allowBase64: false }), VideoNode], []);
  const editor = useEditor({ extensions, content: EMPTY_CONTENT, editorProps: { attributes: { class: "article-editor-prose", "aria-label": "Article content" } }, onUpdate: ({ editor: current }) => { setContent(current.getJSON()); setDirty(true); } });

  useEffect(() => {
    if (!editMode) return;
    let alive = true;
    apiRequest(`/blogs/admin/${id}`).then(({ blog }) => {
      if (!alive) return;
      setForm({ title: blog.title || "", slug: blog.slug || "", description: blog.description || "", category: blog.category || "", coverImage: normalizeMedia(blog.coverImage), featuredVideo: normalizeMedia(blog.featuredVideo), author: blog.author || "Shenron Global", seoTitle: blog.seoTitle || "", seoDescription: blog.seoDescription || "", seoKeywords: Array.isArray(blog.seoKeywords) ? blog.seoKeywords.join(", ") : "", faqs: blog.faqs || [], status: blog.status || "draft" });
      loadedContentRef.current = blog.content || EMPTY_CONTENT;
      setContent(loadedContentRef.current); setSlugTouched(true); setLoading(false); setDirty(false);
    }).catch((err) => { if (alive) { setError(err.message); setLoading(false); } });
    return () => { alive = false; };
  }, [editMode, id, editor]);

  useEffect(() => { if (editor && editMode && !loading) editor.commands.setContent(loadedContentRef.current, { emitUpdate: false }); }, [editor, editMode, loading]);
  useEffect(() => {
    const warn = (event) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const setField = (key, value) => { setForm((current) => ({ ...current, [key]: value })); setDirty(true); setError(""); setNotice(""); };
  const upload = async (file) => {
    const data = new FormData(); data.append("file", file);
    const response = await apiRequest("/blogs/admin/upload", { method: "POST", body: data });
    return response.media;
  };
  const uploadCover = async (event) => {
    const file = event.target.files?.[0]; event.target.value = ""; if (!file) return;
    setError(""); setNotice("Uploading cover image…");
    try { const media = await upload(file); setForm((current) => ({ ...current, coverImage: { ...media, alt: current.coverImage?.alt || current.title } })); setDirty(true); setNotice("Cover image uploaded."); }
    catch (err) { setError(err.message); setNotice(""); }
  };
  const uploadInlineImage = async (event) => {
    const file = event.target.files?.[0]; event.target.value = ""; if (!file || !editor) return;
    const position = editor.state.selection.from;
    setError(""); setNotice("Uploading inline image…");
    try { const media = await upload(file); const target = Math.max(1, Math.min(position, editor.state.doc.content.size - 1)); editor.chain().focus().setTextSelection(target).setImage({ src: media.url, alt: file.name.replace(/\.[^.]+$/, ""), title: file.name.replace(/\.[^.]+$/, "") }).run(); setNotice("Image added to the article."); }
    catch (err) { setError(err.message); setNotice(""); }
  };
  const uploadInlineVideo = async (event) => {
    const file = event.target.files?.[0]; event.target.value = ""; if (!file || !editor) return;
    const position = editor.state.selection.from;
    setError(""); setNotice("Uploading video…");
    try { const media = await upload(file); const target = Math.max(1, Math.min(position, editor.state.doc.content.size - 1)); editor.chain().focus().setTextSelection(target).setVideo({ src: media.url, title: file.name.replace(/\.[^.]+$/, ""), mimeType: media.mimeType }).run(); setNotice("Video added to the article."); }
    catch (err) { setError(err.message); setNotice(""); }
  };
  const addVideoLink = () => {
    const url = window.prompt("Paste a YouTube or Vimeo URL"); if (!url) return;
    if (!safeVideoSource(url)) { setError("Use a valid YouTube or Vimeo video URL."); return; }
    editor?.chain().focus().setVideo({ src: url.trim(), title: "Embedded video", mimeType: "" }).run(); setDirty(true); setError("");
  };
  const addFaq = () => setField("faqs", [...form.faqs, { question: "", answer: "" }]);
  const updateFaq = (index, key, value) => setField("faqs", form.faqs.map((faq, faqIndex) => faqIndex === index ? { ...faq, [key]: value } : faq));

  const save = useCallback(async (status = form.status, preview = false) => {
    setError(""); setNotice("");
    if (!form.title.trim()) { setError("Add an article title before saving."); return; }
    if (!form.slug.trim()) { setError("Add a URL slug before saving."); return; }
    if (!form.description.trim()) { setError("Add a short description before saving."); return; }
    if (!form.category) { setError("Choose an article category before saving."); return; }
    if (form.featuredVideo?.url && !safeVideoSource(form.featuredVideo.url)) { setError("The featured video URL must be an uploaded video, YouTube, or Vimeo URL."); return; }
    const payload = { ...form, status, slug: slugify(form.slug), seoKeywords: form.seoKeywords.split(",").map((item) => item.trim()).filter(Boolean), content: editor?.getJSON() || content, faqs: form.faqs.filter((faq) => faq.question.trim() || faq.answer.trim()) };
    if (payload.coverImage) payload.coverImage = { ...payload.coverImage, alt: payload.coverImage.alt || form.title };
    if (payload.featuredVideo?.url) payload.featuredVideo = { ...payload.featuredVideo, url: payload.featuredVideo.url.trim() };
    setBusy(true);
    try {
      const result = await apiRequest(editMode ? `/blogs/admin/${id}` : "/blogs/admin", { method: editMode ? "PUT" : "POST", body: jsonBody(payload) });
      const saved = result.blog;
      setForm((current) => ({ ...current, ...saved, coverImage: normalizeMedia(saved.coverImage), featuredVideo: normalizeMedia(saved.featuredVideo), seoKeywords: Array.isArray(saved.seoKeywords) ? saved.seoKeywords.join(", ") : current.seoKeywords }));
      setContent(saved.content || content); setDirty(false);
      if (preview) { navigate(`/admin/blogs/preview/${saved._id}`); return; }
      if (!editMode) navigate(`/admin/blogs/edit/${saved._id}`, { replace: true });
      setNotice(status === "published" ? "Article published." : "Draft saved.");
    } catch (err) { setError(err.message || "Could not save this article."); }
    finally { setBusy(false); }
  }, [form, editor, content, editMode, id, navigate]);

  if (loading) return <div className="admin-loading">Loading article…</div>;
  return <section className="admin-editor-page">
    <div className="admin-page-heading"><div><span className="admin-eyebrow">{editMode ? "EDIT ARTICLE" : "NEW ARTICLE"}</span><h1>{editMode ? "Shape the story." : "Write a market note."}</h1><p>Save a draft at any point. Only published articles appear in the public journal.</p></div><button className="admin-secondary" onClick={() => navigate("/admin/blogs")}>← Back to articles</button></div>
    {error && <div className="admin-alert error" role="alert">{error}</div>}{notice && <div className="admin-alert" role="status">{notice}</div>}
    <form className="admin-editor-grid" onSubmit={(event) => { event.preventDefault(); save("published"); }}>
      <div className="admin-editor-main">
        <section className="admin-panel"><div className="admin-field"><label htmlFor="blog-title">Title <span>*</span></label><input id="blog-title" required value={form.title} maxLength={180} onChange={(event) => { const title = event.target.value; setForm((current) => ({ ...current, title, slug: slugTouched ? current.slug : slugify(title) })); setDirty(true); }} placeholder="A clear, useful article title" /></div>
          <div className="admin-field"><label htmlFor="blog-slug">URL slug <span>*</span></label><div className="admin-slug-prefix">/blogs/<input id="blog-slug" value={form.slug} maxLength={180} onChange={(event) => { setSlugTouched(true); setField("slug", slugify(event.target.value)); }} placeholder="article-url" /></div><small>Readable and stable. Changing a published slug changes its public address.</small></div>
          <div className="admin-field"><label htmlFor="blog-description">Short description <span>*</span></label><textarea id="blog-description" required value={form.description} maxLength={320} rows={3} onChange={(event) => setField("description", event.target.value)} placeholder="A concise summary for cards and search engines" /><small>{form.description.length}/320</small></div>
        </section>

        <section className="admin-panel content-panel"><div className="admin-section-title"><div><h2>Article content</h2><p>Arrange headings, text, images, and video in the sequence they should appear.</p></div><span>RICH TEXT</span></div>
          <div className="editor-toolbar" role="toolbar" aria-label="Article formatting">
            <button type="button" title="Bold" aria-label="Bold" className={editor?.isActive("bold") ? "active" : ""} onClick={() => editor?.chain().focus().toggleBold().run()}><b>B</b></button><button type="button" title="Italic" aria-label="Italic" className={editor?.isActive("italic") ? "active" : ""} onClick={() => editor?.chain().focus().toggleItalic().run()}><i>I</i></button><button type="button" title="Underline" aria-label="Underline" onClick={() => editor?.chain().focus().toggleUnderline().run()}><u>U</u></button><span className="toolbar-divider" />
            {[2, 3, 4].map((level) => <button type="button" key={level} title={`Heading ${level}`} aria-label={`Heading ${level}`} className={editor?.isActive("heading", { level }) ? "active" : ""} onClick={() => editor?.chain().focus().toggleHeading({ level }).run()}>H{level}</button>)}
            <span className="toolbar-divider" /><button type="button" title="Bulleted list" aria-label="Bulleted list" className={editor?.isActive("bulletList") ? "active" : ""} onClick={() => editor?.chain().focus().toggleBulletList().run()}>• List</button><button type="button" title="Numbered list" aria-label="Numbered list" onClick={() => editor?.chain().focus().toggleOrderedList().run()}>1. List</button><button type="button" title="Blockquote" aria-label="Blockquote" onClick={() => editor?.chain().focus().toggleBlockquote().run()}>“</button>
            <button type="button" title="Add link" aria-label="Add link" onClick={() => { const href = window.prompt("Link URL"); if (href) editor?.chain().focus().extendMarkRange("link").setLink({ href }).run(); }}>↗</button><button type="button" title="Insert horizontal rule" aria-label="Insert horizontal rule" onClick={() => editor?.chain().focus().setHorizontalRule().run()}>―</button><span className="toolbar-divider" />
            <label className="toolbar-upload" title="Upload an image at the current cursor" aria-label="Upload inline image">▧ Image<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" aria-label="Upload inline image" onChange={uploadInlineImage} /></label><button type="button" title="Insert a YouTube or Vimeo link" aria-label="Insert video link" onClick={addVideoLink}>▶ Video link</button><label className="toolbar-upload" title="Upload an MP4 or WebM video at the current cursor" aria-label="Upload inline video">⇧ Video<input type="file" accept="video/mp4,video/webm" aria-label="Upload article video" onChange={uploadInlineVideo} /></label><span className="toolbar-divider" /><button type="button" title="Undo" aria-label="Undo" disabled={!editor?.can().undo()} onClick={() => editor?.chain().focus().undo().run()}>↶</button><button type="button" title="Redo" aria-label="Redo" disabled={!editor?.can().redo()} onClick={() => editor?.chain().focus().redo().run()}>↷</button><button type="button" title="Clear text formatting while keeping article content" aria-label="Clear formatting" onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}>Clear</button>
          </div>
          <EditorContent editor={editor} />
          {!editor && <div className="editor-loading">Preparing editor…</div>}
          <p className="editor-help">Use H2 for main sections, H3/H4 for subheadings. Uploaded images and videos stay in order with your text.</p>
        </section>

        <section className="admin-panel"><div className="admin-section-title"><div><h2>Search appearance</h2><p>Optional metadata for search and social sharing.</p></div><span>SEO</span></div>
          <div className="admin-field"><label htmlFor="seo-title">SEO title</label><input id="seo-title" maxLength={180} value={form.seoTitle} onChange={(event) => setField("seoTitle", event.target.value)} /></div>
          <div className="admin-field"><label htmlFor="seo-description">Meta description</label><textarea id="seo-description" rows={3} maxLength={320} value={form.seoDescription} onChange={(event) => setField("seoDescription", event.target.value)} /></div>
          <div className="admin-field"><label htmlFor="seo-keywords">Keywords</label><input id="seo-keywords" value={form.seoKeywords} onChange={(event) => setField("seoKeywords", event.target.value)} placeholder="market outlook, crypto, trading" /></div>
        </section>

        <section className="admin-panel"><div className="admin-section-title"><div><h2>Frequently asked questions</h2><p>Optional questions displayed after the article body.</p></div><button type="button" className="admin-secondary" onClick={addFaq}>＋ Add question</button></div>
          {form.faqs.length === 0 && <p className="faq-empty">No FAQ entries added.</p>}
          {form.faqs.map((faq, index) => <div className="admin-faq-row" key={index}><div className="admin-field"><label>Question {index + 1}</label><input value={faq.question} onChange={(event) => updateFaq(index, "question", event.target.value)} /></div><div className="admin-field"><label>Answer</label><textarea rows={2} value={faq.answer} onChange={(event) => updateFaq(index, "answer", event.target.value)} /></div><button type="button" className="admin-text-danger" onClick={() => setField("faqs", form.faqs.filter((_, faqIndex) => faqIndex !== index))}>Remove FAQ</button></div>)}
        </section>
      </div>

      <aside className="admin-editor-side">
        <section className="admin-panel"><div className="admin-section-title"><div><h2>Publishing</h2><p>Choose when this article is visible.</p></div></div>
          <div className="admin-field"><label htmlFor="blog-status">Status</label><select id="blog-status" value={form.status} onChange={(event) => setField("status", event.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></div>
          <div className="admin-field"><label htmlFor="blog-author">Author</label><input id="blog-author" value={form.author} onChange={(event) => setField("author", event.target.value)} /></div>
          <div className="admin-side-actions"><button type="button" className="admin-secondary" disabled={busy} onClick={() => save("draft")}>Save draft</button><button type="button" className="admin-secondary" disabled={busy} onClick={() => save(form.status, true)}>Preview</button><button type="submit" className="admin-primary" disabled={busy}>{busy ? "Saving…" : form.status === "published" ? "Publish / update" : "Publish article"}</button></div>
        </section>
        <section className="admin-panel"><div className="admin-section-title"><div><h2>Cover image</h2><p>Displayed on the article and listing card.</p></div></div>
          {form.coverImage?.url && <img className="admin-cover-preview" src={resolveMediaUrl(form.coverImage)} alt={form.coverImage.alt || form.title || "Cover preview"} />}
          <label className="admin-upload-button">{form.coverImage ? "Replace image" : "Upload image"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadCover} /></label>
          {form.coverImage && <><div className="admin-field"><label htmlFor="cover-alt">Image alt text</label><input id="cover-alt" value={form.coverImage.alt || ""} onChange={(event) => setField("coverImage", { ...form.coverImage, alt: event.target.value })} /></div><button type="button" className="admin-text-danger" onClick={() => setField("coverImage", null)}>Remove cover</button></>}
        </section>
        <section className="admin-panel"><div className="admin-section-title"><div><h2>Featured video</h2><p>Optional video shown above the article.</p></div></div>
          <div className="admin-field"><label htmlFor="featured-video-url">YouTube / Vimeo URL</label><input id="featured-video-url" type="url" value={form.featuredVideo?.url || ""} onChange={(event) => setField("featuredVideo", event.target.value ? { ...(form.featuredVideo || {}), url: event.target.value } : null)} placeholder="https://youtu.be/…" /></div>
          <label className="admin-upload-button">Upload MP4 / WebM<input type="file" accept="video/mp4,video/webm" onChange={async (event) => { const file = event.target.files?.[0]; event.target.value = ""; if (!file) return; setNotice("Uploading featured video…"); try { const media = await upload(file); setField("featuredVideo", { ...media, title: file.name }); setNotice("Featured video uploaded."); } catch (err) { setError(err.message); setNotice(""); } }} /></label>
          {form.featuredVideo?.url && <button type="button" className="admin-text-danger" onClick={() => setField("featuredVideo", null)}>Remove video</button>}
        </section>
        <section className="admin-panel"><div className="admin-section-title"><div><h2>Article details</h2><p>Used in filters and on the public article page.</p></div></div>
          <div className="admin-field"><label htmlFor="blog-category">Category <span>*</span></label><select id="blog-category" required value={form.category} onChange={(event) => setField("category", event.target.value)}><option value="">Select a category</option>{BLOG_CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></div>
        </section>
      </aside>
    </form>
  </section>;
}
