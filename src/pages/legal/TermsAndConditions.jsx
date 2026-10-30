
import React from "react";
import "./TermsAndConditions.css";

const sections = [
  { id: "purpose-and-scope", title: "Purpose and scope" },
  { id: "risk-acknowledgement", title: "Risk acknowledgement" },
  { id: "regulatory-status", title: "Regulatory status" },
  { id: "services-and-fees", title: "Services and fees" },
  { id: "copy-trading", title: "Copy trading" },
  { id: "data-protection", title: "Data protection" },
  { id: "liability", title: "Liability" },
  { id: "governing-law", title: "Governing law" },
  { id: "contact-information", title: "Contact" },
];

export default function TermsAndConditions() {
  return (
    <main className="legal-page terms-page">

      {/* HERO SECTION */}
      <section className="legal-hero">
        <span className="legal-eyebrow">LEGAL</span>

        <h1>Terms &amp; Conditions</h1>

        <p>
          Shenron Global — Last updated: 06/29/2026
        </p>
      </section>

      {/* LEGAL CONTENT */}
      <section className="legal-content-wrapper">

        {/* TABLE OF CONTENTS */}
        <aside className="legal-sidebar">
          <nav className="legal-toc">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <article className="legal-content">

          <p className="legal-intro">
            Please read these Terms &amp; Conditions carefully before
            using the website and services of Shenron Global
            (“Shenron,” “we,” “us,” or “our”). By accessing or using
            our website, subscribing to services, or otherwise
            interacting with Shenron, you agree to be bound by
            these Terms. If you do not accept these Terms, please
            do not use our website or services.
          </p>

          <section id="purpose-and-scope" className="legal-section">
            <h2>Purpose and Scope</h2>
            <p>
              All materials, market commentary, trade signals,
              webinars, reports, instructional content and other
              information provided by Shenron are supplied solely
              for educational and informational purposes. Nothing
              contained on the site or in our communications
              constitutes legal, tax, investment or personalized
              financial advice. Users should seek independent
              professional advice tailored to their circumstances.
            </p>
          </section>

          <section id="risk-acknowledgement" className="legal-section">
            <h2>Risk Acknowledgement</h2>
            <p>
              Trading and investing in foreign exchange, precious
              metals (including XAU/USD), cryptocurrencies, indices
              and leveraged products carries substantial risk and
              may result in partial or total loss of capital. Past
              performance does not predict future outcomes. You
              must evaluate your own financial situation and risk
              tolerance before acting on any content provided by
              Shenron.
            </p>
          </section>

          <section className="legal-section">
            <h2>No Performance Guarantees</h2>
            <p>
              Shenron makes no representation or warranty that any
              signal, strategy, analysis, or educational product
              will produce profits or avoid losses. Examples, case
              studies, testimonials and historical illustrations
              are for explanatory purposes only and are not
              guarantees of future performance.
            </p>
          </section>

          <section className="legal-section">
            <h2>Eligibility and Legal Capacity</h2>
            <p>
              By using Shenron services you confirm that you are
              at least 18 years old (or the legal age to contract
              in your jurisdiction), have legal capacity to enter
              into these Terms and are permitted by local law to
              access our services. It is your responsibility to
              comply with all applicable laws and regulations in
              your jurisdiction.
            </p>
          </section>

          <section className="legal-section">
            <h2>Communications and Consent</h2>
            <p>
              By registering or subscribing you consent to receive
              communications from Shenron including account
              messages, service updates, newsletters, market
              commentary and promotional materials. You may opt
              out of marketing communications at any time as
              described in your account settings or by contacting
              support.
            </p>
          </section>

          <section id="regulatory-status" className="legal-section">
            <h2>Regulatory Status and Licensing</h2>
            <p>
              Shenron is a business entity incorporated in the
              United Arab Emirates. Our business address is:
              Business Centre, A3 Dubai South Business Park -
              Dubai - United Arab Emirates. Our services are
              informational and educational in nature. Shenron
              is not a broker, banking institution, or custodian
              unless expressly stated under formal agreement.
              Do not interpret content as personalized investment
              advice unless you have entered a separate, signed
              portfolio management agreement.
            </p>
          </section>

          <section className="legal-section">
            <h2>Restricted Jurisdictions and Access</h2>
            <p>
              Certain services may be unavailable in jurisdictions
              where local laws prohibit provision of such services.
              Users are responsible for ensuring they may lawfully
              use our services from their location. Shenron reserves
              the right to refuse service or block access where
              required to comply with applicable laws or sanctions.
            </p>
          </section>

          <section id="services-and-fees" className="legal-section">
            <h2>Services, Subscriptions and Fees</h2>
            <p>
              All services (signals, subscription plans,
              copy-trading access, training packages, portfolio
              management mandates, consultations) are provided
              for the fees stated on the Pricing page or in the
              applicable agreement. By purchasing services you
              agree to the fees, billing frequency and payment
              terms presented at checkout.
            </p>
          </section>

          <section className="legal-section">
            <h2>Payment, Renewal and Cancellation</h2>
            <p>
              Subscriptions renew automatically unless canceled
              prior to the next billing date. Cancellation
              procedures and refund eligibility are described
              in our Refund &amp; Cancellation Policy. You authorize
              Shenron to charge the payment method you provide
              for applicable fees and taxes.
            </p>
          </section>

          <section className="legal-section">
            <h2>Refunds and Disputes</h2>
            <p>
              Refund eligibility depends on the specific product
              or promotion and the terms shown at purchase.
              Refunds for promotional trials and certain digital
              products may be limited. Disputes should be raised
              with support@shenronglobal.com and will be
              investigated in accordance with our internal
              procedures.
            </p>
          </section>

          <section id="copy-trading" className="legal-section">
            <h2>Copy Trading &amp; Portfolio Management Specifics</h2>
            <p>
              Copy trading and portfolio management services
              involve third-party brokers and execution systems.
              When you use these services you remain the owner
              of your accounts and are responsible for monitoring
              balances, margin requirements, and broker terms.
              Shenron does not guarantee execution prices or
              slippage and is not liable for losses caused by
              broker execution failures or market conditions.
              Portfolio management is provided only after a
              separate mandate is agreed and signed; those
              arrangements will govern duties, fees and fiduciary
              obligations (if any).
            </p>
          </section>

          <section className="legal-section">
            <h2>User Conduct and Account Responsibility</h2>
            <p>
              You are responsible for maintaining the
              confidentiality of your account credentials and
              for all activity under your account. You agree
              not to misuse the service, engage in fraudulent
              activity, or attempt to circumvent our security
              or billing systems. Shenron may suspend or
              terminate accounts for violations of these Terms
              or for illegal or abusive conduct.
            </p>
          </section>

          <section className="legal-section">
            <h2>Intellectual Property</h2>
            <p>
              All content on the Shenron website — including
              text, graphics, logos, images, reports, training
              materials, software and designs — is proprietary
              to Shenron or its licensors and is protected by
              copyright and other intellectual property laws.
              You may not reproduce, distribute, modify or
              create derivative works from our content without
              prior written permission.
            </p>
          </section>

          <section id="data-protection" className="legal-section">
            <h2>Confidentiality and Data Protection</h2>
            <p>
              Any personal information you provide is handled
              according to our Privacy Policy. Certain services
              require KYC/AML verification; by subscribing you
              consent to the collection, verification and storage
              of identification documents and other data as
              required for regulatory compliance.
            </p>
          </section>

          <section id="liability" className="legal-section">
            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Shenron
              and its officers, employees, contractors and
              partners shall not be liable for any direct,
              indirect, incidental, special, consequential or
              punitive damages arising out of your use of (or
              inability to use) our services, including lost
              profits, trading losses, or any damages resulting
              from reliance on our content. Nothing in these
              Terms limits liability to the extent such
              limitation is prohibited by applicable law.
            </p>
          </section>

          <section className="legal-section">
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend and hold harmless
              Shenron and its affiliates from any claims, losses,
              liabilities, expenses (including reasonable legal
              fees) arising from your breach of these Terms,
              your misuse of the services, or your violation
              of applicable law.
            </p>
          </section>

          <section className="legal-section">
            <h2>Termination and Suspension</h2>
            <p>
              Shenron may suspend or terminate your access to
              services at any time for conduct that violates
              these Terms, nonpayment, suspected fraud, or to
              comply with legal requirements. Termination does
              not automatically entitle you to a refund; see
              the Refund &amp; Cancellation Policy and specific
              plan terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>Changes to These Terms</h2>
            <p>
              We may modify these Terms at any time. Material
              changes will be posted on the site and, where
              appropriate, notified by email. Continued use of
              Shenron services following publication of changes
              constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>Third-Party Links and Services</h2>
            <p>
              Our website may link to or integrate with
              third-party services, brokers, data providers
              and platforms. Inclusion of a third-party link
              does not imply Shenron’s endorsement. We are
              not responsible for third-party content,
              services, or reliability.
            </p>
          </section>

          <section id="governing-law" className="legal-section">
            <h2>Governing Law and Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of the
              United Arab Emirates. Any dispute arising out
              of these Terms shall first be referred to
              good-faith negotiation. If unresolved, disputes
              may be submitted to binding arbitration or to
              the competent courts in the United Arab Emirates,
              as applicable.
            </p>
            <p>
              Business Address: Business Centre, A3 Dubai
              South Business Park - Dubai - United Arab Emirates.
            </p>
          </section>

          <section className="legal-section">
            <h2>Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy,
              Refund &amp; Cancellation Policy, Risk Disclosure
              and any service-specific agreements, constitute
              the entire agreement between you and Shenron
              Global regarding the services and supersede
              prior agreements.
            </p>
          </section>

          <section id="contact-information" className="legal-section">
            <h2>Contact Information</h2>
            <p>
              If you have questions about these Terms, please
              contact us at:
            </p>
            <p>
              <strong>Shenron Global</strong><br />
              Business Centre, A3 Dubai South Business Park -
              Dubai - United Arab Emirates.
            </p>
            <p>
              Email:{" "}
              <a href="mailto:support@shenronglobal.com">
                support@shenronglobal.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+971565702852">
                +971565702852
              </a>
            </p>
          </section>

          <section className="legal-section legal-acceptance">
            <h2>Acceptance</h2>
            <p>
              By using Shenron’s website and services you
              acknowledge that you have read, understood
              and agree to be bound by these Terms &amp; Conditions.
            </p>
          </section>

        </article>
      </section>
    </main>
  );
}
