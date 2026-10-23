
import React, { useEffect, useRef, useState } from "react";
import "./PortfolioM.css";
import EnquiryPopup from "../pages/EnquiryPopup";
import portfolioM from "../assets/portfolioM.png";
import portfolioConstructionImg from "../assets/portfolioManagement.png";
import {
    FiArrowUpRight,
    FiActivity,
    FiShield,
    FiSearch,
    FiCheck,
    FiBarChart2,
    FiFileText,
    FiTarget,
    FiBookOpen,
    FiUsers,
    FiVideo,
    FiTrendingUp,
    FiLayers,
    FiEye,
    FiRefreshCw,
    FiGlobe,
    FiAward,
} from "react-icons/fi";




const portfolioPoints = [
    "Defined objectives",
    "Risk parameters",
    "Review cadence",
];

const coreBenefits = [
    {
        number: "01",
        eyebrow: "BUILT AROUND YOU",
        title: "Personalized Portfolio Strategy & Architecture",
        description:
            "Every portfolio begins with a clear understanding of your capital, objectives, and personal risk boundaries.",
        icon: FiLayers,
        points: [
            "Individual risk profiling across capital, drawdown tolerance, and objectives",
            "Tailored market universe across FX, commodities, indices, and crypto",
            "Strategy mix chosen for you: discretionary, systematic, thematic, hedging, and more",
            "Written Portfolio Blueprint with max risk per trade, loss limits, drawdown policy, and strategy roles",
        ],
    },
    {
        number: "02",
        eyebrow: "DISCIPLINED OVERSIGHT",
        title: "Active Risk & Exposure Management",
        description:
            "A disciplined framework for understanding exposure and adapting to changing market conditions.",
        icon: FiShield,
        points: [
            "Real-time oversight of open risk, leverage, correlated exposure, and drawdown behavior",
            "Dynamic position sizing based on volatility and current conditions",
            "Defensive actions when markets become unstable, including reduced risk, hedging, or partial cash",
        ],
    },
    {
        number: "03",
        eyebrow: "RESEARCH-LED DECISIONS",
        title: "Research-Backed Decision Making",
        description:
            "Technical, fundamental, and sentiment research combine to bring greater context to portfolio decisions.",
        icon: FiSearch,
        points: [
            "Technical analysis across liquidity maps, structure, and momentum",
            "Fundamental drivers including macro data, central banks, and macro themes",
            "Sentiment and positioning reads across risk-on, risk-off, flows, and narratives",
            "CMT and CFA-led researchers flag regime changes and recommend tactical shifts",
        ],
    },
];

const reportingItems = [
    {
        number: "01",
        icon: FiTrendingUp,
        title: "Performance updates",
        text: "Monthly or quarterly performance updates.",
    },
    {
        number: "02",
        icon: FiActivity,
        title: "Equity & drawdown",
        text: "Equity curve and drawdown chart.",
    },
    {
        number: "03",
        icon: FiBarChart2,
        title: "Portfolio attribution",
        text: "Contribution by asset, theme, and strategy.",
    },
    {
        number: "04",
        icon: FiTarget,
        title: "Objective alignment",
        text: "Clear comparison against your original objectives and defined risk limits.",
    },
    {
        number: "05",
        icon: FiFileText,
        title: "Decision change logs",
        text: "Records of meaningful rebalances, theme shifts, and risk reductions.",
    },
];

const clientPrivileges = [
    {
        icon: FiLayers,
        title: "Personalized blueprint",
        text: "A custom, research-driven portfolio blueprint.",
    },
    {
        icon: FiEye,
        title: "Active monitoring",
        text: "Ongoing risk and exposure monitoring.",
    },
    {
        icon: FiFileText,
        title: "Clear reporting",
        text: "Regular performance and risk reporting.",
    },
    {
        icon: FiGlobe,
        title: "Priority research access",
        text: "Priority access to Shenron research, signals, and live sessions.",
    },
    {
        icon: FiUsers,
        title: "Dedicated communication",
        text: "Direct communication with a CMT/CFA-led team.",
    },
    {
        icon: FiVideo,
        title: "Exclusive invitations",
        text: "Invitations to webinars, briefings, and strategy calls.",
    },
    {
        icon: FiBookOpen,
        title: "Educational pathway",
        text: "An optional path to understand and grow alongside your portfolio.",
    },
    {
        icon: FiShield,
        title: "Risk management guidance",
        text: "Guidance on portfolio risk, diversification, and exposure limits.",
    },
    {
        icon: FiTarget,
        title: "Personalized investment insights",
        text: "Research-backed insights aligned with your portfolio objectives and investment horizon.",
    },
];


