import { createElement, useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBitcoin,
  FaChartLine,
  FaEthereum,
  FaGlobe,
  FaLock,
  FaShieldAlt,
  FaSignal,
} from "react-icons/fa";
import "./Crypto.css";

const overview = [
  {
    number: "01",
    title: "What Is the Crypto Market?",
    text: "Crypto markets are digital-asset markets where traders participate in price movements across assets such as Bitcoin, Ethereum, and other major tokens.",
    icon: FaGlobe,
  },
  {
    number: "02",
    title: "How Traders Approach It",
    text: "A crypto workflow needs technical, fundamental, and sentiment context, alongside strict risk controls because price swings, liquidity gaps, and leverage can change quickly.",
    icon: FaChartLine,
  },
  {
    number: "03",
    title: "How Shenron Assists",
    text: "The Shenron desk frames crypto recommendations with entry, exit, stop-loss, and take-profit levels while emphasizing money management and capital protection.",
    icon: FaShieldAlt,
  },
];

const services = [
  {
    number: "01",
    title: "Crypto Research Notes",
    text: "Market structure, momentum, volatility, and narrative context for major digital assets.",
    icon: FaChartLine,
  },
  {
    number: "02",
    title: "Live Market Updates",
    text: "Updates around fast price movement, liquidity shifts, news, leverage pressure, and risk-on/risk-off rotations.",
    icon: FaSignal,
  },
  {
    number: "03",
    title: "Actionable Recommendations",
    text: "Ideas with entry, exit, stop-loss, and take-profit levels, with risk-to-reward framing.",
    icon: FaShieldAlt,
  },
];

const plans = [
  {
    name: "Crypto Essentials",
    price: "AED 1,299",
    description: "Standard crypto advisory with futures signals, portfolio ideas and major market updates.",
    features: [
      "Dedicated relationship manager with daily written briefings.",
      "Daily futures signals with entry/exit zones and R/R guidance.",
      "Spot portfolio recommendations and NFT highlights.",
      "Cross and isolated margin ideas with management notes.",
      "Farming/yield suggestions plus urgent Telegram or Discord alerts.",
    ],
  },
  {
    name: "Crypto Concierge",
    price: "AED 1,899",
    description: "Premium crypto support with deeper research, advanced allocation guidance and priority communication.",
    recommended: true,
    features: [
      "More frequent futures signals and intraday updates.",
      "Tailored portfolio allocation by risk profile and horizon.",
      "NFT due diligence, rarity analysis and flip timing.",
      "Advanced farming, protocol research and security assessments.",
      "On-chain analytics, tokenomics reports and scheduled check-ins.",
    ],
  },
];

function Eyebrow({ children }) {
  return <span className="crypto-eyebrow"><i aria-hidden="true" />{children}</span>;
}

