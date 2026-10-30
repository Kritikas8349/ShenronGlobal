import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChartLine,
  FaCompass,
  FaGlobeAmericas,
  FaShieldAlt,
} from "react-icons/fa";
import "./Comex.css";

import marketImage from "../assets/comex.png";
import goldImage from "../assets/goldImg.png";


const silverImage =
  "https://images.unsplash.com/photo-1720637595085-cd0b84ed67ad?auto=format&fit=crop&w=1000&q=85";

const overviewItems = [
  {
    number: "01",
    icon: FaGlobeAmericas,
    title: "What is the COMEX market?",
    text: "A major metals futures market where gold and silver prices respond to supply, demand, economic data, and global market trends.",
  },
  {
    number: "02",
    icon: FaChartLine,
    title: "How do traders approach it?",
    text: "Read price trends alongside trading hours, market news, and event risk before assessing a futures opportunity.",
  },
  {
    number: "03",
    icon: FaShieldAlt,
    title: "How does Shenron assist?",
    text: "Our desk brings research, market updates, and risk context together to help you assess your own decisions.",
  },
];

const serviceItems = [
  {
    number: "01",
    icon: FaCompass,
    title: "Commodity research",
    text: "Daily context around gold, silver, oil, dollar strength, yields, and global risk appetite.",
    meta: "MARKET CONTEXT",
  },
  {
    number: "02",
    icon: FaChartLine,
    title: "Market updates",
    text: "Notes on reversals, breakout attempts, session highs and lows, and relevant data releases.",
    meta: "SESSION NOTES",
  },
  {
    number: "03",
    icon: FaShieldAlt,
    title: "Risk-first ideas",
    text: "Trade scenarios with entry ranges, invalidation and target levels, plus cautions around sharp moves.",
    meta: "RISK CONTEXT",
  },
];

const plans = [
  {
    name: "COMEX Basic",
    category: "CORE SIGNALS",
    prices: { monthly: "AED 349", quarterly: "AED 899", yearly: "AED 2,999" },
    description:
      "Core commodity signals and market updates for quick, disciplined COMEX participation.",
    features: [
      "1-2 focused trade ideas per day",
      "Risk/reward up to 1:1.5",
      "Around 1500 pips monthly target context",
      "Scalping-based signals",
      "Commodity-focused economic calendar and market news",
    ],
  },
  {
    name: "COMEX Plus",
    category: "ENHANCED RESEARCH",
    prices: { monthly: "AED 499", quarterly: "AED 1,299", yearly: "AED 4,499" },
    description:
      "More frequent commodity signals with research, session context and practical sizing guidance.",
    recommended: true,
    features: [
      "1-3 curated setups per day",
      "Risk/reward up to 1:2.5",
      "Around 2500 pips monthly target context",
      "Scalping and day-trade setups",
      "Weekly commentary, sizing guidance and macro/inventory updates",
    ],
  },
  {
    name: "COMEX Pro",
    category: "DEDICATED SUPPORT",
    prices: { monthly: "AED 799", quarterly: "AED 1,999", yearly: "AED 6,999" },
    description:
      "Professional commodity signals, research and dedicated support for advanced traders.",
    features: [
      "3-4 highly vetted setups per day",
      "Risk/reward up to 1:8",
      "Around 4000 pips monthly target context",
      "Day trades, swing setups and ICT-based sniper entries",
      "Dedicated relationship manager and in-depth inventory analysis",
    ],
  },
];

const billingPeriods = ["monthly", "quarterly", "yearly"];

