import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaChartBar,
    FaShieldAlt,
    FaHeadset,
    FaChartLine,
    FaGlobe,
    FaArrowRight,
    FaSyncAlt,
    FaBriefcase,
    FaTelegramPlane,
    FaExchangeAlt,
} from "react-icons/fa";

import "./Home.css";
import heroImg from "../assets/HeroImg.png";
import phone from "../assets/phoneNew.png";



const benefits = [
    {
      icon: <FaChartLine />,
      title: "High Performance",
      description:
        "Experience a streamlined trading platform designed for speed, clarity, and smarter decisions.",
      side: "left",
    },
    {
      icon: <FaSyncAlt />,
      title: "Live Telegram alerts",
      description:
        "Get instant important alerts on our exclusive members only telegram channel. ",
      side: "left",
    },
    {
      icon: <FaShieldAlt />,
      title: "Risk Management Advice",
      description:
        "Get curated and experts backed personlised risk management report/advice.",
      side: "right",
    },
    {
      icon: <FaBriefcase />,
      title: "All trading sessions covered",
      description:
        "Gain valuable insights for all trading sessions, from Asia to London and the USA.",
      side: "right",
    },
  ];


  const steps = [
    {
      number: "01",
      icon: <FaTelegramPlane />,
      title: "Join Our Telegram",
      description:
        "Join our official Telegram channel to receive real-time forex signals, market updates, and instant support. Stay connected with our team and trading community 24/7.",
      label: "Connect with us",
    },
    {
      number: "02",
      icon: <FaChartLine />,
      title: "Receive Signals",
      description:
        "Get curated daily alerts and premium priority signals with sizing guidance to help you evaluate trading opportunities.",
      label: "Discover opportunities",
    },
    {
      number: "03",
      icon: <FaExchangeAlt />,
      title: "Execute or Copy",
      description:
        "Connect your broker or explore copy trading to mirror experienced traders according to your preferences.",
      label: "Choose your approach",
    },
    {
      number: "04",
      icon: <FaShieldAlt />,
      title: "Manage Risk",
      description:
        "Review portfolio allocations and risk management with support from our CFA-led team.",
      label: "Stay risk-aware",
    },
  ];
  


function BenefitCard({ icon, title, description, side }) {
    return (
      <article className={`benefit-card benefit-${side}`}>
        <div className="benefit-icon">{icon}</div>
  
        <h3>{title}</h3>
  
        <p>{description}</p>
  
        <a href="/services" className="benefit-link">
          Learn more <FaArrowRight />
        </a>
      </article>
    );
  }

