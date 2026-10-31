
import React from "react";
import { Link } from "react-router-dom";

import {
  FaClock,
  FaDiscord,
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaPhoneAlt,
  FaTelegram,
  FaArrowRight,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";
import logo from "../assets/shenron-logo.png";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/#about" },
  { label: "Services", to: "/services/forex" },
  { label: "FAQ", to: "/#faq" },
  { label: "Contact Us", to: "/contact-us" },
];

const serviceLinks = [
  { label: "Forex", to: "/services/forex" },
  { label: "Crypto", to: "/services/crypto" },
  { label: "Comex", to: "/services/comex" },
];

const legalLinks = [
  { label: "Disclaimer", to: "/legal/disclaimer" },
  { label: "Terms & Conditions", to: "/legal/terms-and-conditions" },
  { label: "Privacy Policy", to: "/legal/privacy-policy" },
  { label: "Refund Policy", to: "/legal/refund-policy" },
];

const socialLinks = [
  {
    label: "Facebook",
    icon: <FaFacebookF />,
    href: "https://www.facebook.com/share/1CBibLcXp8/?mibextid=wwXIfr",
  },
  {
    label: "X",
    icon: <FaXTwitter />,
    href: "https://x.com/shenronglobal",
  },
  {
    label: "Instagram",
    icon: <FaInstagram />,
    href: "https://www.instagram.com/shenronglobal?exln=MTEzc2hnNXMxaXkxbQ%3D%3D&utm_source=qr",
  },
  {
    label: "Telegram",
    icon: <FaTelegram />,
    href: "https://t.me/shenronglobal",
  },
];

const footerContactSocials = [
  { label: "Discord", icon: <FaDiscord /> },
  { label: "X", icon: <FaXTwitter />, href: "https://x.com/shenronglobal" },
  { label: "Telegram", icon: <FaTelegram />, href: "https://t.me/shenronglobal" },
  { label: "YouTube", icon: <FaYoutube /> },
  {
    label: "Instagram",
    icon: <FaInstagram />,
    href: "https://www.instagram.com/shenronglobal?exln=MTEzc2hnNXMxaXkxbQ%3D%3D&utm_source=qr",
  },
];

function FooterLinks({ title, links }) {
  return (
    <div className="footer-column">
      <h3 className="footer-column-title">{title}</h3>

      <ul className="footer-link-list">
        {links.map((item) => (
          <li key={item.label}>
            {item.to ? (
              item.external ? (
                <a
                  href={item.to}
                  target={item.to.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.to.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {item.label}
                </a>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      {/* HOME CTA SECTION */}
      <section className="home-cta-section">
        <div className="home-cta-container">
          <div className="home-cta-card">
            <div className="home-cta-content">
              <span className="home-cta-eyebrow">
                YOUR NEXT STEP
              </span>

              <h2>
                What can we help you <span>achieve?</span>
              </h2>

              <p>
                Explore our services, discover market insights, and find
                the right support for your financial learning journey.
              </p>
            </div>

            <div className="home-cta-actions">
              <Link
                to="/services/forex"
                className="home-cta-button"
              >
                Explore Our Services
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-grid">

            {/* BRAND COLUMN */}
            <div className="footer-brand">
              <Link
                to="/"
                className="footer-logo-link"
                aria-label="Shenron Global Home"
              >
                <img
                  src={logo}
                  alt="Shenron Global"
                  className="footer-logo"
                />
              </Link>

              <p className="footer-description">
                Your gateway to global markets. We provide expert
                insights, practical guidance and knowledge to help
                you navigate Forex, Crypto and Comex markets
                confidently.
              </p>

              <div className="footer-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="footer-social-link"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* QUICK LINKS */}
            <FooterLinks
              title="Quick Links"
              links={quickLinks}
            />

            {/* SERVICES */}
            <FooterLinks
              title="Our Services"
              links={serviceLinks}
            />

            {/* LEGAL LINKS */}
            <FooterLinks
              title="Legal"
              links={legalLinks}
            />

          </div>
        </div>

        {/* ADDITIONAL CONTACT AND RISK INFORMATION */}
        <div className="footer-reference">
          <section className="footer-reference-contact" aria-label="Contact information">
            <ul className="footer-reference-contact-list">
              <li><FaEnvelope aria-hidden="true" /><a href="mailto:support@shenronglobal.ae">support@shenronglobal.ae</a></li>
              <li><FaPhoneAlt aria-hidden="true" /><a href="tel:+971565702852">+971565702852</a></li>
              <li><FaClock aria-hidden="true" /><span>Mon - Fri: 9:00 AM - 6:00 PM (GST)</span></li>
              <li><FaGlobe aria-hidden="true" /><a href="https://shenronglobal.ae" target="_blank" rel="noopener noreferrer">shenronglobal.ae</a></li>
            </ul>

            <div className="footer-reference-socials" aria-label="Social media">
              {footerContactSocials.map((social) => social.href ? (
                <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                  {social.icon}
                </a>
              ) : (
                <span key={social.label} aria-label={`${social.label} link unavailable`} title={`${social.label} link unavailable`}>
                  {social.icon}
                </span>
              ))}
            </div>

            <p className="footer-reference-copyright">© copyright Shenron Global {new Date().getFullYear()}. All rights reserved.</p>
          </section>

          <section className="footer-reference-disclaimer" aria-label="Trading risk disclaimer">
            <p>All content on this site, including market commentary, trading signals, analysis, reports, webinars, tutorials and other materials, is provided for educational and informational purposes only.</p>
            <p>Nothing on this site constitutes financial, investment, legal, tax or other professional advice tailored to your personal circumstances.</p>
            <p>Trading forex, precious metals, cryptocurrencies, indices and other leveraged instruments involves significant risk and may result in partial or total loss of capital.</p>
            <p>Market conditions can change rapidly, and you should never trade with funds you cannot afford to lose.</p>
            <p>Shenron makes no guarantee of profits, and past performance, testimonials, case studies and examples do not predict future results.</p>
          </section>

          <div className="footer-reference-riskbar">
            <span><i aria-hidden="true" />Shenron Global</span>
            <p>Trading involves risk. Educational content only.</p>
          </div>
        </div>

      </footer>
    </>
  );
}
