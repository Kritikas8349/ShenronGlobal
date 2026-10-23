import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChartLine,
  FaCompass,
  FaGlobeAmericas,
  FaShieldAlt,
} from "react-icons/fa";
import "./Comex.css";

const goldImage =
  "https://images.unsplash.com/photo-1718752773271-5bec84137916?auto=format&fit=crop&w=1600&q=85";
const goldDetailImage =
  "https://images.unsplash.com/photo-1718752773174-6e10495fdcf2?auto=format&fit=crop&w=1200&q=85";
const silverImage =
  "https://images.unsplash.com/photo-1720637595085-cd0b84ed67ad?auto=format&fit=crop&w=1200&q=85";

const services = [
  {
    title: "Precious metals",
    text: "Understand gold and silver through their distinct market drivers and trading context.",
    icon: FaChartLine,
  },
  {
    title: "Market context",
    text: "Connect commodity developments with relevant economic themes and market sentiment.",
    icon: FaGlobeAmericas,
  },
  {
    title: "Technical observations",
    text: "Review price behaviour, trend structure, and relevant technical reference points.",
    icon: FaCompass,
  },
  {
    title: "Risk-aware thinking",
    text: "Consider volatility, exposure, and uncertainty before discussing a possible approach.",
    icon: FaShieldAlt,
  },
];

const metals = [
  {
    number: "01",
    name: "Gold",
    title: "A market shaped by more than safe-haven demand.",
    description:
      "Real yields, currency movements, central-bank activity, and changing risk sentiment can all influence how gold is discussed. No single factor explains every move.",
    factors: ["Real yields", "Currency movements", "Central-bank activity"],
    image: goldDetailImage,
    imageAlt: "Close view of stacked gold bullion bars",
    tone: "gold",
    eyebrow: "PRECIOUS METAL / 01",
  },
  {
    number: "02",
    name: "Silver",
    title: "Precious-metal character. Industrial context.",
    description:
      "Silver can respond to precious-metal sentiment and industrial demand at once. Its market context deserves its own view of volatility, price behaviour, and economic themes.",
    factors: ["Industrial demand", "Precious-metal sentiment", "Relative volatility"],
    image: silverImage,
    imageAlt: "Polished silver bullion bars stacked on a dark surface",
    tone: "silver",
    eyebrow: "PRECIOUS METAL / 02",
  },
];

const approach = [
  ["01", "Understand", "Clarify objectives and familiarity with commodity markets."],
  ["02", "Analyse", "Review relevant market conditions and available information."],
  ["03", "Plan", "Discuss possible approaches, constraints, and risk considerations."],
  ["04", "Review", "Reassess the discussion as market conditions or objectives change."],
];

const principles = [
  ["01", "Research with context", "Connect price behaviour to relevant market themes."],
  ["02", "Plain-language explanations", "Make the reasoning and its limits easy to follow."],
  ["03", "Risk-aware decisions", "Discuss uncertainty before considering an approach."],
];

const faqs = [
  [
    "What are COMEX markets?",
    "COMEX is a commodities exchange associated with futures markets, including contracts for metals such as gold, silver, copper, and other products. Trading a futures contract is different from owning the physical commodity.",
  ],
  [
    "Which precious metals are covered?",
    "This page focuses on gold and silver market context. Confirm any other commodity coverage with the Shenron Global team before relying on it.",
  ],
  [
    "What is included in COMEX market analysis?",
    "Analysis may discuss technical market structure, relevant economic context, and risk considerations. Specific deliverables and availability depend on the service agreed with you.",
  ],
  [
    "How are market risks explained?",
    "Risk discussion can include volatility, exposure, position-sizing concepts, and scenarios that could challenge an idea. It cannot remove the possibility of loss.",
  ],
  [
    "Is commodity trading risk-free?",
    "No. Commodity markets can move quickly, and leveraged products can magnify both gains and losses. Consider whether the risks are suitable for your circumstances.",
  ],
  [
    "How can I discuss the available services?",
    "Use the enquiry form to tell our team which market topics you would like to discuss. The team can then confirm service availability and next steps.",
  ],
];

