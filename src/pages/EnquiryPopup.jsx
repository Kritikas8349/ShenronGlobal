
import { useCallback, useEffect, useRef, useState } from "react";
import { apiRequest, jsonBody } from "../lib/api";
import "./EnquiryPopup.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

const popupDismissalKey = "sg-enquiry-popup-dismissed";

function wasPopupDismissed() {
  try {
    return window.sessionStorage.getItem(popupDismissalKey) === "true";
  } catch {
    return false;
  }
}

function rememberPopupDismissal() {
  try {
    window.sessionStorage.setItem(popupDismissalKey, "true");
  } catch {
    // The popup still closes for this page even when storage is unavailable.
  }
}

export default function EnquiryPopup({
  onClose,
  openOnMount = false,
  showTrigger = true,
  showOncePerSession = false,
}) {
  const [isOpen, setIsOpen] = useState(() => (
    openOnMount && (!showOncePerSession || !wasPopupDismissed())
  ));
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closePopup = useCallback(() => {
    if (isSubmitting) return;

    setIsOpen(false);
    if (showOncePerSession) rememberPopupDismissal();
    onClose?.();
  }, [isSubmitting, onClose, showOncePerSession]);
  const closePopupRef = useRef(closePopup);

  useEffect(() => {
    closePopupRef.current = closePopup;
  }, [closePopup]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") closePopupRef.current();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status) setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      website: form.website,
      source: "Portfolio enquiry popup",
    };

    try {
      await apiRequest("/enquiries", {
        method: "POST",
        body: jsonBody(payload),
      });

      setStatus(
        "Your enquiry has been received. Our team will get back to you as soon as possible."
      );
      setForm(initialForm);
    } catch (error) {
      setStatus(
        error.message || "We couldn't send your enquiry. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Button that opens the popup */}
      {showTrigger && (
        <button
          type="button"
          className="enquiry-open-btn"
          onClick={() => {
            setStatus("");
            setIsOpen(true);
          }}
        >
          Enquire Now
          <span aria-hidden="true">↗</span>
        </button>
      )}

      {isOpen && (
        <div
          className="enquiry-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePopup();
            }
          }}
        >
          <section
            className="enquiry-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
          >
            <button
              type="button"
              className="enquiry-close"
              onClick={closePopup}
              disabled={isSubmitting}
              aria-label="Close enquiry form"
            >
              &times;
            </button>

            <div className="enquiry-modal-content">
              <div className="enquiry-eyebrow">
                <span />
                LET'S CONNECT
              </div>

              <h2 id="enquiry-title">
                Start a <span>Conversation.</span>
              </h2>

              <p className="enquiry-description">
                Have a question or need guidance? Share your
                requirements and our team will get in touch.
              </p>

              <form
                className="enquiry-form"
                onSubmit={handleSubmit}
              >
                <label className="enquiry-honeypot" aria-hidden="true" tabIndex={-1}>
                  Leave this field empty
                  <input name="website" value={form.website} onChange={handleChange} autoComplete="off" tabIndex={-1} />
                </label>
                <div className="enquiry-field">
                  <label htmlFor="enquiry-name">
                    Full Name <span>*</span>
                  </label>
                  <input
                    id="enquiry-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                  />
                </div>

                <div className="enquiry-field">
                  <label htmlFor="enquiry-email">
                    Email Address <span>*</span>
                  </label>
                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                  />
                </div>

                <div className="enquiry-field">
                  <label htmlFor="enquiry-phone">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={30}
                  />
                </div>

                <div className="enquiry-field">
                  <label htmlFor="enquiry-message">
                    How can we help? <span>*</span>
                  </label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    placeholder="Tell us a little about your enquiry..."
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    maxLength={3000}
                  />
                </div>

                {status && (
                  <p
                    className="enquiry-status"
                    role="status"
                  >
                    {status}
                  </p>
                )}

                <button
                  type="submit"
                  className="enquiry-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Enquiry"}
                  {!isSubmitting && (
                    <span aria-hidden="true">↗</span>
                  )}
                </button>

                <p className="enquiry-privacy">
                  Your information will be used to respond
                  to your enquiry.
                </p>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
