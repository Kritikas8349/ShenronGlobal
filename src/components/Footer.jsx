
import React from "react";
import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaTelegram,
    FaArrowRight,
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


const resourceLinks = [
  {
    label:
      "Address: Business Centre, A3 Dubai South Business Park - Dubai - United Arab Emirates",
    value: "Business Centre, Dubai",
    to: "https://www.google.com/maps/search/?api=1&query=Business+Centre+A3+Dubai+South+Business+Park+Dubai",
    external: true,
  },
  {
    label: "Email: support@shenronglobal.com",
    value: "support@shenronglobal.com",
    to: "mailto:support@shenronglobal.com",
  },
  {
    label: "Phone no: +971565702852",
    value: "+971565702852",
    to: "tel:+971565702852",
  },
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
                target={
                  item.to.startsWith("http") ? "_blank" : undefined
                }
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
                            <Link to="/services/forex" className="home-cta-button">
                                Explore Our Services
                                <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link" aria-label="Shenron Global Home">
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

          {/* Quick links */}
          <FooterLinks title="Quick Links" links={quickLinks} />

          {/* Services */}
          <FooterLinks title="Our Services" links={serviceLinks} />

          {/* Resources */}
          <FooterLinks title="Contact Us" links={resourceLinks} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Shenron Global. All rights reserved.
          </p>

          <nav className="footer-legal-links" aria-label="Legal links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="footer-legal-divider">|</span>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
            <span className="footer-legal-divider">|</span>
            <Link to="/disclaimer">Disclaimer</Link>
          </nav>
        </div>
      </div>
    </footer>
    </>
  );
}