function useSectionReveal() {

    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add("benefits-in-view");
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px",
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return ref;
}


const marketData = [
    {
        symbol: "NASDAQ",
        code: "100",
        price: "29,607.00",
        change: "-100.00",
        percent: "-0.34%",
        type: "negative",
    },
    {
        symbol: "S&P 500",
        code: "500",
        price: "7,726.7",
        change: "-16.00",
        percent: "-0.21%",
        type: "negative",
    },
    {
        symbol: "EUR/USD",
        code: "🌐",
        price: "1.12226",
        change: "-0.00",
        percent: "-0.13%",
        type: "negative",
    },
    {
        symbol: "GBP/USD",
        code: "£",
        price: "1.3348",
        change: "+0.0021",
        percent: "+0.16%",
        type: "positive",
    },
    {
        symbol: "GOLD",
        code: "Au",
        price: "4,125.60",
        change: "+12.40",
        percent: "+0.30%",
        type: "positive",
    },
    {
        symbol: "BITCOIN",
        code: "₿",
        price: "108,420.00",
        change: "+840.00",
        percent: "+0.78%",
        type: "positive",
    },
    {
        symbol: "DOW JONES",
        code: "DJ",
        price: "46,120.50",
        change: "-45.20",
        percent: "-0.10%",
        type: "negative",
    },
];


const processItems = [
    {
        number: "01",
        title: "Custom blueprint",
        description:
            "A portfolio approach shaped around your objectives, preferences, and risk profile.",
        icon: "◈",
    },
    {
        number: "02",
        title: "Active monitoring",
        description:
            "Continuous exposure reviews and disciplined attention to changing market conditions.",
        icon: "↗",
    },
    {
        number: "03",
        title: "CMT/CFA research",
        description:
            "Research-led analysis that brings technical insight and portfolio strategy together.",
        icon: "⌁",
    },
    {
        number: "04",
        title: "Transparent reports",
        description:
            "Clear portfolio updates, documented decisions, and visibility into your investments.",
        icon: "▤",
    },
];


const features = [
    {
        icon: "↗",
        title: "CMT",
        subtitle: "Technical Research",
    },
    {
        icon: "◎",
        title: "CFA",
        subtitle: "Portfolio Strategy",
    },
    {
        icon: "◷",
        title: "24/7",
        subtitle: "Market Monitoring",
    },
    {
        icon: "▤",
        title: "PMS",
        subtitle: "Personalized Service",
    },
];