export default function Home() {

    const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(section);
                }
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);
    return (
        <>
            <main className="home-page">
                <section className="home-hero">
                    {/* Left Content */}
                    <div className="hero-content">
                        <div className="hero-eyebrow">
                            <span className="eyebrow-line"></span>
                            <span>YOUR GATEWAY TO GLOBAL MARKETS</span>
                        </div>

                        <h1 className="hero-title">
                            Improve Your Investment Knowledge
                            <span>With Our Expert Team.</span>
                        </h1>

                        <p className="hero-description">
                            Explore Forex, Crypto and Comex markets with
                            expert insights, real-time opportunities and
                            a global support network - all in one place.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/trading" className="hero-btn primary-btn">
                                Start Trading
                            </Link>

                            <Link to="/services" className="hero-btn secondary-btn">
                                Explore Our Services
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="hero-features">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <FaChartBar />
                                </div>
                                <div className="feature-text">
                                    <h3>Multiple Markets</h3>
                                    <p>Forex · Crypto · Comex</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <FaShieldAlt />
                                </div>
                                <div className="feature-text">
                                    <h3>Secure &amp; Reliable</h3>
                                    <p>Your assets, our priority</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <FaHeadset />
                                </div>
                                <div className="feature-text">
                                    <h3>Expert Support</h3>
                                    <p>Here when you need us</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Hero Image */}
                    <div className="hero-visual">
                        <div className="hero-image-glow"></div>

                        <img
                            src={heroImg}
                            alt="Shenron Global trading platform preview"
                            className="hero-image"
                        />
                    </div>
                </section>
            </main>



            <section
                className={`about-section ${isVisible ? "is-visible" : ""}`}
                id="about"
                ref={sectionRef}
            >
                <div className="about-container">

                    {/* Left: About Content */}
                    <div className="about-content">
                        <div className="about-eyebrow">
                            <span className="about-eyebrow-line"></span>
                            ABOUT SHENRON GLOBAL
                        </div>

                        <h2 className="about-title">
                            Helping You Navigate
                            <span> Global Markets With Confidence.</span>
                        </h2>

                        <p className="about-description">
                            At Shenron Global, we believe that understanding the
                            markets is the first step toward making informed
                            financial decisions. Our goal is to make complex
                            market movements easier to understand through
                            insightful analysis and accessible market education.
                        </p>

                        <p className="about-description about-description-secondary">
                            From Forex and Crypto to Comex, we help you explore
                            market trends, understand opportunities, and develop
                            a more informed perspective on the global financial
                            landscape.
                        </p>

                        <Link to="/services" className="about-cta">
                            Discover Our Approach
                            <span className="about-cta-icon">
                                <FaArrowRight />
                            </span>
                        </Link>
                    </div>

                    {/* Right: Visual Market Card */}
                    <div className="about-visual">
                        <div className="about-orbit about-orbit-one"></div>
                        <div className="about-orbit about-orbit-two"></div>

                        <div className="about-glow"></div>

                        <div className="about-market-card">
                            <div className="about-card-header">
                                <div>
                                    <span className="about-card-label">
                                        OUR APPROACH
                                    </span>
                                    <h3>Understand the Markets</h3>
                                </div>

                                <div className="about-card-icon">
                                    <FaChartLine />
                                </div>
                            </div>

                            <div className="about-chart">
                                <div className="about-chart-grid"></div>

                                <svg
                                    viewBox="0 0 420 150"
                                    className="about-chart-svg"
                                    preserveAspectRatio="none"
                                    role="img"
                                    aria-label="Decorative market trend illustration"
                                >
                                    <defs>
                                        <linearGradient
                                            id="aboutChartFill"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#D9AE5E"
                                                stopOpacity="0.35"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#D9AE5E"
                                                stopOpacity="0"
                                            />
                                        </linearGradient>
                                    </defs>

                                    <path
                                        className="about-chart-area"
                                        d="M0,125 C25,115 35,120 55,102 S85,110 105,88 S135,95 155,70 S185,85 205,62 S235,75 255,48 S285,60 305,35 S335,48 355,24 S390,30 420,8 L420,150 L0,150 Z"
                                    />

                                    <path
                                        className="about-chart-line"
                                        d="M0,125 C25,115 35,120 55,102 S85,110 105,88 S135,95 155,70 S185,85 205,62 S235,75 255,48 S285,60 305,35 S335,48 355,24 S390,30 420,8"
                                    />
                                </svg>

                                <span className="about-chart-point"></span>
                            </div>

                            <div className="about-market-categories">
                                <div className="about-category">
                                    <span className="about-category-dot forex-dot"></span>
                                    <div>
                                        <strong>Forex</strong>
                                        <small>Currency markets</small>
                                    </div>
                                </div>

                                <div className="about-category">
                                    <span className="about-category-dot crypto-dot"></span>
                                    <div>
                                        <strong>Crypto</strong>
                                        <small>Digital assets</small>
                                    </div>
                                </div>

                                <div className="about-category">
                                    <span className="about-category-dot comex-dot"></span>
                                    <div>
                                        <strong>Comex</strong>
                                        <small>Commodity markets</small>
                                    </div>
                                </div>
                            </div>

                            <div className="about-card-footer">
                                <span className="about-footer-icon">
                                    <FaGlobe />
                                </span>

                                <div>
                                    <strong>One Global Perspective</strong>
                                    <p>Insights to help you learn and explore.</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating trust badge */}
                        <div className="about-floating-badge">
                            <div className="about-floating-icon">
                                <FaShieldAlt />
                            </div>

                            <div>
                                <strong>Knowledge First</strong>
                                <span>Informed decisions matter</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="benefits-section" id="benefits">
      <div className="benefits-container">
        <div className="benefits-heading">
          <span className="benefits-eyebrow">WHY SHENRON GLOBAL</span>

          <h2>
            Benefit from a <span>Smarter Trading</span> Experience
          </h2>

          <p>
            Discover a seamless platform designed to bring clarity,
            confidence, and convenience to your trading journey.
          </p>
        </div>

        <div className="benefits-layout">
          <div className="benefits-column benefits-left">
            {benefits
              .filter((item) => item.side === "left")
              .map((item) => (
                <BenefitCard key={item.title} {...item} />
              ))}
          </div>

          <div className="benefits-center">
            <div className="benefits-orbit benefits-orbit-outer" />
            <div className="benefits-orbit benefits-orbit-inner" />
            <div className="benefits-image-glow" />

            <div className="benefits-image-frame">
              <img
                src={phone}
                alt="Shenron Global trading platform preview"
                className="benefits-phone-image"
              />
            </div>

            <div className="benefits-floating-dot benefits-dot-one" />
            <div className="benefits-floating-dot benefits-dot-two" />
          </div>

          <div className="benefits-column benefits-right">
            {benefits
              .filter((item) => item.side === "right")
              .map((item) => (
                <BenefitCard key={item.title} {...item} />
              ))}
          </div>
        </div>
      </div>
    </section>


    <section className="how-it-works" id="how-it-works">
      <div className="how-container">
        <header className="how-heading">
          <span className="how-eyebrow">
            YOUR TRADING JOURNEY
          </span>

          <h2>
            How It <span>Works</span>
          </h2>

          <p>
            Four simple steps to get started with Shenron Global
            and navigate your trading journey with greater clarity.
          </p>
        </header>

        <div className="how-steps">
          <div className="how-connector" aria-hidden="true" />

          {steps.map((step) => (
            <article className="how-step" key={step.number}>
              <div className="how-step-visual">
                <span className="how-step-number">
                  {step.number}
                </span>

                <div className="how-step-icon">
                  {step.icon}
                </div>
              </div>

              <div className="how-step-content">
                <span className="how-step-label">
                  STEP {step.number}
                </span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                <div className="how-step-footer">
                  <span>{step.label}</span>
                  <FaArrowRight />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="how-bottom-note">
          <span className="how-note-dot" />

          <p>
            Stay informed, trade thoughtfully, and keep risk
            management at the heart of every decision.
          </p>
        </div>
      </div>
    </section>

    

        </>
    );
}
