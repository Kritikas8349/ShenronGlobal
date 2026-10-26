import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBalanceScale,
  FaChartLine,
  FaCompass,
  FaGlobeAmericas,
  FaShieldAlt,
} from "react-icons/fa";
import "./Comex.css";
import goldImg from "../assets/commoditie.jpg";


const goldDetailImage = "https://images.unsplash.com/photo-1718752773174-6e10495fdcf2?auto=format&fit=crop&w=1200&q=85";
const silverImage = "https://images.unsplash.com/photo-1720637595085-cd0b84ed67ad?auto=format&fit=crop&w=1200&q=85";

const services = [
  { number: "01", title: "Gold market analysis", text: "Explore market structure, technical reference points, and the economic themes that can influence gold.", icon: FaChartLine, featured: true },
  { number: "02", title: "Silver market insights", text: "Understand silver's precious-metal and industrial context, with attention to volatility and price behaviour.", icon: FaBalanceScale },
  { number: "03", title: "Commodity research", text: "Review relevant macroeconomic developments and the wider market context around commodities.", icon: FaGlobeAmericas },
  { number: "04", title: "Risk-aware planning", text: "Consider exposure, position sizing concepts, and risk/reward before making a trading decision.", icon: FaShieldAlt },
  { number: "05", title: "Technical observations", text: "Study support and resistance, trend structure, momentum, and price action as analytical tools.", icon: FaCompass },
];

const approach = [
  ["01", "Understand", "Clarify your objectives and familiarity with commodity markets."],
  ["02", "Analyse", "Review relevant market conditions and available information."],
  ["03", "Plan", "Discuss possible approaches, constraints, and risk considerations."],
  ["04", "Review", "Reassess the discussion as market conditions or objectives change."],
];

const faqs = [
  ["What are COMEX markets?", "COMEX is a commodities exchange associated with futures markets, including contracts for metals such as gold, silver, copper, and other products. Trading a futures contract is different from owning the physical commodity."],
  ["Which precious metals are covered?", "The page focuses on gold and silver market context. Other commodity coverage should be confirmed with the Shenron Global team before relying on it."],
  ["What is included in COMEX market analysis?", "Analysis may discuss technical market structure, relevant economic context, and risk considerations. Specific deliverables and availability depend on the service agreed with you."],
  ["How are market risks explained?", "Risk discussion can include volatility, exposure, position sizing concepts, and scenarios that could challenge an idea. It cannot remove the possibility of loss."],
  ["Is commodity trading risk-free?", "No. Commodity markets can move quickly, and leveraged products can magnify both gains and losses. Consider whether the risks are suitable for your circumstances."],
  ["How can I discuss the available services?", "Use the service overview on this page to identify the topics you want to discuss. The site does not currently provide a verified booking destination, so no booking link is shown here."],
];

function Eyebrow({ children, light = false }) {
  return <span className={`comex-eyebrow${light ? " is-light" : ""}`}><i aria-hidden="true" />{children}</span>;
}

function ArrowLink({ href, children, secondary = false }) {
  return <a className={`comex-button${secondary ? " is-secondary" : ""}`} href={href}>{children}<FaArrowRight aria-hidden="true" /></a>;
}

function MarketContextStrip() {
  return (
    <div className="comex-context" aria-label="COMEX market topics">
      <span className="comex-context-label">MARKET CONTEXT</span>
      {["Precious metals", "Gold markets", "Silver markets", "Commodity research", "Risk awareness"].map((item) => <span className="comex-context-item" key={item}><i aria-hidden="true" />{item}</span>)}
    </div>
  );
}

function ServiceCard({ item }) {
  const Icon = item.icon;
  return (
    <article className={`comex-service-card${item.featured ? " is-featured" : ""}`}>
      <div className="comex-service-card-top"><span>{item.number} / SERVICE</span><Icon aria-hidden="true" /></div>
      <h3>{item.title}</h3><p>{item.text}</p>
      <a href="#approach" aria-label={`See how ${item.title.toLowerCase()} fits our approach`}>Explore the approach <FaArrowRight aria-hidden="true" /></a>
    </article>
  );
}

