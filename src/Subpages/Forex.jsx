import { useEffect } from "react";
import { useState } from "react";
import {
  FaArrowRight,
  FaBalanceScale,
  FaCalendarAlt,
  FaCheck,
  FaChartLine,
  FaClock,
  FaGlobe,
  FaLayerGroup,
  FaShieldAlt,
  FaStream,
} from "react-icons/fa";
import "./Forex.css";

import forexHero from "../assets/forexHero.png";
import EnquiryPopup from "../pages/EnquiryPopup";


const stats = [
  ["100k+", "Traders in community"],
  ["28", "Pairs under coverage"],
  ["24/5", "Session desk hours"],
  ["4", "Global sessions tracked"],
];

const features = [
  { number: "01", icon: <FaClock />, title: "Session Structure", text: "Sydney to New York: where liquidity builds and where it evaporates." },
  { number: "02", icon: <FaLayerGroup />, title: "Correlation Map", text: "See which pairs are telling the same story before you double your risk." },
  { number: "03", icon: <FaChartLine />, title: "Volatility Bands", text: "Expected range first, conviction second. Size to the market, not the mood." },
  { number: "04", icon: <FaCalendarAlt />, title: "Economic Calendar", text: "CPI, FOMC, central bank speeches - flagged with expected impact." },
  { number: "05", icon: <FaStream />, title: "Trade Journal", text: "Three fields per trade, one weekly review pass. Discipline that sticks." },
  { number: "06", icon: <FaGlobe />, title: "Live Market Desk", text: "Written commentary during London and New York overlaps." },
  { number: "07", icon: <FaBalanceScale />, title: "Position Sizing", text: "Match trade size to stop distance and a clear account risk limit." },
  { number: "08", icon: <FaShieldAlt />, title: "Risk Guardrails", text: "Set daily loss limits, invalidation levels, and exposure caps before trading." },
];

const packages = [
  {
    name: "Forex Starter",
    category: "STARTER PACKAGE",
    prices: { monthly: "499", quarterly: "1,299", yearly: "3,999" },
    description: "A simple, repeatable risk process for new traders.",
    features: [
      "2-3 curated trade ideas each day",
      "Typical targets around 1:1 risk/reward",
      "70-75% stated accuracy range",
      "Daily economic calendar, newsletter and data bulletins",
      "SMC-focused technical analysis with stop-loss zones",
    ],
  },
  {
    name: "Forex Pro",
    category: "PRO PACKAGE",
    prices: { monthly: "1,099", quarterly: "2,699", yearly: "8,999" },
    description: "Professional signals and risk support for funded traders.",
    features: [
      "4-5 handpicked setups per day",
      "Potential setups around 1:3 risk/reward",
      "85-90% stated accuracy range",
      "Daily live briefings with daily and weekly calendars",
      "Research reports, real-time assistance and dedicated account manager",
    ],
  },
];

const billingPeriods = [
  { key: "monthly", label: "Monthly", unit: "mo" },
  { key: "quarterly", label: "Quarterly", unit: "qtr" },
  { key: "yearly", label: "Yearly", unit: "yr" },
];

const method = [
  ["01", "Read the session", "Start with liquidity and time of day before any chart pattern."],
  ["02", "Write the plan", "Entry, invalidation, size - on paper before the click."],
  ["03", "Review the tape", "Log the outcome against the original thesis, weekly."],
];

const overviewCards = [
  {
    number: "01",
    icon: <FaChartLine />,
    title: "What is the Forex market?",
    text: "Forex is the global market where traders buy and sell currency pairs as exchange rates move across international sessions.",
    link: "#market-board",
    label: "Explore live markets",
  },
  {
    number: "02",
    icon: <FaLayerGroup />,
    title: "How traders approach it",
    text: "A disciplined workflow combines technical levels, macro awareness, session timing and position sizing before a trade is placed.",
    link: "#method",
    label: "See the routine",
  },
  {
    number: "03",
    icon: <FaGlobe />,
    title: "How Shenron assists",
    text: "The desk organizes market context into scenarios with entry, invalidation, target and risk notes for your own decision-making.",
    link: "#features",
    label: "Inside the desk",
  },
];

