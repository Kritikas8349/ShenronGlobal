import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowRight,
  FaCalendarAlt,
  FaChartLine,
  FaClock,
  FaGlobe,
  FaLayerGroup,
  FaShieldAlt,
  FaStream,
} from "react-icons/fa";
import "./Forex.css";

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
];

const packages = [
  {
    name: "STARTER",
    category: "Essential Coverage",
    price: "$699",
    features: [
      "Premium services & daily 3-4 signals",
      "Newsletter & Weekly Calendar",
      "Risk-to-Reward Ratio: 1:1.5 / 1:2",
      "Access to Experts Panel & Real-time global news stream",
      "Major economic updates & Risk profiling",
      "24/7 Assistance & Dedicated Relationship Manager",
    ],
    account: "$5,000",
  },
  {
    name: "PRO",
    badge: "Most Popular / Recommended",
    price: "$999",
    features: [
      "Daily 2-3 signals with Live monitoring",
      "Risk-to-Reward Ratio: 1:1 / 1:1.5",
      "Access to Experts Panel & Important News alerts",
      "Real-time global news stream & Major Economic updates",
      "Custom Risk profiling & 24/7 Assistance",
    ],
    account: "$500",
  },
  {
    name: "ELITE+",
    category: "Maximum Precision",
    price: "$1499",
    features: [
      "Daily 4-6 signals & High Accuracy Level",
      "Newsletter & Weekly Calendar with Pre-session briefing",
      "Risk-to-Reward Ratio: 1:2 / 1:4",
      "Sniper entries & Dynamic Market Strategies",
      "Access to Experts Panel & Real-time global news stream",
      "Dedicated Relationship Manager & 24/7 Assistance",
    ],
    account: "$10,000",
  },
];

const marketRows = [
  ["EUR/USD", "1.17092", "+0.26%"],
  ["GBP/USD", "1.36720", "+0.30%"],
  ["USD/JPY", "158.425", "-0.14%"],
  ["AUD/USD", "0.71644", "+0.72%"],
  ["GBP/JPY", "216.596", "-0.10%"],
  ["USD/CAD", "1.37464", "+0.08%"],
];

const method = [
  ["01", "Read the session", "Start with liquidity and time of day before any chart pattern."],
  ["02", "Write the plan", "Entry, invalidation, size - on paper before the click."],
  ["03", "Review the tape", "Log the outcome against the original thesis, weekly."],
];

const brokers = [
  ["MultiBank", "Lightning execution, deep institutional liquidity & zero slippage."],
  ["Vantage", "Ultra-tight spreads across major pairs with MT4 & MT5 integration."],
  ["OctaFX", "Beginner-friendly ecosystem with low entry deposit requirements."],
  ["Exness", "Instant automated withdrawals with robust global regulation."],
];

const faqs = [
  ["Do you give buy and sell signals?", "We publish market context and structured scenarios with defined entry, invalidation, and target levels. You make the final execution decision."],
  ["Which forex sessions do you cover?", "The desk tracks four global sessions and describes session structure from Sydney through London and New York. Written commentary is specified during London and New York overlaps; no additional service hours are stated here."],
  ["What delivery channels are used for signals?", "Delivery channel details are pending confirmation."],
  ["Is there a free trial available?", "You can request the free trial through the trial call to action. Duration and terms have not been specified."],
];

function InactiveAction({ children, className = "" }) {
  return <button className={className} type="button" disabled title="A destination has not been configured yet">{children}</button>;
}

