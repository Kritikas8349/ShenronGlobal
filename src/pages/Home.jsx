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
    FaPlus, FaMinus,
    FaStar,
    FaArrowLeft,
    FaQuoteRight,
    FaCheckCircle,
} from "react-icons/fa";

import "./Home.css";
import heroImg from "../assets/MobileHero.png";
import phone from "../assets/phoneNew.png";


const testimonials = [
    {
        name: "Alexander Bennett",
        initials: "AB",
        rating: 5,
        title: "A more structured approach to trading.",
        message:
            "What I appreciate most is the clarity behind every market update. The insights help me understand the reasoning behind a trade and approach decisions with a more structured mindset.",
        tag: "Market Insights",
    },
    {
        name: "Olivia Mitchell",
        initials: "OM",
        rating: 5,
        title: "Clarity that makes a difference.",
        message:
            "The analysis is presented in a way that is easy to follow. I especially value the focus on risk management and having the important information organized in one place.",
        tag: "Risk Management",
    },
    {
        name: "Ethan Carter",
        initials: "EC",
        rating: 5,
        title: "A professional experience throughout.",
        message:
            "The overall experience feels organized and professional. Having market perspectives and educational insights together makes it easier to stay informed and review my decisions.",
        tag: "Investor Experience",
    },
    {
        name: "Sophia Williams",
        initials: "SW",
        rating: 5,
        title: "Designed around informed decisions.",
        message:
            "I like the emphasis on understanding the market rather than simply following a recommendation. The educational approach and clear presentation are particularly useful.",
        tag: "Trading Education",
    },
];


const faqs = [
    {
        category: "Getting Started",
        question: "What’s the minimum I can start with?",
        answer:
            "We recommend a minimum starting equity of $1,000 for our services. You may join with any amount, but some services, including copy trading and portfolio mandates, have higher suggested minimums for effective risk management.",
    },
    {
        category: "Pricing & Fees",
        question: "How much are your charges?",
        answer:
            "Our core signal plans are tiered into Essentials, Pro, and Elite. Signal pricing, copy trading access, and portfolio management fees are listed on our Pricing page. Portfolio management typically uses an assets-under-management (AUM) fee, with an optional performance fee. Copy trading may use a subscription or performance-fee model.",
    },
    {
        category: "Pricing & Fees",
        question: "Do you have any additional charges?",
        answer:
            "No hidden fees. All applicable charges are disclosed before purchase so you can review the costs before choosing a service.",
    },
    {
        category: "Service & Delivery",
        question: "How will I receive your service?",
        answer:
            "Choose your preferred delivery channels in your account: web feed, email alerts, a private Telegram channel, app push notifications, and optional SMS. Premium subscribers receive access to priority channels and real-time alerts.",
    },
    {
        category: "Payments",
        question: "Which payment methods do you accept?",
        answer:
            "We accept major credit and debit cards, SEPA or ACH transfers where supported, and cryptocurrency payments for selected plans. Available methods are displayed at checkout. Corporate wire transfers and invoicing are available for institutional clients.",
    },
];



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
        // label: "Connect with us",
    },
    {
        number: "02",
        icon: <FaChartLine />,
        title: "Receive Signals",
        description:
            "Get curated daily alerts and premium priority signals with sizing guidance to help you evaluate trading opportunities.",
        // label: "Discover opportunities",
    },
    {
        number: "03",
        icon: <FaExchangeAlt />,
        title: "Execute or Copy",
        description:
            "Connect your broker or explore copy trading to mirror experienced traders according to your preferences.",
        // label: "Choose your approach",
    },
    {
        number: "04",
        icon: <FaShieldAlt />,
        title: "Manage Risk",
        description:
            "Review portfolio allocations and risk management with support from our CFA-led team.",
        // label: "Stay risk-aware",
    },
];