function Eyebrow({ children, light = false }) {
  return (
    <span className={`comex-eyebrow${light ? " is-light" : ""}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  );
}

function ArrowLink({ href, children, secondary = false }) {
  return (
    <a
      className={`comex-button${secondary ? " is-secondary" : ""}`}
      href={href}
    >
      {children}
      <FaArrowRight aria-hidden="true" />
    </a>
  );
}

function hideUnavailableImage(event) {
  event.currentTarget.hidden = true;
}

function MarketContextStrip() {
  return (
    <section className="comex-context" aria-label="COMEX coverage">
      <div className="comex-context-heading">
        <span>MARKET COVERAGE</span>
        <span>Research themes</span>
      </div>
      <div className="comex-context-topics">
        {["Gold", "Silver", "Commodity context", "Risk awareness"].map(
          (item, index) => (
            <span className="comex-context-item" key={item}>
              <i aria-hidden="true">0{index + 1}</i>
              {item}
            </span>
          ),
        )}
      </div>
    </section>
  );
}

function ResearchFeature({ item }) {
  const Icon = item.icon;

  return (
    <article className="comex-research-feature">
      <span className="comex-research-feature-icon" aria-hidden="true">
        <Icon />
      </span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </article>
  );
}

function MetalFeature({ metal }) {
  return (
    <article className={`comex-metal-feature comex-metal-feature--${metal.tone}`}>
      <figure className="comex-metal-visual">
        <img
          src={metal.image}
          alt={metal.imageAlt}
          loading="lazy"
          decoding="async"
          onError={hideUnavailableImage}
        />
        <figcaption>
          <span>{metal.eyebrow}</span>
          <span>MARKET STUDY</span>
        </figcaption>
      </figure>

      <div className="comex-metal-copy">
        <Eyebrow>{metal.eyebrow}</Eyebrow>
        <span className="comex-metal-name">{metal.name}</span>
        <h3>{metal.title}</h3>
        <p>{metal.description}</p>
        <div className="comex-metal-watch">
          <span>CONTEXT TO CONSIDER</span>
          <ul>
            {metal.factors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        </div>
        <a className="comex-inline-link" href="#analysis">
          See the analysis framework <FaArrowRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function MarketSketch() {
  return (
    <div
      className="comex-analysis-visual"
      role="img"
      aria-label="Illustrative chart showing price structure and a reference level. It is not live market data or a forecast."
    >
      <div className="comex-chart-head">
        <div>
          <span>VISUAL GUIDE</span>
          <strong>Reading market structure</strong>
        </div>
        <span className="comex-chart-status">ILLUSTRATIVE ONLY</span>
      </div>
      <div className="comex-chart-area" aria-hidden="true">
        <div className="comex-chart-grid" />
        <svg viewBox="0 0 660 270" preserveAspectRatio="none">
          <defs>
            <linearGradient id="comex-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d9ae5e" stopOpacity=".18" />
              <stop offset="1" stopColor="#d9ae5e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 145 C42 130 55 164 94 151 S140 103 182 126 S226 170 270 144 S318 111 359 130 S402 171 447 145 S487 100 526 119 S578 156 615 134 S642 108 660 122 L660 270 L0 270Z"
            fill="url(#comex-chart-fill)"
          />
          <path
            d="M0 145 C42 130 55 164 94 151 S140 103 182 126 S226 170 270 144 S318 111 359 130 S402 171 447 145 S487 100 526 119 S578 156 615 134 S642 108 660 122"
            fill="none"
            stroke="#a67935"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 179 H660"
            fill="none"
            stroke="#7d8588"
            strokeDasharray="5 8"
            strokeOpacity=".7"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="447"
            cy="145"
            r="5"
            fill="#fffaf2"
            stroke="#a67935"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="comex-chart-marker comex-chart-marker--one">PRICE STRUCTURE</span>
        <span className="comex-chart-marker comex-chart-marker--two">REFERENCE LEVEL</span>
      </div>
      <div className="comex-chart-legend">
        <span><i className="is-price" />Illustrative price movement</span>
        <span><i className="is-reference" />Reference level</span>
      </div>
      <p className="comex-chart-disclaimer">
        Conceptual example only. No live feed, dated price series, or forecast is shown.
      </p>
    </div>
  );
}

export default function Comex() {
  const [openFaq, setOpenFaq] = useState(0);
  const pageRef = useRef(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const sections = root.querySelectorAll("[data-comex-reveal]");
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -28px 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="comex-page" id="comex-top" ref={pageRef}>
      <section className="comex-hero" aria-labelledby="comex-title">
        <div className="comex-hero-kicker comex-container">
          <span>SHENRON GLOBAL / COMEX</span>
          <span>PRECIOUS METALS RESEARCH</span>
        </div>

        <div className="comex-hero-layout comex-container">
          <div className="comex-hero-copy">
            <Eyebrow>GOLD · SILVER · MARKET CONTEXT</Eyebrow>
            <h1 id="comex-title">
              Precious metals,<em>read in context.</em>
            </h1>
            <p className="comex-hero-description">
              Consider price structure alongside the economic context and risk
              factors that can shape gold and silver markets.
            </p>
            <div className="comex-hero-actions">
              <Link className="comex-button" to="/contact-us">
                Discuss COMEX services <FaArrowRight aria-hidden="true" />
              </Link>
              <ArrowLink href="#approach" secondary>
                How we approach research
              </ArrowLink>
            </div>
            <div className="comex-hero-coverage" aria-label="Topics covered">
              <span>RESEARCH FOCUS</span>
              <strong>Gold</strong>
              <i aria-hidden="true" />
              <strong>Silver</strong>
              <i aria-hidden="true" />
              <strong>Risk context</strong>
            </div>
          </div>

          <figure className="comex-hero-visual">
            <img
              src={goldImage}
              alt="Gold bullion bars arranged against a dark background"
              fetchPriority="high"
              decoding="async"
              onError={hideUnavailableImage}
            />
            <div className="comex-hero-image-shade" aria-hidden="true" />
            <figcaption>
              <span>01 / PRECIOUS METALS</span>
              <span>MARKET RESEARCH</span>
            </figcaption>
            <div className="comex-hero-inset">
              <span>ANALYTICAL LENSES</span>
              <strong>Price structure</strong>
              <strong>Economic context</strong>
              <strong>Risk scenarios</strong>
            </div>
          </figure>
        </div>

        <div className="comex-hero-foot comex-container">
          <span>Research designed to support informed questions.</span>
          <span>Market analysis involves risk. No outcome is guaranteed.</span>
        </div>
      </section>

      <MarketContextStrip />

      <section className="comex-research comex-container" id="services" data-comex-reveal>
        <div
          className="comex-research-visual"
          role="img"
          aria-label="Illustrative mobile COMEX research view showing gold market context and a chart marked as not live data."
        >
          <div className="comex-research-phone" aria-hidden="true">
            <div className="comex-research-phone-screen">
              <div className="comex-research-phone-status">
                <span>9:41</span>
                <span className="comex-research-phone-camera" />
                <span>•••</span>
              </div>
              <div className="comex-research-phone-brand">
                <span className="comex-research-phone-mark">S</span>
                <span>SHENRON GLOBAL</span>
                <span className="comex-research-phone-menu">•••</span>
              </div>
              <span className="comex-research-phone-kicker">COMEX / RESEARCH</span>
              <div className="comex-research-phone-title">
                <strong>Market brief</strong>
                <span>OVERVIEW</span>
              </div>
              <div className="comex-research-phone-card">
                <div className="comex-research-phone-card-head">
                  <span>GOLD / MARKET CONTEXT</span>
                  <i />
                </div>
                <strong>Price structure</strong>
                <p>Technical view with wider market context</p>
                <svg viewBox="0 0 250 72" focusable="false" aria-hidden="true">
                  <path className="comex-research-phone-gridline" d="M0 18H250M0 45H250" />
                  <path className="comex-research-phone-line" d="M3 59 C22 54 27 38 46 44 S70 52 88 35 S117 48 136 29 S162 35 179 20 S207 30 225 12 S240 17 247 5" />
                </svg>
                <span className="comex-research-phone-disclaimer">ILLUSTRATIVE VIEW · NOT LIVE DATA</span>
              </div>
              <div className="comex-research-phone-tags">
                <span>Economic context</span>
                <span>Risk notes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="comex-research-content">
          <Eyebrow>01 / RESEARCH SCOPE</Eyebrow>
          <h2>Built for context.<br /><em>Designed for clarity.</em></h2>
          <p className="comex-research-intro">
            A focused view of precious-metals markets, technical observations,
            and the wider forces that shape the conversation.
          </p>
          <div className="comex-research-features">
            {services.map((item) => (
              <ResearchFeature item={item} key={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="comex-metals" aria-label="Gold and silver market context" data-comex-reveal>
        <div className="comex-metals-heading comex-container">
          <Eyebrow>02 / TWO DISTINCT MARKETS</Eyebrow>
          <p>Different drivers deserve different questions.</p>
        </div>
        <div className="comex-metals-list">
          {metals.map((metal) => <MetalFeature key={metal.number} metal={metal} />)}
        </div>
      </section>

      <section className="comex-analysis" id="analysis" data-comex-reveal>
        <div className="comex-analysis-layout comex-container">
          <div className="comex-analysis-copy">
            <Eyebrow>03 / MARKET ANALYSIS</Eyebrow>
            <h2>Look beyond the price.<br /><em>Understand the context.</em></h2>
            <p>
              Analysis can bring several perspectives together. The illustration
              is a visual aid, not a live chart or a signal.
            </p>
            <ul>
              <li><span>01</span><div><strong>Technical structure</strong><p>Support, resistance, and observed price behaviour.</p></div></li>
              <li><span>02</span><div><strong>Market context</strong><p>Relevant economic and commodity developments.</p></div></li>
              <li><span>03</span><div><strong>Risk perspective</strong><p>Uncertainty, exposure, and invalidation scenarios.</p></div></li>
            </ul>
          </div>
          <MarketSketch />
        </div>
      </section>

      <section className="comex-approach" id="approach" data-comex-reveal>
        <div className="comex-container">
          <div className="comex-approach-heading">
            <div>
              <Eyebrow light>04 / HOW WE WORK</Eyebrow>
              <h2>Four stages.<br /><em>One considered process.</em></h2>
            </div>
            <p>
              A clear process leaves room for context, questions, and risk
              discussion at every stage.
            </p>
          </div>
          <div className="comex-approach-track">
            <div className="comex-approach-line" aria-hidden="true" />
            {approach.map(([number, title, text]) => (
              <article className="comex-approach-step" key={number}>
                <span className="comex-approach-number">{number}</span>
                <span className="comex-approach-label">STAGE {number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="comex-principles comex-container" data-comex-reveal>
        <div className="comex-principles-heading">
          <Eyebrow>05 / OUR PRINCIPLES</Eyebrow>
          <h2>Clarity before <em>conviction.</em></h2>
          <p>
            The limits of an analysis matter as much as the observations within it.
          </p>
        </div>
        <div className="comex-principles-list">
          {principles.map(([number, title, text]) => (
            <article className="comex-principle" key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
              <FaArrowRight aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="comex-faq comex-container" id="comex-faq" data-comex-reveal>
        <div className="comex-faq-heading">
          <Eyebrow>06 / QUESTIONS</Eyebrow>
          <h2>Good questions deserve<br /><em>clear answers.</em></h2>
          <p>Understand the basics and the limits before exploring commodity markets.</p>
        </div>
        <div className="comex-faq-list">
          {faqs.map(([question, answer], index) => {
            const isOpen = openFaq === index;
            const answerId = `comex-answer-${index}`;

            return (
              <article className={`comex-faq-item${isOpen ? " is-open" : ""}`} key={question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    {question}<span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                </h3>
                <div className="comex-faq-answer" id={answerId} aria-hidden={!isOpen}>
                  <div><p>{answer}</p></div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="comex-final" data-comex-reveal>
        <div className="comex-final-inner comex-container">
          <div>
            <Eyebrow light>YOUR NEXT MARKET CONVERSATION</Eyebrow>
            <h2>Start with a better question.</h2>
            <p>
              Tell us what you would like to understand about gold, silver, or
              commodity-market research.
            </p>
            <span className="comex-risk-note">
              Commodity markets carry risk. Information on this page is general
              and is not a personal recommendation.
            </span>
          </div>
          <Link className="comex-button" to="/contact-us">
            Contact the Shenron team <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="comex-image-credit comex-container">
        <span>
          Precious-metals photography: <a href="https://unsplash.com/photos/a-stack-of-gold-bars-sitting-on-top-of-each-other-dvdAdJxxvv0" target="_blank" rel="noopener noreferrer">Scottsdale Mint / Unsplash</a> and <a href="https://unsplash.com/photos/a-pile-of-silver-bars-stacked-on-top-of-each-other-dPahQ_Q56zY" target="_blank" rel="noopener noreferrer">Scottsdale Mint / Unsplash</a>.
        </span>
        <a href="#comex-top">Back to top <FaArrowRight aria-hidden="true" /></a>
      </div>
    </main>
  );
}