function CoinArtwork() {
  return (
    <svg className="crypto-coin-art" viewBox="0 0 700 590" role="img" aria-labelledby="crypto-art-title crypto-art-description">
      <title id="crypto-art-title">Bitcoin and Ethereum digital coin illustration</title>
      <desc id="crypto-art-description">Original gold Bitcoin coin and silver Ethereum coin floating above a subtle blockchain grid.</desc>
      <defs>
        <radialGradient id="crypto-btc-face" cx="30%" cy="23%" r="78%">
          <stop stopColor="#fff0b6" /><stop offset=".26" stopColor="#edc46a" /><stop offset=".61" stopColor="#b87924" /><stop offset=".86" stopColor="#f2d17d" /><stop offset="1" stopColor="#805018" />
        </radialGradient>
        <linearGradient id="crypto-btc-edge" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff0bc" /><stop offset=".45" stopColor="#a76c20" /><stop offset=".72" stopColor="#f5d788" /><stop offset="1" stopColor="#8b5c23" />
        </linearGradient>
        <radialGradient id="crypto-eth-face" cx="27%" cy="22%" r="85%">
          <stop stopColor="#fff" /><stop offset=".42" stopColor="#e3e5e6" /><stop offset=".78" stopColor="#9ea2aa" /><stop offset="1" stopColor="#6d727b" />
        </radialGradient>
        <filter id="crypto-coin-shadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="15" /></filter>
        <linearGradient id="crypto-trace" x1="0" x2="1"><stop stopColor="#b7832d" stopOpacity="0" /><stop offset=".5" stopColor="#d9ae5e" stopOpacity=".65" /><stop offset="1" stopColor="#b7832d" stopOpacity="0" /></linearGradient>
      </defs>
      <g opacity=".55" stroke="#b7832d" strokeOpacity=".18" fill="none">
        <path d="M55 120h158l70 69h162l76-76h130M62 425h142l84-82h130l72 73h145M165 65v90l-62 62v124l72 73v85M533 62v104l61 60v113l-78 80v104" />
        <circle cx="213" cy="120" r="4" fill="#d9ae5e" /><circle cx="445" cy="189" r="4" fill="#d9ae5e" /><circle cx="203" cy="425" r="4" fill="#d9ae5e" /><circle cx="490" cy="416" r="4" fill="#d9ae5e" />
      </g>
      <ellipse cx="341" cy="465" rx="210" ry="37" fill="#6e4e1b" opacity=".13" filter="url(#crypto-coin-shadow)" />
      <g className="crypto-btc-coin" transform="rotate(-13 300 275)">
        <ellipse cx="294" cy="290" rx="153" ry="166" fill="#75501d" opacity=".24" />
        <ellipse cx="292" cy="273" rx="155" ry="166" fill="url(#crypto-btc-edge)" />
        <ellipse cx="292" cy="263" rx="139" ry="149" fill="url(#crypto-btc-face)" stroke="#fff0bd" strokeOpacity=".62" strokeWidth="2" />
        <ellipse cx="292" cy="263" rx="118" ry="127" fill="none" stroke="#80591f" strokeOpacity=".45" strokeWidth="1.5" />
        <text x="292" y="311" textAnchor="middle" fontFamily="Inter,Arial,sans-serif" fontSize="141" fontWeight="700" fill="#8b5b1d" opacity=".88">₿</text>
        <path d="M205 166c40-43 105-57 157-37" fill="none" stroke="#fff8dc" strokeOpacity=".66" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g className="crypto-eth-coin" transform="rotate(11 477 356)">
        <ellipse cx="480" cy="371" rx="92" ry="98" fill="#59616d" opacity=".25" />
        <ellipse cx="477" cy="356" rx="91" ry="98" fill="url(#crypto-eth-face)" stroke="#fff" strokeOpacity=".8" strokeWidth="2" />
        <path d="m477 284 53 73-53 31-52-31 52-73Zm0 115 53-31-53 82-52-82 52 31Z" fill="#7e8591" />
        <path d="m477 284v104l53-31-53-73Zm0 115 53-31-53 82-52-82 52 31Z" fill="#7e8591" opacity=".52" />
      </g>
      <path d="M72 507h556" stroke="url(#crypto-trace)" strokeWidth="1" />
      <path d="M114 499v16m94-9v9m94-9v9m94-9v9m94-9v9m94-16v16" stroke="#b7832d" strokeOpacity=".28" />
    </svg>
  );
}

