import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowRight, FaBalanceScale, FaChartLine, FaShieldAlt } from "react-icons/fa";
import phoneMockup from "../assets/Portfolio-Hero.png";
import "./Portfolio.css";

const allocations = [
  { name: "Forex", value: 35, role: "Core Allocation", color: "#d7b56d" },
  { name: "Metals", value: 25, role: "Hedge Sleeve", color: "#a89772" },
  { name: "Indices", value: 20, role: "Growth Sleeve", color: "#777f83" },
  { name: "Crypto", value: 10, role: "Satellite Sleeve", color: "#b88646" },
  { name: "Cash buffer", value: 10, role: "Defensive Reserve", color: "#50575a" },
];

const metrics = [
  ["4", "Asset sleeves"],
  ["20%", "Max sleeve exposure"],
  ["12", "Monthly reviews per year"],
  ["1", "Written policy per client"],
];

const capabilities = [
  ["01", "Optimize Portfolios for Maximum Returns", "Strategic allocation across Forex, Comex, Indices, and Crypto to pursue gains while managing risk."],
  ["02", "Personalized Investment Strategies", "Aligned with client goals: consistent income, capital preservation, or growth."],
  ["03", "Risk Management for Balanced Portfolios", "Sophisticated risk-budgeting techniques for navigating market volatility."],
  ["04", "Transparent Performance & Clear Reporting", "Regular portfolio updates, plain-language statements, and review calls."],
  ["05", "Multi-Asset Sleeve Diversification", "Hard exposure bands to prevent over-concentration in a single asset class."],
  ["06", "Disciplined Drawdown Protection", "Pre-agreed de-risking steps written into your risk policy before market stress."],
];

const boardRows = [
  ...allocations.map(({ name, value, role }) => [`${name} sleeve`, `${value}%`, role]),
  ["Risk used", "1.4%", "Per Trade Equity"],
];

const process = [
  ["01", "Define the budget", "Target risk parameters, tolerable drawdown, and investment horizon written into formal policy."],
  ["02", "Build the sleeves", "Allocate equity across FX, Metals, Indices, and Crypto with strict exposure ceilings."],
  ["03", "Rebalance on rules", "Conduct monthly reviews and rebalance based on quantitative rules, never emotion."],
];

const brokers = [
  ["Multibank", "Lightning execution, deep institutional liquidity & zero slippage."],
  ["Vantage", "Ultra-tight spreads across major pairs with MT4 & MT5 integration."],
  ["Octafx", "Beginner-friendly ecosystem with low entry deposit requirements."],
  ["Exness", "Instant automated withdrawals with robust global regulation."],
];

const faqs = [
  ["Do you manage money directly?", "We provide portfolio structure, risk allocation reviews, and reporting frameworks. Execution remains in your regulated broker account."],
  ["What is the minimum account size for portfolio management consultation?", "No answer has been supplied for this question. Please confirm the minimum consultation account size."],
  ["How frequently are portfolio review calls scheduled?", "An exact review-call schedule has not been supplied. Please confirm the call frequency."],
];

function Eyebrow({ children }) {
  return <span className="portfolio-eyebrow"><i aria-hidden="true" />{children}</span>;
}

function AllocationRing({ compact = false }) {
  let offset = 0;
  return (
    <svg className={`portfolio-ring ${compact ? "is-compact" : ""}`} viewBox="0 0 220 220" role="img" aria-label="Illustrative allocation: Forex 35 percent, Metals 25 percent, Indices 20 percent, Crypto 10 percent, Cash 10 percent">
      <circle className="portfolio-ring-track" cx="110" cy="110" r="82" pathLength="100" />
      {allocations.map((item) => {
        const segmentOffset = offset;
        offset += item.value;
        return <circle key={item.name} cx="110" cy="110" r="82" pathLength="100" stroke={item.color} strokeDasharray={`${item.value} ${100 - item.value}`} strokeDashoffset={-segmentOffset} />;
      })}
      <circle className="portfolio-ring-inner" cx="110" cy="110" r="59" />
      <text className="portfolio-ring-total" x="110" y="106" textAnchor="middle">100%</text>
      <text className="portfolio-ring-caption" x="110" y="127" textAnchor="middle">ILLUSTRATIVE</text>
    </svg>
  );
}

function AllocationKey({ condensed = false }) {
  const items = allocations;
  return <ul className={`portfolio-allocation-key ${condensed ? "is-condensed" : ""}`}>
    {items.map((item) => <li key={item.name}><i style={{ "--allocation-color": item.color }} /><span>{item.name}</span><strong>{item.value}%</strong></li>)}
  </ul>;
}