function Eyebrow({ children, light = false }) {
  return (
    <span className={`comex-eyebrow${light ? " is-light" : ""}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  );
}



function ComexHero() {
  return (
    <section className="comex-hero" aria-labelledby="comex-title">

      <div className="comex-hero-layout comex-container">
        <div className="comex-hero-copy">
          <Eyebrow>GOLD · SILVER · OIL · MARKET CONTEXT</Eyebrow>
          <h1 id="comex-title">
            Gold, silver and commodity guidance <em>for active traders.</em>
          </h1>
          <p>
            Get COMEX-focused recommendations, market analysis, and strategy
            notes for precious metals and commodity-linked opportunities.
          </p>
          <div className="comex-hero-actions">
            <a className="comex-button comex-button--dark" href="#plans">
              View membership options <FaArrowRight aria-hidden="true" />
            </a>
            <Link className="comex-button comex-button--outline" to="/contact-us">
              Book consultation
            </Link>
          </div>
          <div className="comex-coverage" aria-label="COMEX desk coverage">
            <span>DESK COVERAGE</span>
            <strong>XAU/USD</strong><i aria-hidden="true" />
            <strong>Silver</strong><i aria-hidden="true" />
            <strong>Oil</strong><i aria-hidden="true" />
            <strong>Macro events</strong>
          </div>
        </div>

        <figure className="comex-hero-visual">
          <img
            src={marketImage}
            alt="Trader reviewing market charts on a tablet beside a monitor"
            fetchPriority="high"
            decoding="async"
            onError={(event) => { event.currentTarget.hidden = true; }}
          />
          <div className="comex-hero-image-shade" aria-hidden="true" />
          <div className="comex-desk-card">
            <div className="comex-desk-card-heading">
              <span className="comex-live-dot" />
              <span>COMEX DESK</span>
              <strong>24/5</strong>
            </div>
            <p>Research-led recommendations, risk context, market updates, and execution notes.</p>
            <div className="comex-desk-tags">
              <span>Gold</span><span>Silver</span><span>Oil</span><span>Macro</span>
            </div>
          </div>
        </figure>
      </div>

      <div className="comex-hero-bottom comex-container">
        <span>Structured guidance for changing commodity markets.</span>
        <a href="#comex-intro">Explore the desk <FaArrowRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}


function Introduction() {
  return (
    <section className="comex-intro comex-container" id="comex-intro">
      <div className="comex-intro-copy">
        <Eyebrow>INTRODUCTION</Eyebrow>
        <h2>COMEX trading guidance <em>with risk in view.</em></h2>
        <p>
          Get COMEX market analysis and strategy notes for gold, silver, oil, and
          related markets. Our desk shares research to help traders understand
          price movements and assess potential setups.
        </p>
        <p>
          Trading hours, exchange schedules, and holidays can shape futures
          activity. Check the latest calendar when planning around gold and
          silver sessions.
        </p>
        <p>
          Whether you are exploring COMEX markets or looking for commodity trading insights,
          Shenron Global focuses on market analysis, structured guidance, and risk awareness.
          Trading involves risk, and no recommendation guarantees profits.
        </p>
        <a className="comex-text-link" href="#overview">
          Understand the desk <FaArrowRight aria-hidden="true" />
        </a>
      </div>

      <div className="comex-intro-visuals" role="group" aria-label="Gold and silver market imagery">
        <figure className="comex-intro-photo comex-intro-photo--gold">
          <img src={goldImage} alt="Gold bullion bars" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.hidden = true; }} />
          <figcaption><span>01</span><strong>Gold futures</strong></figcaption>
        </figure>
        <figure className="comex-intro-photo comex-intro-photo--silver">
          <img src={silverImage} alt="Polished silver bullion bars" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.hidden = true; }} />
          <figcaption><span>02</span><strong>Silver futures</strong></figcaption>
        </figure>
        <div className="comex-intro-note">
          <span>RESEARCH LENS</span>
          <strong>Price action, market drivers, and risk context.</strong>
        </div>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <section className="comex-overview comex-section" id="overview">
      <div className="comex-section-heading comex-container">
        <div>
          <Eyebrow>COMEX OVERVIEW</Eyebrow>
          <h2>Understand the market <em>before the recommendation.</em></h2>
        </div>
        <p>
          A clearer view of the futures market, the way traders prepare, and the
          research Shenron brings to the conversation.
        </p>
      </div>
      <div className="comex-overview-grid comex-container">
        {overviewItems.map(({ number, icon: Icon, title, text }) => (
          <article className="comex-overview-card" key={number}>
            <div className="comex-card-topline"><span>{number}</span><i><Icon aria-hidden="true" /></i></div>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="comex-card-rule" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="comex-services comex-section" id="services">
      <div className="comex-section-heading comex-container">
        <div>
          <Eyebrow light>WHAT YOU GET</Eyebrow>
          <h2>Research, updates, <em>and actionable guidance.</em></h2>
        </div>
        <p>
          COMEX trading insights, gold and silver market updates, futures-session
          context, and risk-focused recommendations for evaluating opportunities.
        </p>
      </div>
      <div className="comex-service-grid comex-container">
        {serviceItems.map(({ number, icon: Icon, title, text, meta }) => (
          <article className="comex-service-card" key={number}>
            <div className="comex-service-card-top"><span>{number}</span><Icon aria-hidden="true" /></div>
            <span className="comex-service-meta">{meta}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="comex-service-line" aria-hidden="true" />
          </article>
        ))}
      </div>
      <div className="comex-service-foot comex-container">
        <span>Ideas are shared for information and discussion.</span>
        <a href="#plans">Compare memberships <FaArrowRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function PlansSection() {
  const [period, setPeriod] = useState("monthly");
  const periodLabel = period[0].toUpperCase() + period.slice(1);
  const periodUnit = { monthly: "mo", quarterly: "qtr", yearly: "yr" }[period];
  const billingMessage = `${periodLabel} COMEX package prices shown in AED.`;

  return (
    <section className="comex-plans comex-section" id="plans">
      <div className="comex-section-heading comex-container comex-plans-heading">
        <div>
          <Eyebrow>MEMBERSHIP OPTIONS</Eyebrow>
          <h2>Comex Membership &amp; <em>Packages</em></h2>
        </div>
        <p>Select monthly, quarterly or yearly billing. Prices are listed in AED as per the current COMEX service package sheet.</p>
      </div>

      <div className="comex-billing comex-container">
        <div className="comex-billing-switch" role="group" aria-label="Billing period">
          {billingPeriods.map((option) => (
            <button
              type="button"
              key={option}
              className={period === option ? "is-selected" : ""}
              aria-pressed={period === option}
              onClick={() => setPeriod(option)}
            >
              {option[0].toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
        <p aria-live="polite">{billingMessage}</p>
      </div>

      <div className="comex-plan-grid comex-container">
        {plans.map((plan) => (
          <article className={`comex-plan-card${plan.recommended ? " is-recommended" : ""}`} key={plan.name}>
            <div className="comex-plan-topline">
              <span>{plan.category}</span>
            </div>
            <div className="comex-plan-price"><strong>{plan.prices[period]}</strong><span>/{periodUnit}</span></div>
            <h3>{plan.name}</h3>
            <p className="comex-plan-description">{plan.description}</p>
            <span className="comex-plan-divider" />
            <ul>
              {plan.features.map((feature) => <li key={feature}><i aria-hidden="true" />{feature}</li>)}
            </ul>
            <Link className={`comex-button ${plan.recommended ? "comex-button--dark" : "comex-button--plan"}`} to="/contact-us">
              Buy Now <FaArrowRight aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
      <p className="comex-plan-disclaimer comex-container">
        Pip targets and risk/reward figures are package-sheet context, not forecasts or guarantees. Pip values vary by instrument and provider. Confirm all current plan terms with the Shenron team.
      </p>
    </section>
  );
}


export default function Comex() {
  useEffect(() => {
    if (window.customElements?.get("tv-ticker-tape")) return;
    if (document.getElementById("tradingview-ticker-tape-script")) return;

    const script = document.createElement("script");
    script.id = "tradingview-ticker-tape-script";
    script.type = "module";
    script.src = "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";
    document.head.appendChild(script);
  }, []);

  return (
    <main className="comex-page" id="comex-top">
      <ComexHero />
      <Introduction />
      <OverviewSection />
      <ServicesSection />
      <PlansSection />
    </main>
  );
}