function MarketSketch() {
  return (
    <div className="comex-analysis-visual" role="img" aria-label="Illustrative chart sketch showing how a market analysis can consider price structure, context, and risk. It is not live market data or a forecast.">
      <div className="comex-chart-head"><span>ANALYSIS FRAMEWORK</span><span>ILLUSTRATIVE ONLY</span></div>
      <div className="comex-chart-area">
        <div className="comex-chart-grid" aria-hidden="true" />
        <svg viewBox="0 0 660 270" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="comex-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9ae5e" stopOpacity=".32" /><stop offset="1" stopColor="#d9ae5e" stopOpacity="0" /></linearGradient></defs>
          <path d="M0 220 C38 212 42 181 78 190 S119 208 151 172 S190 190 224 154 S271 171 303 128 S345 143 380 111 S421 137 456 92 S500 118 533 70 S577 87 612 52 S641 68 660 29 L660 270 L0 270Z" fill="url(#comex-chart-fill)" />
          <path d="M0 220 C38 212 42 181 78 190 S119 208 151 172 S190 190 224 154 S271 171 303 128 S345 143 380 111 S421 137 456 92 S500 118 533 70 S577 87 612 52 S641 68 660 29" fill="none" stroke="#bd8c3c" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          <path d="M0 187 H660" fill="none" stroke="#9d855d" strokeDasharray="5 8" strokeOpacity=".55" vectorEffect="non-scaling-stroke" />
          <circle cx="533" cy="70" r="5" fill="#fff8e8" stroke="#bd8c3c" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="comex-chart-legend"><span><i />Price structure</span><span><i />Reference level</span><span>For explanation only · no forecast implied</span></div>
    </div>
  );
}