function ForexMarketVisual() {
  const horizontal = [75, 135, 195, 255, 315];
  const vertical = [90, 190, 290, 390, 490, 590];
  return (
    <div className="forex-market-visual" role="img" aria-label="Illustrative forex session chart showing price movement between reference levels">
      <div className="forex-visual-heading"><span>SESSION MAP</span><span>ILLUSTRATIVE VIEW</span></div>
      <div className="forex-visual-symbol"><strong>FX</strong><span>STRUCTURE / LIQUIDITY / RISK</span></div>
      <svg className="forex-chart-graphic" viewBox="0 0 620 380" aria-hidden="true">
        <defs><linearGradient id="forex-chart-area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d4af63" stopOpacity=".22" /><stop offset="1" stopColor="#d4af63" stopOpacity="0" /></linearGradient></defs>
        {horizontal.map((y) => <line key={`h${y}`} x1="22" x2="598" y1={y} y2={y} stroke="rgba(212,175,99,.12)" />)}
        {vertical.map((x) => <line key={`v${x}`} x1={x} x2={x} y1="40" y2="340" stroke="rgba(212,175,99,.09)" />)}
        <path d="M26 273 C72 251 94 280 128 232 S182 209 213 221 S259 154 295 183 S341 205 370 147 S425 170 452 126 S512 139 542 91 S570 111 594 69 V340 H26Z" fill="url(#forex-chart-area)" />
        <path d="M26 273 C72 251 94 280 128 232 S182 209 213 221 S259 154 295 183 S341 205 370 147 S425 170 452 126 S512 139 542 91 S570 111 594 69" fill="none" stroke="#e4c77e" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 240 H594 M26 154 H594" stroke="#d4af63" strokeDasharray="5 7" strokeOpacity=".58" />
        <circle cx="452" cy="126" r="5" fill="#f5d38a" /><circle cx="452" cy="126" r="12" fill="#d4af63" fillOpacity=".15" />
        <g stroke="#c7a55e" strokeWidth="1.5"><path d="M86 202v57m-7-43h14m57-49v63m-7-48h14m61-36v63m-7-46h14m58-46v66m-7-52h14m59-13v61m-7-47h14m59-55v66m-7-53h14m60-34v57m-7-46h14m61-55v52m-7-43h14" /></g>
      </svg>
      <div className="forex-visual-legend"><span><i />Reference level</span><span><i />Session structure</span><span>Illustrative only</span></div>
      <div className="forex-session-stamp">LONDON<br /><b>→</b><br />NEW YORK</div>
    </div>
  );
}