const signals = [
    {
        symbol: "XAU/USD",
        tradingViewSymbol: "OANDA:XAUUSD",
        status: "Hold",
        statusType: "hold",
        subtitle: "Liquidity review",
        session: "London / NY",
        risk: "Balanced",
        description:
            "Gold market context from TradingView. Review price structure, liquidity, and session direction.",
        border: "gold",
    },
    {
        symbol: "US 500",
        tradingViewSymbol: "OANDA:SPX500USD",
        status: "Review",
        statusType: "review",
        subtitle: "Index market watch",
        session: "US market",
        risk: "Medium",
        description:
            "Track US equity index movements and review price trends, momentum, and market volatility.",
        border: "green",
    },
    {
        symbol: "BTC/USD",
        tradingViewSymbol: "BINANCE:BTCUSDT",
        status: "Review",
        statusType: "review",
        subtitle: "Breakout review",
        session: "Crypto market",
        risk: "Medium",
        description:
            "Crypto market context from TradingView. Monitor momentum and changing market conditions.",
        border: "green",
    },
    {
        symbol: "EUR/USD",
        tradingViewSymbol: "OANDA:EURUSD",
        status: "Review",
        statusType: "review",
        subtitle: "Macro pair watch",
        session: "London / NY",
        risk: "Low",
        description:
            "Forex market context from TradingView. Consider economic events and currency-market volatility.",
        border: "red",
    },
];


function TradingViewChart({ symbol, visible }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!visible || !chartRef.current) return;

        const container = chartRef.current;
        container.innerHTML = "";

        const widget = document.createElement("div");
        widget.className = "tradingview-widget-container";
        widget.style.width = "100%";
        widget.style.height = "100%";

        const widgetBody = document.createElement("div");
        widgetBody.className = "tradingview-widget-container__widget";
        widgetBody.style.width = "100%";
        widgetBody.style.height = "100%";

        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.async = true;
        script.type = "text/javascript";

        script.innerHTML = JSON.stringify({
            symbols: [[symbol, `${symbol}|1D`]],
            chartOnly: false,
            width: "100%",
            height: "100%",
            locale: "en",
            colorTheme: "dark",
            autosize: true,
            showVolume: false,
            showMA: false,
            hideDateRanges: true,
            hideMarketStatus: true,
            hideSymbolLogo: false,
            scalePosition: "right",
            scaleMode: "Normal",
            fontFamily: "Inter, sans-serif",
            fontSize: "10",
            noTimeScale: false,
            valuesTracking: "1",
            changeMode: "price-and-percent",
            chartType: "area",
            lineWidth: 2,
            lineType: 0,
            dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D"],
            backgroundColor: "rgba(10, 10, 12, 0)",
            gridLineColor: "rgba(255, 255, 255, 0.05)",
            upColor: "#00c896",
            downColor: "#f04452",
            borderUpColor: "#00c896",
            borderDownColor: "#f04452",
            wickUpColor: "#00c896",
            wickDownColor: "#f04452",
            isTransparent: true,
        });

        widget.appendChild(widgetBody);
        widget.appendChild(script);
        container.appendChild(widget);

        return () => {
            container.innerHTML = "";
        };
    }, [symbol, visible]);

    return <div className="signal-chart" ref={chartRef} />;
}



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

function SignalCard({ signal, index, visible }) {
    return (
        <article
            className={`signal-card signal-card-${signal.border} ${visible ? "signal-card-visible" : ""
                }`}
            style={{ "--signal-delay": `${index * 170}ms` }}
        >
            <div className="signal-card-top">
                <h3>{signal.symbol}</h3>

                <span className={`signal-status status-${signal.statusType}`}>
                    {signal.status}
                </span>
            </div>

            <p className="signal-subtitle">
                {signal.subtitle}
                <span className="signal-dot">•</span>
                {signal.session}
            </p>

            <div className="signal-chart-frame">
                <TradingViewChart
                    symbol={signal.tradingViewSymbol}
                    visible={visible}
                />
            </div>

            <div className="signal-meta">
                <div className="signal-meta-item">
                    <span className="signal-meta-label">SOURCE</span>
                    <strong>TradingView</strong>
                </div>

                <div className="signal-meta-item">
                    <span className="signal-meta-label">RISK PROFILE</span>
                    <strong>{signal.risk}</strong>
                </div>
            </div>

            <p className="signal-description">{signal.description}</p>

            <div className="signal-card-footer">
                <span className="signal-live-dot" />
                <span>Market data by TradingView</span>
            </div>
        </article>
    );
}



