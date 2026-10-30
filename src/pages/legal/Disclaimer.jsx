
import React from "react";
import "./Disclaimer.css";

const disclaimerSections = [
    {
        id: "educational-only",
        title: "Educational and Informational Only",
        content: (
            <p>
                All content on this site — including market commentary,
                trading signals, analysis, reports, webinars, tutorials
                and other materials — is provided for educational and
                informational purposes only. Nothing on this site
                constitutes financial, investment, legal, tax or other
                professional advice tailored to your personal
                circumstances.
            </p>
        ),
    },
    {
        id: "no-financial-advice",
        title: "No Financial Advice or Advisory Relationship",
        content: (
            <p>
                Shenron is not a broker, financial advisor, investment
                manager or tax advisor unless explicitly stated in a
                separate written agreement. Use of our signals or content
                does not create a client-advisor, fiduciary or advisory
                relationship. For personalized guidance, consult a
                licensed professional.
            </p>
        ),
    },
    {
        id: "risk-disclosure",
        title: "Risk Disclosure — Trading Is Risky",
        content: (
            <p>
                Trading forex, precious metals (including XAU/USD),
                cryptocurrencies, indices and other leveraged instruments
                involves significant risk and may result in partial or
                total loss of capital. Market conditions can change
                rapidly. Never trade with funds you cannot afford to lose.
            </p>
        ),
    },
    {
        id: "no-guarantees",
        title: "No Guarantees or Promises of Performance",
        content: (
            <p>
                Shenron makes no guarantee of profits or that any signal,
                strategy or analysis will be accurate or successful. Past
                performance, testimonials, case studies and examples are
                illustrative only and do not predict future results.
            </p>
        ),
    },
    {
        id: "user-responsibility",
        title: "User Responsibility and Decision-Making",
        content: (
            <p>
                You are fully responsible for any trading or investment
                decisions you make. This includes choice of broker,
                position sizing, risk management, and execution. Shenron
                will not be liable for any losses, damages or costs
                arising from your decisions or use of our content.
            </p>
        ),
    },
    {
        id: "copy-trading",
        title: "Copy Trading & Managed Services — Important Notice",
        content: (
            <p>
                If you use copy trading or enter a portfolio management
                mandate, you remain responsible for your account.
                Execution quality, slippage and order fills are governed
                by the broker and market conditions. Any discretionary
                management relationship will be governed by a separate
                written mandate setting out duties, fees and terms.
            </p>
        ),
    },
    {
        id: "third-party-content",
        title: "Third-Party Content and Links",
        content: (
            <p>
                We may provide links or embed content from third parties
                (brokers, data providers, platforms). Shenron does not
                endorse or guarantee the accuracy or reliability of
                third-party content and is not responsible for third-party
                services or outages.
            </p>
        ),
    },
    {
        id: "testimonials",
        title: "Testimonials and Illustrative Results",
        content: (
            <p>
                Testimonials and user stories reflect individual
                experiences and do not guarantee similar outcomes.
                Individual results vary depending on market conditions,
                capital, strategy and risk controls.
            </p>
        ),
    },
    {
        id: "fees-and-refunds",
        title: "Fees, Payments and Refunds",
        content: (
            <p>
                Fees for subscriptions, training and other services are
                set out on the Pricing page and relevant purchase
                confirmations. Refunds and cancellations are governed by
                our Refund & Cancellation Policy.
            </p>
        ),
    },
    {
        id: "legal-and-tax",
        title: "Legal and Tax Matters",
        content: (
            <p>
                Shenron does not provide legal, tax or accounting advice.
                You should consult qualified professionals for advice
                specific to your jurisdiction and circumstances.
            </p>
        ),
    },
    {
        id: "jurisdiction",
        title: "Jurisdiction and Access Restrictions",
        content: (
            <p>
                Some services may be restricted or unavailable in certain
                jurisdictions due to local laws and regulations. It is
                your responsibility to ensure you may lawfully access
                and use our services from your location.
            </p>
        ),
    },
    {
        id: "limitation-of-liability",
        title: "Limitation of Liability",
        content: (
            <p>
                To the fullest extent permitted by applicable law,
                Shenron and its affiliates, officers, employees and
                contractors will not be liable for any direct, indirect,
                incidental, consequential or punitive damages arising
                from your use of our services or reliance on our content.
            </p>
        ),
    },
    {
        id: "changes",
        title: "Changes to This Disclaimer",
        content: (
            <p>
                We may update this Disclaimer at any time. Material
                changes will be posted on the site. Continuing to use
                our services after updates means you accept the revised
                Disclaimer.
            </p>
        ),
    },
    {
        id: "contact",
        title: "Contact and Legal Notice",
        content: (
            <p>
                If you have questions about this Disclaimer or our
                policies, contact: <strong>Shenron Global</strong> —
                Email:{" "}
                <a href="mailto:support@shenronglobal.ae">
                    support@shenronglobal.ae
                </a>
            </p>
        ),
    },
];

const Disclaimer = () => {
    return (
        <main className="terms-page disclaimer-page">

            {/* HERO SECTION */}
            <section className="legal-hero">
                <span className="legal-eyebrow">
                    Legal
                </span>

                <h1>
                    Disclaimer
                </h1>

                <p>
                    Important information about educational content,
                    trading risk, performance and liability.
                </p>
            </section>

            {/* MAIN CONTENT */}
            <div className="legal-content-wrapper">

                {/* SIDEBAR */}
                <aside className="legal-sidebar">
                    <nav
                        className="legal-toc"
                        aria-label="Disclaimer contents"
                    >
                        {disclaimerSections.map((section, index) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                            >
                                <span className="toc-number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {section.title}
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* DISCLAIMER CONTENT */}
                <article className="legal-content">

                    <p className="legal-intro">
                        Shenron Global (“Shenron,” “we,” “us,” or
                        “our”) provides market education, research,
                        trade signals, webinars, mentorship and
                        related informational services. By accessing
                        or using our website, products or services
                        you acknowledge and agree to this Disclaimer.
                        If you do not accept these terms, please stop
                        using our services immediately.
                    </p>

                    {disclaimerSections.map((section) => (
                        <section
                            className="legal-section"
                            id={section.id}
                            key={section.id}
                        >
                            <h2>{section.title}</h2>

                            {section.content}
                        </section>
                    ))}

                    {/* CONTACT CARD */}
                    <div className="legal-acceptance">
                        <span className="legal-contact-label">
                            HAVE A LEGAL QUESTION?
                        </span>

                        <h2>
                            We're here to help.
                        </h2>

                        <p>
                            For questions regarding this Disclaimer
                            or any of our policies, reach out to our
                            support team.
                        </p>

                        <a
                            href="mailto:support@shenronglobal.ae"
                            className="legal-contact-button"
                        >
                            Contact Shenron
                            <span>↗</span>
                        </a>
                    </div>

                </article>
            </div>
        </main>
    );
};

export default Disclaimer;