function PortfolioM() {
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add("portfolio-visible");
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    const tickerItems = [...marketData, ...marketData];

    const processRef = useRef(null);
    useEffect(() => {
        const section = processRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add("process-visible");
                    observer.unobserve(section);
                }
            },
            { threshold: 0.25 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    const headerRef = useSectionReveal();
    const coreRef = useSectionReveal();
    const reportingRef = useSectionReveal();
    const privilegesRef = useSectionReveal();
    const closingRef = useSectionReveal();

    const constructionRef = useRef(null);

    useEffect(() => {
        const section = constructionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add("construction-visible");
                    observer.unobserve(section);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <main className="portfolio-page" ref={sectionRef}>
                <div className="portfolio-background">
                    <span className="portfolio-orb portfolio-orb-one" />
                    <span className="portfolio-orb portfolio-orb-two" />
                    <div className="portfolio-grid-pattern" />
                </div>

                <section className="portfolio-hero">
                    {/* LEFT CONTENT */}
                    <div className="portfolio-content">
                        <div className="portfolio-eyebrow portfolio-animate">
                            <span className="portfolio-eyebrow-line" />
                            <span>PRIVATE CAPITAL · INSTITUTIONAL OVERSIGHT</span>
                        </div>

                        <h1 className="portfolio-heading portfolio-animate">
                            Institutional Care
                            <span>for Private Capital</span>
                        </h1>

                        <p className="portfolio-description portfolio-animate">
                            Shenron Portfolio Management is an exclusive,
                            research-driven service where your capital is
                            treated like a professional book, backed by CMT
                            and CFA-led oversight, active risk control,
                            and clear reporting.
                        </p>

                        <div className="portfolio-actions portfolio-animate">
                            <button
                                type="button"
                                className="portfolio-btn-primary"
                                onClick={() => setIsEnquiryOpen(true)}
                            >
                                Apply for Portfolio Management
                            </button>

                            <a href="/contact-us" className="portfolio-btn-secondary">
                                Connect with Our Research Desk
                            </a>
                        </div>

                        {/* FEATURES */}
                        <div className="portfolio-features portfolio-animate">
                            {features.map((feature) => (
                                <div className="portfolio-feature" key={feature.title}>
                                    <div className="portfolio-feature-icon">
                                        {feature.icon}
                                    </div>

                                    <div className="portfolio-feature-text">
                                        <strong>{feature.title}</strong>
                                        <span>{feature.subtitle}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="portfolio-trust-line portfolio-animate">
                            <span className="portfolio-trust-dot" />
                            Research-led decisions. Disciplined risk. Transparent reporting.
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="portfolio-visual portfolio-animate">
                        <div className="portfolio-image-glow" />

                        <div className="portfolio-image-frame">
                            <img
                                src={portfolioM}
                                alt="Portfolio management dashboard with market performance and asset allocation"
                                className="portfolio-dashboard-image"
                            />
                        </div>

                        <div className="portfolio-image-caption">
                            <span className="portfolio-caption-dot" />
                            <span>PORTFOLIO INTELLIGENCE</span>
                            <span className="portfolio-caption-divider" />
                            <span>RESEARCH-LED STRATEGY</span>
                        </div>
                    </div>
                </section>
            </main>

            <section
                className="market-ticker"
                aria-label="Market prices ticker"
            >
                <div className="market-ticker-track">
                    {tickerItems.map((item, index) => (
                        <div
                            className="market-ticker-item"
                            key={`${item.symbol}-${index}`}
                            aria-hidden={index >= marketData.length}
                        >
                            <div className="market-ticker-icon">
                                {item.code}
                            </div>

                            <div className="market-ticker-details">
                                <div className="market-ticker-symbol">
                                    {item.symbol}
                                </div>

                                <div className="market-ticker-price">
                                    {item.price}
                                </div>

                                <div
                                    className={`market-ticker-change ${item.type}`}
                                >
                                    <span>{item.change}</span>
                                    <span>({item.percent})</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>



            <section className="portfolio-process" ref={processRef}>
                <div className="process-container">
                    <div className="process-header process-reveal">
                        <div className="process-eyebrow">
                            <span className="process-eyebrow-line" />
                            PRIVATE CAPITAL DESK
                        </div>

                        <h2 className="process-heading">
                            A research-led portfolio process with <span>visible risk control.</span>
                        </h2>

                        <p className="process-intro">
                            Shenron turns portfolio management from a black box
                            into a clear, monitored process: custom allocation,
                            active exposure review, documented decisions, and
                            direct access to the research team behind the portfolio.
                        </p>
                    </div>

                    <div className="process-grid">
                        {processItems.map((item, index) => (
                            <article
                                className="process-card process-reveal"
                                key={item.number}
                                style={{ "--process-delay": `${index * 120}ms` }}
                            >
                                <div className="process-card-top">
                                    <span className="process-number">{item.number}</span>
                                    <span className="process-icon">{item.icon}</span>
                                </div>

                                <h3>{item.title}</h3>
                                <p>{item.description}</p>

                                <div className="process-card-bottom">
                                    <span className="process-card-line" />
                                    <span className="process-card-arrow">↗</span>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="process-footer process-reveal">
                        <span className="process-footer-dot" />
                        <p>
                            Built on research. Guided by risk. Driven by transparency.
                        </p>
                        <span className="process-footer-line" />
                    </div>
                </div>
            </section>

            <section className="portfolio-benefits">
                <div className="benefits-container">

                    {/* INTRODUCTION */}
                    <header
                        className="benefits-header benefits-reveal-section"
                        ref={headerRef}
                    >
                        <div className="benefits-eyebrow benefits-item">
                            <span className="benefits-eyebrow-line" />
                            CORE BENEFITS
                        </div>

                        <h2 className="benefits-main-heading benefits-item">
                            Every portfolio is built around{" "}
                            <span>risk, research,  and explanation.</span>
                        </h2>

                        <p className="benefits-intro benefits-item">
                            Every decision has a purpose. Every strategy has
                            a defined role. Every portfolio is supported by
                            disciplined risk management and transparent
                            communication.
                        </p>
                    </header>

                    {/* CORE BENEFITS: OPEN COLUMNS, NOT CARDS */}
                    <div
                        className="core-benefits-section benefits-reveal-section"
                        ref={coreRef}
                    >
                        <div className="benefits-section-heading benefits-item">
                            <div>
                                <span className="benefits-mini-label">
                                    OUR APPROACH
                                </span>
                                <h3>Built on three pillars.</h3>
                            </div>

                            <span className="benefits-heading-note">
                                RESEARCH. RISK. RESPONSIBILITY.
                            </span>
                        </div>

                        <div className="core-benefits-grid">
                            {coreBenefits.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <article
                                        className="core-benefit-column benefits-item"
                                        key={item.number}
                                        style={{
                                            "--item-delay": `${index * 140}ms`,
                                        }}
                                    >
                                        <div className="core-benefit-top">
                                            <span className="core-benefit-number">
                                                {item.number}
                                            </span>

                                            <Icon className="core-benefit-icon" />
                                        </div>

                                        <span className="core-benefit-eyebrow">
                                            {item.eyebrow}
                                        </span>

                                        <h3>{item.title}</h3>

                                        <p className="core-benefit-description">
                                            {item.description}
                                        </p>

                                        <div className="core-benefit-divider" />

                                        <ul className="core-benefit-list">
                                            {item.points.map((point) => (
                                                <li key={point}>
                                                    <FiCheck className="benefit-check" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="core-benefit-bottom">
                                            <span>SHENRON GLOBAL</span>
                                            <span>{item.number} / 03</span>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    {/* REPORTING & TRANSPARENCY */}
                    <section
                        className="reporting-section benefits-reveal-section"
                        ref={reportingRef}
                    >
                        <div className="reporting-intro benefits-item">
                            <div className="benefits-eyebrow">
                                <span className="benefits-eyebrow-line" />
                                REPORTING & TRANSPARENCY
                            </div>

                            <h3>
                                Know what is happening.
                                <span> Understand why.</span>
                            </h3>

                            <p>
                                Performance is only part of the picture. Understand
                                the risk, allocation, and decisions behind your
                                portfolio through clear and structured reporting.
                            </p>

                            <div className="reporting-highlight">
                                <FiRefreshCw className="reporting-highlight-icon" />

                                <div>
                                    <strong>Clarity at every stage</strong>
                                    <span>
                                        Performance, risk, and changes explained.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="reporting-list">
                            {reportingItems.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <article
                                        className="reporting-item benefits-item"
                                        key={item.number}
                                        style={{
                                            "--item-delay": `${index * 90}ms`,
                                        }}
                                    >
                                        <span className="reporting-number">
                                            {item.number}
                                        </span>

                                        <Icon className="reporting-item-icon" />

                                        <div className="reporting-item-content">
                                            <h4>{item.title}</h4>
                                            <p>{item.text}</p>
                                        </div>

                                        <FiArrowUpRight className="reporting-arrow" />
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    {/* CLIENT PRIVILEGES */}


                    <section
                        className="privileges-section benefits-reveal-section"
                        ref={privilegesRef}
                    >
                        <div className="privileges-top benefits-item">
                            <div>
                                <div className="benefits-eyebrow">
                                    <span className="benefits-eyebrow-line" />
                                    CLIENT PRIVILEGES
                                </div>

                                <h3>
                                    Your portfolio.
                                    <br />
                                    <span>Our continued commitment.</span>
                                </h3>
                            </div>

                            <p className="privileges-intro">
                                A more considered investment experience, built around
                                meaningful insights, personal attention, and a
                                relationship that goes beyond the numbers.
                            </p>
                        </div>

                        <div className="privileges-showcase">
                            <div className="privileges-feature benefits-item">
                                <div className="privileges-feature-top">
                                    <span>THE EXPERIENCE</span>
                                    <span className="privileges-feature-symbol">✳</span>
                                </div>

                                <div className="privileges-feature-main">
                                    <span className="privileges-feature-index">01 / 09</span>

                                    <h4>
                                        A relationship built around your financial goals.
                                    </h4>

                                    <p>
                                        Personalized attention, relevant perspectives,
                                        and thoughtful guidance to help you navigate
                                        your investment journey.
                                    </p>
                                </div>

                                <div className="privileges-feature-bottom">
                                    <span>BEYOND PORTFOLIO MANAGEMENT</span>
                                    <FiArrowUpRight />
                                </div>
                            </div>

                            <div className="privileges-grid">
                                {clientPrivileges.slice(1).map((item, index) => {
                                    const Icon = item.icon;

                                    return (
                                        <article
                                            className="privilege-card benefits-item"
                                            key={item.title}
                                            style={{
                                                "--item-delay": `${index * 80}ms`,
                                            }}
                                        >
                                            <div className="privilege-card-top">
                                                <Icon className="privilege-icon" />
                                                <span>
                                                    {String(index + 2).padStart(2, "0")}
                                                </span>
                                            </div>

                                            <div className="privilege-card-content">
                                                <h4>{item.title}</h4>
                                                <p>{item.text}</p>
                                            </div>

                                            <span className="privilege-card-line" />
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="privileges-bottom benefits-item">
                            <span>PERSONAL ATTENTION</span>
                            <span className="privileges-bottom-divider" />
                            <span>RESEARCH-LED PERSPECTIVES</span>
                            <span className="privileges-bottom-divider" />
                            <span>LONG-TERM PARTNERSHIP</span>
                        </div>
                    </section>



                    {/* CLOSING STATEMENT */}
                    <div
                        className="benefits-closing benefits-reveal-section"
                        ref={closingRef}
                    >
                        <FiAward className="benefits-closing-icon benefits-item" />

                        <p className="benefits-item">
                            Thoughtful strategy. Disciplined risk.{" "}
                            <strong>Decisions you can understand.</strong>
                        </p>

                        <span className="benefits-closing-line benefits-item" />
                    </div>

                </div>
            </section>


            <section
                className="portfolio-construction"
                ref={constructionRef}
            >
                <div className="construction-container">
                    {/* Left content */}
                    <div className="construction-content">
                        <span className="construction-eyebrow">
                            YOUR INVESTMENT APPROACH
                        </span>

                        <h2>
                            Built around your
                            <br />
                            investment mandate
                        </h2>

                        <p className="construction-description">
                            Whether you're an individual investor or a family office,
                            our portfolio management service is tailored to your
                            goals, risk appetite and market outlook.
                        </p>

                        <ul className="construction-points">
                            {portfolioPoints.map((point, index) => (
                                <li
                                    key={point}
                                    style={{ "--point-index": index }}
                                >
                                    <span className="construction-check">
                                        <svg
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M4 8.2L6.6 10.6L12 5.5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right image */}
                    <div className="construction-visual">
                        <div className="construction-image-wrap">
                            <img
                                src={portfolioConstructionImg}
                                alt="Portfolio construction and investment allocation visualization"
                                className="construction-image"
                                loading="lazy"
                            />
                        </div>
                        <div className="construction-image-accent" />
                    </div>
                </div>
            </section>


            {isEnquiryOpen && (
                <EnquiryPopup
                    openOnMount={true}
                    onClose={() => setIsEnquiryOpen(false)}
                />
            )}

        </>
    );
}

export default PortfolioM;