function CryptoHero() {
  return (
    <section className="crypto-hero" id="top">
      <div className="crypto-hero-copy">
        <Eyebrow>CRYPTO DESK</Eyebrow>
        <h1>Crypto Market Recommendations <span>Built for Volatility</span></h1>
        <p>Get crypto recommendations, market insights and risk-aware strategy notes for Bitcoin, Ethereum and other major digital assets.</p>
        <div className="crypto-hero-actions">
          <a className="crypto-button crypto-button-primary" href="/services/crypto#plans">View Plans <FaArrowRight aria-hidden="true" /></a>
          <a className="crypto-button crypto-button-secondary" href="/contact">Book Consultation</a>
        </div>
        <ul className="crypto-coverage" aria-label="Crypto desk coverage">
          <li><FaBitcoin aria-hidden="true" />BTC</li><li><FaEthereum aria-hidden="true" />ETH</li><li>Altcoins</li><li><FaShieldAlt aria-hidden="true" />24/5 support</li>
        </ul>
      </div>
      <div className="crypto-hero-visual">
        <div className="crypto-visual-halo" />
        <div className="crypto-visual-overline"><span>DIGITAL ASSET RESEARCH</span><span>01 / 03</span></div>
        <CoinArtwork />
        <div className="crypto-market-panel crypto-panel-one"><span>CORE ASSETS</span><strong><FaBitcoin aria-hidden="true" /> Bitcoin <i>BTC</i></strong><strong><FaEthereum aria-hidden="true" /> Ethereum <i>ETH</i></strong></div>
        <div className="crypto-market-panel crypto-panel-two"><span>RESEARCH LENS</span><strong>Structure · Liquidity · Risk</strong></div>
        <span className="crypto-visual-caption">Research context for a changing market</span>
      </div>
    </section>
  );
}

function CryptoPlans() {
  const [period, setPeriod] = useState("monthly");
  const billingLabel = period === "monthly" ? "Monthly price" : `${period[0].toUpperCase()}${period.slice(1)} pricing requires confirmation`;

  return (
    <section className="crypto-section crypto-plans" id="plans" data-crypto-reveal>
      <div className="crypto-section-heading crypto-plans-heading">
        <div><Eyebrow>PLANS</Eyebrow><h2>Choose Your Guidance Level</h2></div>
        <p>Select monthly, quarterly or yearly billing. Prices are listed in AED as per the current service package sheet.</p>
      </div>
      <div className="crypto-billing-control">
        <span id="crypto-billing-label">Billing period</span>
        <div className="crypto-period-switch" role="group" aria-labelledby="crypto-billing-label">
          {["monthly", "quarterly", "yearly"].map((option) => <button type="button" key={option} className={period === option ? "is-selected" : ""} aria-pressed={period === option} onClick={() => setPeriod(option)}>{option[0].toUpperCase() + option.slice(1)}</button>)}
        </div>
        <p aria-live="polite">{period === "monthly" ? "Monthly package prices shown." : `${billingLabel}; monthly package prices remain shown until verified.`}</p>
      </div>
      <div className="crypto-plan-grid">{plans.map((plan) => <article className={`crypto-plan ${plan.recommended ? "is-recommended" : ""}`} key={plan.name}>
        <div className="crypto-plan-top"><span>{plan.recommended ? "PRIORITY SUPPORT" : "CORE MARKET GUIDANCE"}</span>{plan.recommended && <b>Recommended</b>}</div>
        <h3>{plan.name}</h3><p className="crypto-plan-description">{plan.description}</p>
        <div className="crypto-plan-price"><strong>{plan.price}</strong><span>/mo</span></div><span className="crypto-price-caption">{billingLabel}</span>
        <ul>{plan.features.map((feature) => <li key={feature}><i aria-hidden="true" />{feature}</li>)}</ul>
        <a className={`crypto-button ${plan.recommended ? "crypto-button-primary" : "crypto-button-secondary"}`} href="https://shenronglobal.com/contact" target="_blank" rel="noreferrer">Buy Now <FaArrowRight aria-hidden="true" /></a>
      </article>)}</div>
    </section>
  );
}

