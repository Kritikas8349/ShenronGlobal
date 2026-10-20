
import React, { useState } from "react";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaExternalLinkAlt,
    FaShieldAlt,
} from "react-icons/fa";
import "./Contact.css";
import earth from "../assets/earth.png";

const GOOGLE_SHEETS_URL =
    "https://script.google.com/macros/s/AKfycbxwoPo7seysSYFfLxm8Iqf8B2MbANlcT41fQ0CWsLu6OUStWUp40Ph4eAlsW8d62BsT6w/exec";

const initialForm = {
    name: "",
    email: "",
    phone: "",
    message: "",
};

export default function Contact() {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setStatus("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus("");

        if (!GOOGLE_SHEETS_URL) {
            setStatus("The enquiry form is not configured yet.");
            return;
        }

        setSubmitting(true);

        try {
            await fetch(GOOGLE_SHEETS_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify({
                    ...form,
                    submittedAt: new Date().toISOString(),
                    source: "Shenron Global Website",
                }),
            });

            setStatus(
                "Your enquiry has been submitted. Thank you for contacting Shenron Global."
            );

            setForm(initialForm);
        } catch (error) {
            console.error("Enquiry submission error:", error);

            setStatus(
                "Unable to submit your enquiry. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="sg-contact">
            <section className="sg-contact-hero">
                <div className="sg-contact-container">

                    {/* Heading and globe */}
                    <div className="sg-contact-heading">
                        <div className="sg-contact-eyebrow">
                            <span />
                            GET IN TOUCH
                        </div>

                        <h1>
                            Contact <span>Us.</span>
                        </h1>

                        <p>
                            Have a question, feedback or need guidance? Our team is
                            here to help you with everything related to our services
                            and markets.
                        </p>

                        <div className="sg-globe-art" aria-hidden="true">
                            <img
                                src={earth}
                                alt=""
                                className="sg-contact-globe-image"
                            />
                        </div>
                    </div>

                    <div className="sg-contact-layout">

                        {/* Left column */}
                        <div className="sg-contact-left">

                            <div className="sg-contact-info-card">

                                <div className="sg-info-item">
                                    <div className="sg-info-icon">
                                        <FaEnvelope />
                                    </div>

                                    <div>
                                        <h3>Email Us</h3>
                                        <p>support@shenronglobal.com</p>
                                        <span>Send us your questions anytime.</span>
                                    </div>
                                </div>

                                <div className="sg-info-item">
                                    <div className="sg-info-icon">
                                        <FaPhoneAlt />
                                    </div>

                                    <div>
                                        <h3>Phone</h3>
                                        <p>Contact through our enquiry form</p>
                                        <span>Leave your number for a callback.</span>
                                    </div>
                                </div>

                                <div className="sg-info-item">
                                    <div className="sg-info-icon">
                                        <FaMapMarkerAlt />
                                    </div>

                                    <div>
                                        <h3>Our Office</h3>
                                        <p>Dubai South Business Park</p>
                                        <span>Dubai, United Arab Emirates</span>
                                    </div>
                                </div>

                            </div>

                            {/* Dubai office map */}
                            <div className="sg-map-card">
                                <iframe
                                    title="Shenron Global office location"
                                    src="https://maps.google.com/maps?q=Business%20Centre%2C%20A3%20Dubai%20South%20Business%20Park%2C%20Dubai%2C%20United%20Arab%20Emirates&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                />

                                <a
                                    className="sg-map-overlay-link"
                                    href="https://www.google.com/maps/search/?api=1&query=Business+Centre+A3+Dubai+South+Business+Park+Dubai+United+Arab+Emirates"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className="sg-map-pin">
                                        <FaMapMarkerAlt />
                                    </span>

                                    <span>
                                        <strong>Visit Our Office</strong>
                                        <small>Dubai, United Arab Emirates</small>
                                    </span>

                                    <FaExternalLinkAlt className="sg-map-external" />
                                </a>
                            </div>

                        </div>

                        {/* Right column: enquiry form */}
                        <section className="sg-contact-form-card">

                            <div className="sg-form-heading">
                                <span>ENQUIRY FORM</span>
                                <h2>Send Us a Message</h2>
                                <p>
                                    Fill out the form below and our team will get back
                                    to you as soon as possible.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="sg-form-grid">

                                    {/* Name */}
                                    <label className="sg-field">
                                        <span>
                                            Name <b>*</b>
                                        </span>

                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            autoComplete="name"
                                            maxLength={100}
                                            required
                                        />
                                    </label>

                                    {/* Email */}
                                    <label className="sg-field">
                                        <span>
                                            Email <b>*</b>
                                        </span>

                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="name@email.com"
                                            autoComplete="email"
                                            maxLength={254}
                                            required
                                        />
                                    </label>

                                    {/* Phone / WhatsApp */}
                                    <label className="sg-field sg-field-full">
                                        <span>
                                            WhatsApp Number <span className="sg-required">*</span>
                                        </span>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="WhatsApp number"
                                            autoComplete="tel"
                                            maxLength={30}
                                            required
                                            pattern="[+]?[0-9\s()-]{7,20}"
                                            title="Please enter a valid phone number."
                                        />
                                    </label>
                                    {/* Message */}
                                    <label className="sg-field sg-field-full">
                                        <span>
                                            Message <b>*</b>
                                        </span>

                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell us how we can help you..."
                                            rows={5}
                                            maxLength={2000}
                                            required
                                        />

                                        <small className="sg-char-count">
                                            {form.message.length}/2000
                                        </small>
                                    </label>

                                </div>

                                <button
                                    type="submit"
                                    className="sg-submit-button"
                                    disabled={submitting}
                                >
                                    {submitting ? "Sending..." : "Send Enquiry"}

                                    {!submitting && <FaExternalLinkAlt />}
                                </button>

                                <div className="sg-form-privacy">
                                    <FaShieldAlt />
                                    <span>
                                        Your information will be handled responsibly.
                                    </span>
                                </div>

                                {status && (
                                    <p className="sg-form-status" role="status">
                                        {status}
                                    </p>
                                )}

                            </form>
                        </section>

                    </div>
                </div>
            </section>
        </main>
    );
}