export default function Home() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [openIndex, setOpenIndex] = useState(0);

    const [isVisible, setIsVisible] = useState(false);
    const [faqVisible, setFaqVisible] = useState(false);

    const sectionRef = useRef(null);
    const faqRef = useRef(null);

    const current = testimonials[activeIndex];

    const tradingSignalsRef = useRef(null);
    const [signalsVisible, setSignalsVisible] = useState(false);

    useEffect(() => {
        const section = tradingSignalsRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSignalsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    // Auto-slide testimonials every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Previous testimonial
    const previousSlide = () => {
        setActiveIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    // Next testimonial
    const nextSlide = () => {
        setActiveIndex((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    // About section animation observer
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.05,
                rootMargin: "0px",
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    // FAQ section animation observer
    useEffect(() => {
        const section = faqRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setFaqVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.05,
                rootMargin: "0px",
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
                            <Link to="/contact-us" className="hero-btn primary-btn">
                                Start Trading
                            </Link>

                            <Link to="/services/forex" className="hero-btn secondary-btn">
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

                        <Link to="/portfolio" className="about-cta">
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
                                        {/* <FaArrowRight /> */}
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

            <section
                ref={tradingSignalsRef}
                id="trading-signals"
                className={`trading-signals-section ${signalsVisible ? "signals-section-visible" : ""
                    }`}
            >
                <div className="signals-container">
                    <header className="signals-heading">
                        <span className="signals-eyebrow">
                            <span className="signals-eyebrow-line" />
                            MARKET INTELLIGENCE
                        </span>

                        <h2 className="signals-title">
                            Real-time Trading Signals - <br />
                            <span> Free &amp; Premium</span>
                        </h2>

                        <p className="signals-intro">
                            Explore live market charts and market context across gold,
                            indices, crypto, and forex. These cards are for educational
                            market review, not automated trade execution.
                        </p>
                    </header>

                    <div className="signals-grid">
                        {signals.map((signal, index) => (
                            <SignalCard
                                key={signal.symbol}
                                signal={signal}
                                index={index}
                                visible={signalsVisible}
                            />
                        ))}
                    </div>

                    <p className="signals-disclaimer">
                        Market data availability and refresh frequency depend on the
                        instrument and provider. Trading involves risk, and market
                        context cannot guarantee future results.
                    </p>
                </div>
            </section>

            <section
                className={`faq-section ${faqVisible ? "is-visible" : ""}`}
                id="faq"
                ref={faqRef}
            >
                <div className="faq-container">
                    <div className="faq-layout">
                        {/* LEFT CONTENT */}
                        <div className="faq-intro">
                            <span className="faq-eyebrow">
                                GOT QUESTIONS?
                            </span>

                            <h2>
                                Frequently Asked
                                <br />
                                <span>Questions</span>
                            </h2>

                            <p className="faq-intro-text">
                                Everything you need to know about getting started,
                                our services, pricing, and how Shenron Global works.
                            </p>

                            <div className="faq-help-card">
                                <div className="faq-help-icon">
                                    <FaArrowRight />
                                </div>

                                <div className="faq-help-content">
                                    <h3>Still have questions?</h3>
                                    <p>
                                        Our team can help you understand our services
                                        and find the right information.
                                    </p>
                                    <a href="#contact" className="faq-contact-link">
                                        Contact our team
                                        <FaArrowRight />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT ACCORDION */}
                        <div className="faq-list">
                            {faqs.map((faq, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <article
                                        className={`faq-item ${isOpen ? "active" : ""}`}
                                        key={faq.question}
                                        style={{ "--faq-index": index }}
                                    >
                                        <button
                                            className="faq-question"
                                            type="button"
                                            aria-expanded={isOpen}
                                            onClick={() =>
                                                setOpenIndex(isOpen ? -1 : index)
                                            }
                                        >
                                            <span className="faq-question-content">
                                                <span className="faq-number">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>

                                                <span className="faq-question-text">
                                                    {faq.question}
                                                </span>
                                            </span>

                                            <span className="faq-toggle">
                                                {isOpen ? <FaMinus /> : <FaPlus />}
                                            </span>
                                        </button>

                                        <div
                                            className={`faq-answer ${isOpen ? "faq-answer-open" : ""
                                                }`}
                                            aria-hidden={!isOpen}
                                        >
                                            <div className="faq-answer-inner">
                                                <span className="faq-category">
                                                    {faq.category}
                                                </span>
                                                <p>{faq.answer}</p>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    <div className="faq-bottom-line">
                        <span />
                        <p>
                            Clear information. Transparent fees. Informed decisions.
                        </p>
                        <span />
                    </div>
                </div>
            </section>

            <section className="testimonials-section" id="testimonials">
                <div className="testimonials-container">
                    <div className="testimonials-top">
                        <div className="testimonials-heading">
                            <span className="testimonials-eyebrow">
                                <span className="testimonial-eyebrow-line" />
                                CLIENT EXPERIENCES
                            </span>

                            <h2>
                                Trust built on <br />
                                <span> clarity & confidence.</span>
                            </h2>

                            <p className="testimonials-description">
                                Discover how a more structured perspective on the markets
                                can shape the overall trading experience.
                            </p>
                        </div>

                        <div className="testimonials-review-summary">
                            <div className="review-stars" aria-label="5 out of 5 stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar key={star} />
                                ))}
                            </div>
                            <strong>Client perspectives</strong>
                            <span>Experiences that matter</span>
                        </div>
                    </div>

                    <div className="testimonial-slider">
                        <div className="testimonial-slide" key={activeIndex}>
                            <div className="testimonial-card-main">
                                <div className="testimonial-card-top">
                                    <div className="testimonial-quote-icon">
                                        <FaQuoteRight />
                                    </div>

                                    <span className="testimonial-tag">{current.tag}</span>
                                </div>

                                <div className="testimonial-card-content">
                                    <div className="testimonial-stars">
                                        {[...Array(current.rating)].map((_, index) => (
                                            <FaStar key={index} />
                                        ))}
                                    </div>

                                    <h3>{current.title}</h3>

                                    <p className="testimonial-message">
                                        “{current.message}”
                                    </p>
                                </div>

                                <div className="testimonial-card-footer">
                                    <div className="testimonial-person">
                                        <div className="testimonial-avatar">
                                            {current.initials}
                                        </div>

                                        <div className="testimonial-person-info">
                                            <strong>{current.name}</strong>
                                            <span>{current.role}</span>
                                        </div>
                                    </div>

                                    <div className="testimonial-client-note">
                                        <FaCheckCircle />
                                        <span>Client perspective</span>
                                    </div>
                                </div>
                            </div>

                            <div className="testimonial-side-panel">
                                <div className="side-panel-decoration">
                                    <span className="side-decoration-circle circle-one" />
                                    <span className="side-decoration-circle circle-two" />
                                    <span className="side-decoration-circle circle-three" />
                                    <div className="side-quote-mark">“</div>
                                </div>

                                <span className="side-panel-label">THE SHENRON APPROACH</span>

                                <h3>
                                    Better informed.
                                    <br />
                                    More intentional.
                                    <br />
                                    <span>Always evolving.</span>
                                </h3>

                                <p>
                                    Market perspectives, thoughtful analysis, and a
                                    continued focus on understanding risk.
                                </p>

                                <div className="side-panel-bottom">
                                    <span className="side-panel-line" />
                                    <span>INSIGHT · DISCIPLINE · CLARITY</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-controls">
                        <div className="testimonial-slide-count">
                            <span className="testimonial-current-number">
                                {String(activeIndex + 1).padStart(2, "0")}
                            </span>
                            <span className="testimonial-count-divider" />
                            <span className="testimonial-total-number">
                                {String(testimonials.length).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="testimonial-dots" aria-label="Choose testimonial">
                            {testimonials.map((item, index) => (
                                <button
                                    key={item.name}
                                    type="button"
                                    className={`testimonial-dot ${activeIndex === index ? "active" : ""
                                        }`}
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`Show testimonial ${index + 1}`}
                                    aria-pressed={activeIndex === index}
                                />
                            ))}
                        </div>

                        <div className="testimonial-arrows">
                            <button
                                type="button"
                                className="testimonial-arrow"
                                onClick={previousSlide}
                                aria-label="Previous testimonial"
                            >
                                <FaArrowLeft />
                            </button>

                            <button
                                type="button"
                                className="testimonial-arrow testimonial-arrow-next"
                                onClick={nextSlide}
                                aria-label="Next testimonial"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