export default function Forex() {
  const [openFaq, setOpenFaq] = useState(0);

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

  return (
    <main className="forex-page" id="top">
      <section className="forex-hero">
        <div className="forex-hero-content">
          <span className="forex-eyebrow"><i /> FOREX DESK</span>
          <h1>Forex Signals That <span>Deliver Real Results</span></h1>
          <p className="forex-hero-lede">Currency-pair recommendations, session analysis and risk context.</p>
          <p className="forex-hero-description">Read majors, minors and exotics through session structure, correlation, liquidity and volatility bands. Understand the context behind a move before deciding whether it fits your plan.</p>
          <div className="forex-hero-actions">
            <a className="forex-button forex-button-primary" href="#final-cta">Claim your free trial <FaArrowRight /></a>
            <InactiveAction className="forex-button forex-button-secondary">Book your call</InactiveAction>
          </div>
          <div className="forex-stats" aria-label="Forex desk statistics">
            {stats.map(([value, label]) => <div className="forex-stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </div>
        <ForexMarketVisual />
      </section>

      <section className="forex-features forex-section" id="features" data-forex-reveal>
        <div className="forex-section-heading"><span className="forex-eyebrow">THE DAILY WORKFLOW</span><h2>Inside the forex desk</h2><p>Cutting-edge tools built to make trading smarter and faster - every card here is part of the daily workflow.</p></div>
        <div className="forex-feature-grid">{features.map((feature) => <article className="forex-feature-card" key={feature.number}><div className="forex-feature-top"><span>{feature.number}</span><i>{feature.icon}</i></div><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
      </section>

      <section className="forex-packages forex-section" id="packages" data-forex-reveal>
        <div className="forex-section-heading"><span className="forex-eyebrow">MEMBERSHIP OPTIONS</span><h2>Forex Membership &amp; Packages</h2><p>Choose the membership package that fits your capital size and trading style. Transparent pricing with verified features.</p></div>
        <div className="forex-package-grid">{packages.map((plan) => <article className={`forex-package-card ${plan.badge ? "is-recommended" : ""}`} key={plan.name}>
          {plan.badge && <div className="forex-package-badge">{plan.badge}</div>}
          {plan.category && <span className="forex-package-category">{plan.category}</span>}<h3>{plan.name}</h3>
          <div className="forex-price">{plan.price}<span>Per subscription</span></div>
          <p className="forex-annual">Save 30% on Annual</p>
          <ul>{plan.features.map((item) => <li key={item}><FaArrowRight />{item}</li>)}</ul>
          <div className="forex-account"><span>Recommended account size</span><strong>{plan.account}</strong></div>
          <InactiveAction className="forex-button forex-button-secondary">Claim Package Access</InactiveAction>
        </article>)}</div>
      </section>

      <section className="forex-market-board forex-section" id="market-board" data-forex-reveal>
        <div className="forex-section-heading forex-market-heading"><span className="forex-eyebrow">DESK SNAPSHOT</span><h2>Numbers with context attached</h2><p>Illustrative desk snapshot. Every row on the live desk carries the reasoning behind the move.</p><span className="forex-snapshot-note">Illustrative snapshot - not live market data</span></div>
        <div className="forex-table-wrap"><table><thead><tr><th scope="col">Pair</th><th scope="col">Reference</th><th scope="col">Move</th></tr></thead><tbody>{marketRows.map(([pair, price, move]) => <tr key={pair}><th scope="row">{pair}</th><td>{price}</td><td className={move.startsWith("-") ? "is-negative" : "is-positive"}>{move}</td></tr>)}</tbody></table></div>
      </section>

      <section className="forex-method forex-section" id="method" data-forex-reveal>
        <div className="forex-section-heading"><span className="forex-eyebrow">A REPEATABLE ROUTINE</span><h2>Three moves, every single session.</h2></div>
        <div className="forex-method-steps">{method.map(([number, title, text]) => <article className="forex-method-step" key={number}><span className="forex-method-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className="forex-brokers forex-section" id="brokers" data-forex-reveal>
        <div className="forex-section-heading"><span className="forex-eyebrow">BROKER SOURCE COPY</span><h2>Top 4 Forex Brokers in 2025</h2><p>Forexnexa's Fab Four delivers unbeatable trading perks! From lightning-fast execution to spreads tighter than ever, these brokers redefine forex. Enjoy expert insights, robust platforms, and stellar support.</p><span className="forex-broker-disclaimer">Dated source listing; broker information and claims are not independently verified.</span></div>
        <div className="forex-broker-grid">{brokers.map(([name, description], index) => <article className="forex-broker-card" key={name}><span className="forex-broker-index">0{index + 1}</span><div className="forex-broker-monogram" aria-hidden="true">{name.slice(0, 1)}</div><h3>{name}</h3><p>{description}</p><InactiveAction className="forex-text-action">Join Now <FaArrowRight /></InactiveAction></article>)}</div>
      </section>

      <section className="forex-faq forex-section" id="faq" data-forex-reveal>
        <div className="forex-faq-heading"><span className="forex-eyebrow">CLEAR ANSWERS</span><h2>What traders ask us first</h2><p>Review the desk details before deciding whether it fits your approach.</p></div>
        <div className="forex-faq-list">{faqs.map(([question, answer], index) => <article className={`forex-faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><h3><button type="button" aria-expanded={openFaq === index} aria-controls={`forex-faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>{question}<span aria-hidden="true">{openFaq === index ? "âˆ’" : "+"}</span></button></h3><div className="forex-faq-answer" id={`forex-faq-answer-${index}`} hidden={openFaq !== index}><p>{answer}</p></div></article>)}</div>
      </section>

      <section className="forex-final-cta" id="final-cta" data-forex-reveal><div><span className="forex-eyebrow">FOREX DESK</span><h2>What can we help you achieve?</h2><p>Join the community, take the free trial, and see the forex desk in action for a week.</p></div><InactiveAction className="forex-button forex-button-primary">Book your FREE trial <FaArrowRight /></InactiveAction><a className="forex-back-link" href="#top">Back to the radar <FaArrowDown /></a></section>
    </main>
  );
}

