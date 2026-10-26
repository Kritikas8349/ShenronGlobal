import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/shenron-logo.png";

const services = [
  { name: "Forex Services", path: "/services/forex" },
  { name: "Crypto Services", path: "/services/crypto" },
  { name: "Comex Services", path: "/services/comex" },
  // { name: "Mentorship", path: "/services/mentorship" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navbarRef = useRef(null);
  const location = useLocation();

  const closeMenus = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  // Close menus after navigation
  useEffect(() => {
    closeMenus();
  }, [location.pathname]);

  // Close menus on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        closeMenus();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleServices = () => {
    setServicesOpen((previous) => !previous);
  };

  return (
    <header className="site-header" ref={navbarRef}>
      <nav className="navbar" aria-label="Main navigation">

        {/* Shenron Global Logo */}
        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenus}
          aria-label="Shenron Global home"
        >
          <img
            src={logo}
            alt="Shenron Global"
            className="navbar-logo"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`mobile-menu-toggle ${menuOpen ? "is-active" : ""
            }`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="navbar-navigation"
          onClick={() => {
            setMenuOpen((previous) => !previous);
            setServicesOpen(false);
          }}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation Links */}
        <div
          id="navbar-navigation"
          className={`navbar-navigation ${menuOpen ? "is-open" : ""
            }`}
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMenus}
          >
            Home
          </NavLink>

          {/* Services Dropdown */}
          <div
            className={`nav-dropdown ${servicesOpen ? "dropdown-open" : ""
              }`}
            onMouseEnter={() => {
              if (
                window.matchMedia("(min-width: 901px)").matches
              ) {
                setServicesOpen(true);
              }
            }}
            onMouseLeave={() => {
              if (
                window.matchMedia("(min-width: 901px)").matches
              ) {
                setServicesOpen(false);
              }
            }}
          >
            <button
              type="button"
              className="nav-link dropdown-trigger"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={toggleServices}
            >
              Services

              <svg
                className="dropdown-chevron"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 4.5L6 8L9.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="dropdown-menu">
              <div className="dropdown-heading">
                <span>OUR SERVICES</span>
                <p>Explore our expertise</p>
              </div>

              {services.map((service) => (
                <NavLink
                  key={service.path}
                  to={service.path}
                  className={({ isActive }) =>
                    `dropdown-item ${isActive ? "active" : ""
                    }`
                  }
                  onClick={closeMenus}
                >
                  <span>{service.name}</span>
                  <span
                    className="dropdown-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </NavLink>
              ))}
            </div>
          </div>


          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMenus}
          >
            Portfolio Management
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMenus}
          >
            Blog
          </NavLink>

          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMenus}
          >
            Contact Us
          </NavLink>

          {/* Contact Button - WhatsApp */}
          <a
            href="https://wa.me/971565702852"
            className="navbar-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenus}
          >
            Let's Talk
          </a>
        </div>
      </nav>
    </header>
  );
}