export default function Crypto() {
  useEffect(() => {
    const root = document.querySelector(".crypto-page");
    if (!root) return undefined;
    const sections = root.querySelectorAll("[data-crypto-reveal]");
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: .12 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="crypto-page">
      <CryptoHero />

      <section className="crypto-intro crypto-section" data-crypto-reveal>
        <div className="crypto-intro-visual" aria-hidden="true"><div className="crypto-intro-coin"><FaBitcoin /></div><div className="crypto-intro-eth"><FaEthereum /></div><span className="crypto-intro-orbit crypto-orbit-a" /><span className="crypto-intro-orbit crypto-orbit-b" /><span className="crypto-intro-note">BTC <i /> ETH <i /> DIGITAL ASSETS</span></div>
        <div className="crypto-intro-copy"><Eyebrow>CRYPTO RESEARCH</Eyebrow><h2>Crypto Trading Guidance and Risk Management Frameworks</h2>
          <p>Get crypto recommendations, market insights and risk-aware strategy notes for Bitcoin, Ethereum and other major digital assets.</p>
          <p>Our research helps traders understand market movements, evaluate opportunities, and approach digital-asset markets with a structured risk-management framework.</p>
          <div className="crypto-risk-inline"><FaShieldAlt aria-hidden="true" /><span>Crypto trading involves volatility, liquidity risks, and potential capital loss.</span></div>
        </div>
      </section>

      <section className="crypto-section crypto-overview" data-crypto-reveal>
        <div className="crypto-section-heading"><div><Eyebrow>MARKET OVERVIEW</Eyebrow><h2>Understand the Market Before the Recommendation</h2></div>
          <p>Start with the mechanics of digital assets, then add market context and a defined approach to risk.</p></div>
        <div className="crypto-overview-layout"><article className="crypto-overview-lead"><span className="crypto-overview-index">01 / THE LANDSCAPE</span><FaBitcoin aria-hidden="true" /><h3>{overview[0].title}</h3><p>{overview[0].text}</p><span className="crypto-overview-watermark" aria-hidden="true">₿</span></article>
          <div className="crypto-overview-rows">{overview.slice(1).map(({ number, title, text, icon: Icon }) => <article className="crypto-overview-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div>{createElement(Icon, { "aria-hidden": true })}</article>)}</div>
        </div>
      </section>

      <section className="crypto-section crypto-services" data-crypto-reveal>
        <div className="crypto-section-heading"><div><Eyebrow>WHAT YOU GET</Eyebrow><h2>Crypto Research, Updates and Actionable Guidance</h2></div>
          <p>Get research-driven crypto insights, digital-asset market updates, and risk-focused recommendations to help evaluate market opportunities.</p></div>
        <div className="crypto-service-layout"><article className="crypto-service-feature"><div className="crypto-service-feature-art"><div className="crypto-token-ring"><FaEthereum aria-hidden="true" /></div><span>MARKET STRUCTURE / VOLATILITY / NARRATIVE</span></div>
          <span className="crypto-service-number">01 / RESEARCH</span><h3>{services[0].title}</h3><p>{services[0].text}</p></article>
          <div className="crypto-service-list">{services.slice(1).map(({ number, title, text, icon: Icon }) => <article className="crypto-service-row" key={number}><div className="crypto-service-icon">{createElement(Icon, { "aria-hidden": true })}</div><div><span>{number}</span><h3>{title}</h3><p>{text}</p></div><FaArrowRight aria-hidden="true" /></article>)}</div>
        </div>
      </section>

      <CryptoPlans />

      <section className="crypto-risk-section" data-crypto-reveal>
        <div className="crypto-risk-emblem"><FaLock aria-hidden="true" /><span>RISK<br />FIRST</span></div>
        <div className="crypto-risk-copy"><Eyebrow>RISK AWARENESS</Eyebrow><h2>Market Recommendations Do Not Remove Trading Risk</h2>
          <p>Crypto trading is highly volatile and may involve liquidity, slippage, exchange, custody and leverage risks. Recommendations are informational and should be tested against your own rules.</p></div>
        <a className="crypto-button crypto-button-secondary" href="https://shenronglobal.com/legal/risk-disclosure" target="_blank" rel="noreferrer">Read Full Risk Disclosure <FaArrowRight aria-hidden="true" /></a>
      </section>

      <section className="crypto-final" data-crypto-reveal>
        <div><Eyebrow>CRYPTO DESK / SHENRON GLOBAL</Eyebrow><h2>Bring a clearer framework to your next market decision.</h2><p>Talk with our team about crypto research, guidance and the support that fits your approach.</p></div>
        <a className="crypto-button crypto-button-primary" href="/contact">Book Consultation <FaArrowRight aria-hidden="true" /></a>
        <span className="crypto-final-orbit" aria-hidden="true" />
      </section>
    </main>
  );
}