// const faqs = [
//   ["Do you give buy and sell signals?", "We publish market context and structured scenarios with defined entry, invalidation, and target levels. You make the final execution decision."],
//   ["Which forex sessions do you cover?", "The desk tracks four global sessions and describes session structure from Sydney through London and New York. Written commentary is specified during London and New York overlaps; no additional service hours are stated here."],
//   ["What delivery channels are used for signals?", "Delivery channel details are pending confirmation."],
//   ["Is there a free trial available?", "You can request the free trial through the trial call to action. Duration and terms have not been specified."],
// ];

function InactiveAction({ children, className = "" }) {
  return <button className={className} type="button" disabled title="A destination has not been configured yet">{children}</button>;
}

export default function Forex() {
  // const [openFaq, setOpenFaq] = useState(0);
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const selectedBillingPeriod = billingPeriods.find((period) => period.key === billingPeriod);

  useEffect(() => {
    if (window.customElements?.get("tv-ticker-tape")) return;
    if (document.getElementById("forex-tradingview-ticker")) return;

    const script = document.createElement("script");
    script.id = "forex-tradingview-ticker";
    script.type = "module";
    script.src = "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const root = document.querySelector(".forex-page");
    if (!root) return undefined;
    const sections = root.querySelectorAll("[data-forex-reveal]");
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

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <main className="forex-page" id="top">
      <section className="forex-hero">
        <div className="forex-hero-content">
          <span className="forex-eyebrow"><i /> FOREX DESK</span>
          <h1>Forex Signals That <span>Deliver Real Results</span></h1>
          <p className="forex-hero-lede">Currency-pair recommendations, session analysis and risk context.</p>
          <p className="forex-hero-description">Read majors, minors and exotics through session structure, correlation, liquidity and volatility bands. Understand the context behind a move before deciding whether it fits your plan.</p>
          <div className="forex-hero-actions">
            <a
              className="forex-button forex-button-primary"
              href="https://wa.me/971565702852"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claim your free trial <FaArrowRight />
            </a>
            <a
              onClick={() => setIsEnquiryOpen(true)}
              type="button"
              className="forex-button forex-button-secondary"
            >
              Book your call
            </a>
          </div>
          <div className="forex-stats" aria-label="Forex desk statistics">
            {stats.map(([value, label]) => <div className="forex-stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </div>
        <div className="forex-image-space" aria-hidden="true">
          <img
            src={forexHero}
            alt=""
            className="forex-trading-image"
          />
        </div>

      </section>

      <section className="forex-features forex-section" id="features" data-forex-reveal>
        <div className="forex-section-heading"><span className="forex-eyebrow">THE DAILY WORKFLOW</span><h2>Inside the <span className="forex-title-highlight">forex desk</span></h2><p>Cutting-edge tools built to make trading smarter and faster - every card here is part of the daily workflow.</p></div>
        <div className="forex-feature-grid">{features.map((feature) => <article className="forex-feature-card" key={feature.number}><div className="forex-feature-top"><span>{feature.number}</span><i>{feature.icon}</i></div><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
      </section>

      <section className="forex-packages forex-section" id="packages" data-forex-reveal>
        <div className="forex-section-heading"><span className="forex-eyebrow">MEMBERSHIP OPTIONS</span><h2>Forex Membership &<span className="forex-title-highlight"> Packages</span></h2><p>Select monthly, quarterly or yearly billing. Prices are listed in AED as per the current service package sheet.</p></div>
        <div className="forex-billing-control">
          {/* <span className="forex-billing-label" id="forex-billing-label">Billing period</span> */}
          <div className="forex-period-switch" role="group" aria-labelledby="forex-billing-label">
            {billingPeriods.map((period) => <button type="button" key={period.key} className={billingPeriod === period.key ? "is-selected" : ""} aria-pressed={billingPeriod === period.key} onClick={() => setBillingPeriod(period.key)}>{period.label}</button>)}
          </div>
          <p className="forex-billing-caption" aria-live="polite">{selectedBillingPeriod.label} package prices shown.</p>
        </div>
        <div className="forex-package-grid">{packages.map((plan, index) => <article className={`forex-package-card ${index === 1 ? "is-recommended" : ""}`} key={plan.name}>
          <span className="forex-package-category">{plan.category}</span>
          <h3>{plan.name}</h3>
          <p className="forex-package-description">{plan.description}</p>
          <div className="forex-price"><strong>AED {plan.prices[billingPeriod]}</strong><span>/{selectedBillingPeriod.unit}</span></div>
          <p className="forex-price-caption">{selectedBillingPeriod.label} price</p>
          <ul>{plan.features.map((item) => <li key={item}><FaCheck aria-hidden="true" />{item}</li>)}</ul>
          <a className={`forex-button ${index === 1 ? "forex-button-primary" : "forex-button-secondary"}`} href="/contact-us">Buy Now <FaArrowRight aria-hidden="true" /></a>
        </article>)}</div>
      </section>

      <section className="forex-market-board forex-section" id="market-board" data-forex-reveal>
        <div className="forex-section-heading forex-market-heading"><span className="forex-eyebrow">LIVE FOREX MARKET</span><h2>Major pairs on the <span className="forex-title-highlight">move.</span></h2><p>Follow current quotes for the most traded currency pairs while you explore the desk.</p></div>
        <div className="forex-live-panel">
          <div className="forex-live-panel-heading"><span><i aria-hidden="true" /> Live market feed</span><small>Major currency pairs</small></div>
          <tv-ticker-tape
            symbols="FX:EURUSD,FX:GBPUSD,FX:USDJPY,FX:AUDUSD,FX:USDCAD,FX:USDCHF"
            item-size="compact"
            hide-chart
            theme="light"
            transparent
          >
            <div className="forex-ticker-placeholder"><span className="forex-live-dot" /> Connecting to live FX quotes…</div>
          </tv-ticker-tape>
          <p className="forex-live-disclaimer">Market data provided by <a href="https://www.tradingview.com/markets/" target="_blank" rel="noreferrer">TradingView</a>. Quote availability and delay may vary by instrument and source.</p>
        </div>
      </section>

      <section className="forex-method forex-section" id="method" data-forex-reveal>
        <div className="forex-section-heading forex-method-heading"><span className="forex-eyebrow">A REPEATABLE ROUTINE</span><h2>Three moves, <span className="forex-method-highlight">every single session.</span></h2></div>
        <div className="forex-method-steps">{method.map(([number, title, text]) => <article className="forex-method-step" key={number}><span className="forex-method-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className="forex-overview forex-section" id="overview" data-forex-reveal>
        <div className="forex-section-heading"><span className="forex-eyebrow">FOREX OVERVIEW</span><h2>Understand the market <span>before the recommendation.</span></h2><p>Forex is the global marketplace for currency pairs, shaped by changing exchange rates and trading sessions around the world.</p></div>
        <div className="forex-overview-grid">{overviewCards.map((card) => <article className="forex-overview-card" key={card.number}>
          <div className="forex-overview-card-top"><span className="forex-overview-number">{card.number}</span><i aria-hidden="true">{card.icon}</i></div>
          <h3>{card.title}</h3><p>{card.text}</p>
          <a className="forex-overview-link" href={card.link}><span>{card.label}</span><i aria-hidden="true"><FaArrowRight /></i></a>
        </article>)}</div>
      </section>

      {/* <section className="forex-faq forex-section" id="faq" data-forex-reveal>
        <div className="forex-faq-heading"><span className="forex-eyebrow">CLEAR ANSWERS</span><h2>What traders ask us first</h2><p>Review the desk details before deciding whether it fits your approach.</p></div>
        <div className="forex-faq-list">{faqs.map(([question, answer], index) => <article className={`forex-faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><h3><button type="button" aria-expanded={openFaq === index} aria-controls={`forex-faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>{question}<span aria-hidden="true">{openFaq === index ? "\u2212" : "+"}</span></button></h3><div className="forex-faq-answer" id={`forex-faq-answer-${index}`} hidden={openFaq !== index}><p>{answer}</p></div></article>)}</div>
      </section> */}

      {/* <section className="forex-final-cta" id="final-cta" data-forex-reveal><div><span className="forex-eyebrow">FOREX DESK</span><h2>What can we help you achieve?</h2><p>Join the community, take the free trial, and see the forex desk in action for a week.</p></div><InactiveAction className="forex-button forex-button-primary">Book your FREE trial <FaArrowRight /></InactiveAction><a className="forex-back-link" href="#top">Back to the radar <FaArrowDown /></a></section> */}
      {isEnquiryOpen && (
                <EnquiryPopup
                    openOnMount={true}
                    onClose={() => setIsEnquiryOpen(false)}
                />
            )}
    </main>
  );
}