export default function Comex() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const root = document.querySelector(".comex-page");
    if (!root) return undefined;
    const sections = root.querySelectorAll("[data-comex-reveal]");
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="comex-page" id="comex-top">
      <section className="comex-hero">
        <div className="comex-hero-copy">
          <Eyebrow>SHENRON GLOBAL / COMEX SERVICES</Eyebrow>
          <h1>Navigate the world of <span>precious metals.</span></h1>
          <p className="comex-hero-subtitle">COMEX market insights &amp; strategic trading services</p>
          <p className="comex-hero-description">Explore gold, silver, and other major commodity markets through structured market insights, technical analysis, and risk-aware trading strategies designed to support informed decisions.</p>
          <div className="comex-hero-actions"><ArrowLink href="#services">Explore COMEX services</ArrowLink><ArrowLink href="#approach" secondary>Our approach</ArrowLink></div>
          <p className="comex-hero-note"><FaShieldAlt aria-hidden="true" /> Market education and analysis involve risk. No outcome is guaranteed.</p>
        </div>
        <figure className="comex-hero-art">
          <img src={goldImg} alt="Gold bullion bars arranged against a dark background" fetchPriority="high" />
          <figcaption><span>COMMODITY RESEARCH</span><span>GOLD / SILVER / MARKETS</span></figcaption>
          <span className="comex-art-index" aria-hidden="true">01</span>
        </figure>
        <span className="comex-hero-watermark" aria-hidden="true">Au</span>
      </section>

      <MarketContextStrip />

      <section className="comex-section comex-services" id="services" data-comex-reveal>
        <div className="comex-section-heading"><div><Eyebrow>WHAT WE EXPLORE</Eyebrow><h2>Commodity expertise.<br /><span>A more structured approach.</span></h2></div><p>Explore services designed to help you understand precious-metal markets, evaluate opportunities, and approach trading decisions with greater clarity.</p></div>
        <div className="comex-service-grid">{services.map((item) => <ServiceCard item={item} key={item.number} />)}</div>
      </section>

      <section className="comex-metals" data-comex-reveal>
        <article className="comex-metal-feature comex-gold-feature">
          <div className="comex-metal-image"><img src={goldDetailImage} alt="Close view of stacked gold bullion bars" loading="lazy" /><span>01 / GOLD</span></div>
          <div className="comex-metal-copy"><Eyebrow>PRECIOUS METAL / 01</Eyebrow><h2>Understanding the <span>gold market.</span></h2><p>Consider how real yields, currency movements, central-bank activity, and safe-haven demand can shape the conversation around gold. No single driver explains every move.</p><a href="#analysis">Explore the analysis framework <FaArrowRight aria-hidden="true" /></a></div>
        </article>
        <article className="comex-metal-feature comex-silver-feature">
          <div className="comex-metal-copy"><Eyebrow>PRECIOUS METAL / 02</Eyebrow><h2>Discover the <span>silver market.</span></h2><p>Silver can reflect both precious-metal sentiment and industrial demand. Explore its market context alongside volatility, price behaviour, and broader economic themes.</p><a href="#analysis">Explore the analysis framework <FaArrowRight aria-hidden="true" /></a></div>
          <div className="comex-metal-image"><img src={silverImage} alt="Polished silver bullion bars stacked on a dark surface" loading="lazy" /><span>02 / SILVER</span></div>
        </article>
      </section>

      <section className="comex-analysis" id="analysis" data-comex-reveal>
        <div className="comex-analysis-copy"><Eyebrow>MARKET ANALYSIS</Eyebrow><h2>Look beyond the price.<br /><span>Understand the market.</span></h2><p>Market analysis brings several perspectives together: technical structure, fundamental context, volatility, and the risk attached to a possible decision.</p>
          <ul><li><FaChartLine aria-hidden="true" /><span><b>Technical structure</b>Support, resistance, and price behaviour.</span></li><li><FaGlobeAmericas aria-hidden="true" /><span><b>Market context</b>Relevant economic and commodity developments.</span></li><li><FaShieldAlt aria-hidden="true" /><span><b>Risk perspective</b>Uncertainty, exposure, and invalidation scenarios.</span></li></ul>
        </div>
        <MarketSketch />
      </section>

      <section className="comex-approach" id="approach" data-comex-reveal>
        <div className="comex-approach-heading"><Eyebrow light>HOW OUR APPROACH WORKS</Eyebrow><h2>Four stages.<br /><span>One clearer conversation.</span></h2><p>A considered process creates room for context, questions, and risk discussion at every stage.</p></div>
        <div className="comex-approach-track"><div className="comex-approach-line" aria-hidden="true" />{approach.map(([number, title, text]) => <article className="comex-approach-step" key={number}><span className="comex-approach-number">{number}</span><span className="comex-approach-label">STAGE {number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="comex-principles" data-comex-reveal>
        <div className="comex-principles-mark" aria-hidden="true"><span>Au</span><i /><b>Ag</b></div>
        <div className="comex-principles-copy"><Eyebrow>WHY SHENRON GLOBAL</Eyebrow><h2>Clarity before conviction.</h2><p>Our service philosophy centres on structured research, clear communication, risk-aware discussion, and explanations that make the limits of an analysis visible.</p>
          <div className="comex-principle-list"><span><i>01</i>Research with context</span><span><i>02</i>Plain-language explanations</span><span><i>03</i>Risk-aware decisions</span></div>
        </div>
      </section>

      <section className="comex-faq" id="comex-faq" data-comex-reveal>
        <div className="comex-faq-heading"><Eyebrow>QUESTIONS BEFORE YOU BEGIN</Eyebrow><h2>Good questions deserve<br /><span>clear answers.</span></h2><p>Learn the basics and understand the limits before exploring commodity markets.</p></div>
        <div className="comex-faq-list">{faqs.map(([question, answer], index) => {
          const isOpen = openFaq === index;
          return <article className={`comex-faq-item${isOpen ? " is-open" : ""}`} key={question}><h3><button type="button" aria-expanded={isOpen} aria-controls={`comex-answer-${index}`} onClick={() => setOpenFaq(isOpen ? -1 : index)}>{question}<span aria-hidden="true">{isOpen ? "−" : "+"}</span></button></h3><div className="comex-faq-answer" id={`comex-answer-${index}`} aria-hidden={!isOpen}><div><p>{answer}</p></div></div></article>;
        })}</div>
      </section>

      <section className="comex-final" data-comex-reveal>
        <div className="comex-final-copy"><Eyebrow light>YOUR NEXT MARKET CONVERSATION</Eyebrow><h2>Make your next market decision more informed.</h2><p>Explore Shenron Global's commodity-market services and consider whether they fit your objectives and understanding of risk.</p><div className="comex-final-actions"><ArrowLink href="#services">Explore our services</ArrowLink><ArrowLink href="#comex-faq" secondary>Read the FAQs</ArrowLink></div><span className="comex-risk-note">Commodity trading involves risk and may not be suitable for everyone.</span></div>
      </section>
      <footer className="comex-image-credit"><span>Commodity photography via <a href="https://unsplash.com/photos/a-stack-of-gold-bars-sitting-on-top-of-each-other-dvdAdJxxvv0" target="_blank" rel="noreferrer">Scottsdale Mint / Unsplash</a> and <a href="https://unsplash.com/photos/a-pile-of-silver-bars-stacked-on-top-of-each-other-dPahQ_Q56zY" target="_blank" rel="noreferrer">Scottsdale Mint / Unsplash</a>.</span><a href="#comex-top">Back to top <FaArrowRight aria-hidden="true" /></a></footer>
    </main>
  );
}
