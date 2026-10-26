import { useCallback, useEffect, useState } from "react";
import { apiRequest, jsonBody } from "../lib/api";
import "./Admin.css";
import "./AdminEnquiries.css";

const statusLabels = { new: "New", in_progress: "In progress", resolved: "Resolved" };

function formatDate(value) {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-AE", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dubai" }).format(date);
}

function replyTemplate(name) {
  return `Hello ${name},\n\nThank you for contacting Shenron Global. We have resolved the concern you raised. If you need any further assistance, please reply to this message.\n\nBest regards,\nShenron Global`;
}

function EnquiryCard({ enquiry, busy, mailConfigured, sending, onSave, onSend }) {
  const [status, setStatus] = useState(enquiry.status);
  const [adminNote, setAdminNote] = useState(enquiry.adminNote || "");
  const [replyDraft, setReplyDraft] = useState(enquiry.replyDraft || replyTemplate(enquiry.name));
  const whatsappNumber = (enquiry.phone || "").replace(/\D/g, "");
  const whatsappHref = whatsappNumber.length >= 7 ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(replyDraft)}` : "";
  const sendReply = async () => {
    const result = await onSend(enquiry, replyDraft, status);
    if (result?.enquiry) setStatus(result.enquiry.status);
  };

  return <article className="admin-enquiry-card">
    <header className="admin-enquiry-header">
      <div className="admin-enquiry-person">
        <h2>{enquiry.name}</h2>
        <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
        {enquiry.phone && <a href={`tel:${enquiry.phone.replace(/[^+\d]/g, "")}`}>{enquiry.phone}</a>}
      </div>
      <div className="admin-enquiry-meta">
        <span className={`admin-enquiry-status ${enquiry.status}`}>{statusLabels[enquiry.status] || enquiry.status}</span>
        <time dateTime={enquiry.createdAt}>{formatDate(enquiry.createdAt)}</time>
        <span>{enquiry.source}</span>
        {enquiry.lastReplySentAt && <span>Last email sent {formatDate(enquiry.lastReplySentAt)}</span>}
      </div>
    </header>

    <section className="admin-enquiry-message">
      <span>ENQUIRY</span>
      <p>{enquiry.message}</p>
    </section>

    <div className="admin-enquiry-edit-grid">
      <label className="admin-enquiry-field">
        <span>Reply draft <small>Email sends from the configured company mailbox. Edit and review it before sending.</small></span>
        <textarea value={replyDraft} maxLength={4000} rows={5} onChange={(event) => setReplyDraft(event.target.value)} />
      </label>
      <label className="admin-enquiry-field">
        <span>Private admin note <small>Only visible to administrators.</small></span>
        <textarea value={adminNote} maxLength={2000} rows={5} onChange={(event) => setAdminNote(event.target.value)} placeholder="Add an internal follow-up note..." />
      </label>
    </div>

    <footer className="admin-enquiry-footer">
      <label className="admin-enquiry-status-control">
        Status
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <div className="admin-enquiry-actions">
        <button className="admin-primary" type="button" disabled={!mailConfigured || sending || busy || !replyDraft.trim()} onClick={sendReply}>{sending ? "Sending email..." : "Send email"}</button>
        {whatsappHref ? <a className="admin-secondary" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a> : <span className="admin-enquiry-hint">Add a country code to the phone number to reply on WhatsApp.</span>}
        <button className="admin-primary" type="button" disabled={busy || sending} onClick={() => onSave(enquiry, { status, adminNote, replyDraft })}>{busy ? "Saving..." : "Save updates"}</button>
      </div>
    </footer>
  </article>;
}

export default function AdminEnquiriesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [enquiries, setEnquiries] = useState([]);
  const [mailStatus, setMailStatus] = useState({ configured: false, fromEmail: "", loaded: false });
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [viewState, setViewState] = useState("loading");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busyId, setBusyId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const loadEnquiries = useCallback(async (signal) => {
    setViewState("loading");
    setError("");
    const query = new URLSearchParams({ page: String(page), limit: "20" });
    if (search.trim()) query.set("search", search.trim());
    if (status) query.set("status", status);
    try {
      const [result, senderStatus] = await Promise.all([
        apiRequest(`/enquiries/admin?${query}`, { signal }),
        apiRequest("/enquiries/admin/mail-status", { signal }),
      ]);
      setEnquiries(result.enquiries || []);
      setMailStatus({ ...senderStatus, loaded: true });
      setPagination(result.pagination || { pages: 1, total: 0 });
      setViewState(result.enquiries?.length ? "ready" : "empty");
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        setViewState("error");
      }
    }
  }, [page, search, status]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => loadEnquiries(controller.signal), 150);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [loadEnquiries, refresh]);

  const saveEnquiry = async (enquiry, changes) => {
    setBusyId(enquiry._id);
    setError("");
    setNotice("");
    try {
      const result = await apiRequest(`/enquiries/admin/${enquiry._id}`, { method: "PATCH", body: jsonBody(changes) });
      setEnquiries((current) => current.map((item) => item._id === enquiry._id ? result.enquiry : item));
      setNotice(`Updates saved for ${enquiry.name}.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId("");
    }
  };

  const [sendingId, setSendingId] = useState("");
  const sendEnquiryReply = async (enquiry, message, status) => {
    setSendingId(enquiry._id);
    setError("");
    setNotice("");
    try {
      const result = await apiRequest(`/enquiries/admin/${enquiry._id}/reply`, { method: "POST", body: jsonBody({ message, status }) });
      setEnquiries((current) => current.map((item) => item._id === enquiry._id ? result.enquiry : item));
      setNotice(result.message);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setSendingId("");
    }
  };

  return <section className="admin-enquiries-page">
    <div className="admin-page-heading">
      <div><span className="admin-eyebrow">CLIENT SUPPORT</span><h1>Enquiries</h1><p>{pagination.total} {pagination.total === 1 ? "enquiry" : "enquiries"}. Review the request, save a status, then reply by email or WhatsApp.</p></div>
      <button className="admin-secondary" type="button" onClick={() => setRefresh((value) => value + 1)}>Refresh list</button>
    </div>

    {error && <div className="admin-alert error" role="alert">{error}</div>}
    {notice && <div className="admin-alert" role="status">{notice}</div>}
    {mailStatus.loaded && <div className={`admin-alert${mailStatus.configured ? "" : " error"}`} role="status">{mailStatus.configured ? `Company email sending is ready. Sender: ${mailStatus.fromEmail}.` : "Company email sending is not configured. Add SMTP_HOST, SMTP_USER, SMTP_PASSWORD, and SMTP_FROM_EMAIL to the private backend environment file, then restart the service. WhatsApp replies remain available."}</div>}

    <div className="admin-enquiry-filters">
      <label><span className="sr-only">Search enquiries</span><input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search name, email, phone, or message" /></label>
      <label><span className="sr-only">Filter enquiry status</span><select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}><option value="">All statuses</option><option value="new">New</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option></select></label>
    </div>

    {viewState === "loading" && <div className="admin-enquiry-state" role="status">Loading enquiries...</div>}
    {viewState === "error" && <div className="admin-enquiry-state"><p>Could not load enquiries.</p><button className="admin-secondary" type="button" onClick={() => setRefresh((value) => value + 1)}>Try again</button></div>}
    {viewState === "empty" && <div className="admin-enquiry-state"><h2>No enquiries found</h2><p>New contact form submissions will appear here.</p></div>}
    {viewState === "ready" && <div className="admin-enquiry-list">{enquiries.map((enquiry) => <EnquiryCard key={enquiry._id} enquiry={enquiry} busy={busyId === enquiry._id} mailConfigured={mailStatus.configured} sending={sendingId === enquiry._id} onSave={saveEnquiry} onSend={sendEnquiryReply} />)}</div>}

    {pagination.pages > 1 && <div className="admin-pagination"><button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>Previous</button><span>Page {page} of {pagination.pages}</span><button type="button" disabled={page >= pagination.pages} onClick={() => setPage((current) => current + 1)}>Next</button></div>}
  </section>;
}