function PortfolioVisual() {
  return (
    <div className="portfolio-visual">
      {/* <span className="portfolio-visual-label">PORTFOLIO MANAGEMENT / MOBILE VIEW</span> */}
      <img src={phoneMockup} alt="Illustrative Shenron Global portfolio dashboard displayed on a gold-trimmed smartphone" />
      <span className="portfolio-visual-note">A clearer view of your portfolio, wherever you are.</span>
    </div>
  );
}

function PortfolioDashboard({ hero = false }) {
  return (
    <div className={`portfolio-dashboard ${hero ? "is-hero" : ""}`}>
      <div className="portfolio-dashboard-top"><span><i /> PORTFOLIO REVIEW / MODEL 01</span><span>ILLUSTRATIVE</span></div>
      <div className="portfolio-dashboard-title"><div><span>ALLOCATION MODEL</span><h2>{hero ? "Sleeve allocation" : "A multi-asset allocation"}</h2></div><FaBalanceScale aria-hidden="true" /></div>
      <div className="portfolio-dashboard-content"><AllocationRing compact={hero} /><AllocationKey condensed={hero} /></div>
      {hero ? (
        <div className="portfolio-risk-summary"><div><span>RISK POLICY</span><strong>Defined before deployment</strong></div><FaShieldAlt aria-hidden="true" /></div>
      ) : (
        <>
          <div className="portfolio-policy-line"><FaShieldAlt aria-hidden="true" /><span><b>Risk used</b> 1.4% per trade equity</span><span>Illustrative</span></div>
          <p className="portfolio-exposure-alert"><strong>Policy check required.</strong> The supplied maximum sleeve exposure is 20%, while the Forex sleeve allocation is 35%. Confirm how these figures should be reconciled before presenting them as one active policy.</p>
        </>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const root = document.querySelector(".portfolio-page");
    if (!root) return undefined;
    const sections = root.querySelectorAll("[data-portfolio-reveal]");
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
    <main className="portfolio-page" id="portfolio-top">
      <section className="portfolio-hero">
        <div className="portfolio-hero-copy">
          <Eyebrow>PORTFOLIO MANAGEMENT / ASSET ALLOCATION</Eyebrow>
          <h1>Your Wealth.<br /><span>Managed Smarter Than Ever.</span></h1>
          <p className="portfolio-hero-lede">Your one-stop solution for diverse asset management across Forex, Comex, Crypto &amp; Indices.</p>
          {/* <p className="portfolio-hero-description">Professional, tailored management of trading portfolios using strategic asset allocation, active risk management techniques, and transparent performance reporting designed for capital growth and risk balance.</p> */}
          <div className="portfolio-hero-actions"><a className="portfolio-button portfolio-button-primary" href="#portfolio-final"> Start Trading <FaArrowRight aria-hidden="true" /></a><button className="portfolio-button portfolio-button-secondary" type="button" disabled title="Consultation destination has not been configured">Book your call</button></div>
          {/* <p className="portfolio-destination-note">Consultation booking destination needs confirmation.</p> */}
          {/* <span className="portfolio-hero-caption">Allocation examples shown for illustration only.</span> */}
        </div>
        <PortfolioVisual />
      </section>

      <section className="portfolio-metrics" aria-label="Portfolio management framework metrics" data-portfolio-reveal>
        {metrics.map(([value, label], index) => <div className="portfolio-metric" key={label}><span>0{index + 1}</span><strong>{value}</strong><p>{label}</p></div>)}
      </section>

      <section className="portfolio-intro" data-portfolio-reveal>
        <div><Eyebrow>UNDERSTANDING WEALTH</Eyebrow><h2>Start with the whole picture. Then decide what deserves a place in it.</h2></div>
        <p>Allocation begins with a clear view of your goals, existing exposure and tolerance for risk. A written framework can connect those decisions to a process for review, risk management and informed action.</p>
      </section>

      <section className="portfolio-capabilities" data-portfolio-reveal>
        <div className="portfolio-section-heading"><div><Eyebrow>THE MANAGEMENT DESK</Eyebrow><h2>Inside the portfolio management desk</h2></div><p>Cutting-edge tools built to make trading smarter and faster — every card here is part of the daily workflow.</p></div>
        <div className="portfolio-capability-layout">
          <article className="portfolio-capability-lead"><span>01 / ALLOCATION</span><FaChartLine aria-hidden="true" /><h3>{capabilities[0][1]}</h3><p>{capabilities[0][2]}</p><div className="portfolio-capability-band"><i /> Forex <i /> Comex <i /> Indices <i /> Crypto</div></article>
          <div className="portfolio-capability-list">{capabilities.slice(1).map(([number, title, text]) => <article className="portfolio-capability-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><FaArrowRight aria-hidden="true" /></article>)}</div>
        </div>
      </section>

      <section className="portfolio-board-section" id="allocation" data-portfolio-reveal>
        <div className="portfolio-section-heading portfolio-board-heading"><div><Eyebrow>PORTFOLIO BOARD</Eyebrow><h2>Numbers with context attached</h2><p>Illustrative desk snapshot. Every row on the live desk carries the reasoning behind the move.</p></div><span className="portfolio-illustrative-label">ILLUSTRATIVE ALLOCATION — NOT LIVE CLIENT DATA</span></div>
        <div className="portfolio-board-layout"><PortfolioDashboard />
          <div className="portfolio-allocation-table-wrap"><table className="portfolio-allocation-table"><thead><tr><th scope="col">SLEEVE</th><th scope="col">WEIGHT</th><th scope="col">PORTFOLIO ROLE</th></tr></thead><tbody>{boardRows.map(([name, weight, role]) => <tr key={name}><th scope="row">{name}</th><td>{weight}</td><td>{role}</td></tr>)}</tbody></table>
            <p className="portfolio-table-note">Percentages are illustrative examples. Sleeve limits and allocation weights require policy confirmation before use.</p>
          </div>
        </div>
      </section>

      <section className="portfolio-process" data-portfolio-reveal>
        <div className="portfolio-section-heading"><div><Eyebrow>THE METHOD</Eyebrow><h2>Three moves, every single session.</h2></div><p>A disciplined sequence keeps capital allocation connected to the rules that govern it.</p></div>
        <div className="portfolio-process-track"><div className="portfolio-process-rule" />{process.map(([number, title, text]) => <article className="portfolio-process-step" key={number}><span className="portfolio-process-number">{number}</span><span className="portfolio-process-label">STAGE {number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="portfolio-brokers" data-portfolio-reveal>
        <div className="portfolio-section-heading"><div><Eyebrow>BROKER SOURCE COPY</Eyebrow><h2>Top 4 Forex Brokers in 2025</h2><p>Forexnexa's Fab Four delivers unbeatable trading perks! From lightning-fast execution to spreads tighter than ever, these brokers redefine forex. Enjoy expert insights, robust platforms, and stellar support.</p></div>
          <p className="portfolio-broker-flag">Source review needed: “Forexnexa” does not match Shenron Global branding, and “zero slippage” is an absolute claim. Broker details and rankings are not verified.</p></div>
        <p className="portfolio-broker-destination-note">No verified broker destinations are configured; Join Now actions require confirmation.</p>
        <div className="portfolio-broker-list">{brokers.map(([name, description], index) => <article className="portfolio-broker-row" key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{description}</p><button type="button" disabled title="No verified broker destination is configured">Join Now <FaArrowRight aria-hidden="true" /></button></article>)}</div>
      </section>

      <section className="portfolio-faq" data-portfolio-reveal>
        <div className="portfolio-faq-heading"><Eyebrow>QUESTIONS BEFORE YOU BEGIN</Eyebrow><h2>What traders ask us first</h2></div>
        <div className="portfolio-faq-list">{faqs.map(([question, answer], index) => <article className={`portfolio-faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><h3><button type="button" aria-expanded={openFaq === index} aria-controls={`portfolio-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>{question}<span aria-hidden="true">{openFaq === index ? "−" : "+"}</span></button></h3><div className="portfolio-faq-answer" id={`portfolio-answer-${index}`} hidden={openFaq !== index}><p>{answer}</p></div></article>)}</div>
      </section>

      <section className="portfolio-final" id="portfolio-final" data-portfolio-reveal>
        <div className="portfolio-final-index">SG / PM<br />01—04</div><div className="portfolio-final-copy"><Eyebrow>PORTFOLIO MANAGEMENT</Eyebrow><h2>What can we help you achieve?</h2><p>Join the community, take the free trial, and see the portfolio management desk in action for a week.</p></div>
        <div className="portfolio-final-action"><button className="portfolio-button portfolio-button-primary" type="button" disabled title="Free-trial booking destination has not been configured">Book your FREE trial <FaArrowRight aria-hidden="true" /></button><span>Booking destination needs confirmation.</span></div>
        <a className="portfolio-back-link" href="#portfolio-top">Back to the radar <FaArrowDown aria-hidden="true" /></a>
      </section>
    </main>
  );
}
