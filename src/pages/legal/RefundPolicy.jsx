
import React from "react";
import "./TermsAndConditions.css";
import "./RefundPolicy.css";

const refundSections = [
  {
    id: "core-principle",
    title: "Core Principle",
    content: [
      {
        type: "paragraph",
        text: "Shenron Global’s services are primarily informational and delivered in real time. Because access is granted immediately after payment and services are consumed (signals sent, content accessed, onboarding begun), refunds are limited as described below. We encourage prospective clients to evaluate our free offerings and trial options before purchasing.",
      },
    ],
  },
  {
    id: "trials",
    title: "Free Trials and Promotional Offers",
    content: [
      {
        type: "list",
        items: [
          <>
            <strong>Trial availability:</strong> Where offered, trials (e.g., 3-day or 7-day Pro trials) allow limited access to premium features for the trial period.
          </>,
          <>
            <strong>Trial conversion:</strong> If a trial converts to a paid subscription (automatic or manual), cancellation and refund terms of the selected plan apply from the conversion date.
          </>,
        ],
      },
    ],
  },
  {
    id: "subscriptions",
    title: "Subscriptions (Monthly, Quarterly, Annual)",
    content: [
      {
        type: "list",
        items: [
          <>
            <strong>Immediate access:</strong> Paid subscriptions provide immediate access to premium content and channels upon successful payment. Because services are delivered immediately, refunds for the current billing period are generally not provided.
          </>,
          <>
            <strong>Cancellation:</strong> You may cancel automatic renewal at any time via your account settings. Cancellation prevents future renewals but does not usually entitle you to a pro-rata refund for the current billing period unless explicitly stated at checkout.
          </>,
          <>
            <strong>Annual plans and minimum terms:</strong> Annual and promotional plans may include minimum commitment periods or specific cancellation rules shown at purchase. Review plan terms at checkout.
          </>,
        ],
      },
    ],
  },
  {
    id: "non-refundable-items",
    title: "Non-Refundable Items / Limited Refund Exceptions",
    content: [
      {
        type: "list",
        items: [
          <>
            <strong>Non-refundable by default:</strong> Standard signal subscriptions, digital products and consulting sessions are non-refundable once access is granted, unless there is a demonstrable billing error or Shenron cancels the service.
          </>,
          <>
            <strong>Exceptions at Shenron’s discretion:</strong> In exceptional cases (e.g., duplicate billing, verified technical failure on Shenron’s platform preventing access, or Shenron’s decision not to provide the service due to compliance/KYC issues), Shenron may, at its sole discretion, offer a pro-rata refund, credit, or alternative remedy. Any such remedy will be processed after verification and typically within 7–14 business days.
          </>,
          <>
            <strong>No refund for third-party failure:</strong> Refunds are not issued for delivery failures caused by third-party systems (e.g., client’s SMS carrier, Telegram delivery issues, broker connectivity) where Shenron’s logs show successful dispatch.
          </>,
        ],
      },
    ],
  },
  {
    id: "copy-trading",
    title: "Copy Trading, Portfolio Management & Tailored Services",
    content: [
      {
        type: "list",
        items: [
          <>
            <strong>Copy trading access fees:</strong> Fees for copy-trading access or trader subscription are governed by the plan terms displayed at purchase. Performance fees are charged per the selected arrangement and are non-refundable once earned and paid.
          </>,
          <>
            <strong>Portfolio mandates:</strong> Portfolio management services require a separate mandate/agreement that sets out fees (management and performance), notice periods, withdrawal rules and refund mechanics. Management fees typically accrue and are non-refundable; performance fees are calculated per the mandate. Review the mandate carefully before signing.
          </>,
        ],
      },
    ],
  },
  {
    id: "suspension-and-start-dates",
    title: "Account Suspension, Modification & Service Start Dates",
    content: [
      {
        type: "list",
        items: [
          <>
            <strong>Start date flexibility:</strong> If you cannot begin using a service immediately, contact support before live signals begin. Where operationally feasible and at Shenron’s discretion, we may defer or suspend commencement to a mutually agreed date — this is not a refund.
          </>,
          <>
            <strong>Temporary suspension:</strong> Requests to pause subscriptions for reasons outside Shenron’s control may be considered on a case-by-case basis; approval is discretionary and does not imply refund entitlement.
          </>,
        ],
      },
    ],
  },
  {
    id: "billing-disputes",
    title: "Billing Disputes, Errors & Chargebacks",
    content: [
      {
        type: "list",
        items: [
          <>
            <strong>Report promptly:</strong> Report billing errors promptly to support@shenronglobal.com. Shenron will investigate and, where appropriate, refund duplicate or erroneous charges.
          </>,
          <>
            <strong>Chargebacks:</strong> Initiating a chargeback without contacting Shenron may result in immediate suspension. Shenron will cooperate with payment processor investigations; fraudulent chargebacks may lead to termination and collection actions.
          </>,
        ],
      },
    ],
  },
  {
    id: "request-process",
    title: "How to Request a Refund or Cancellation",
    content: [
      {
        type: "list",
        items: [
          <>
            <strong>Cancellation:</strong> Cancel subscriptions via your account dashboard or email support@shenronglobal.com with your account details.
          </>,
          <>
            <strong>Refund requests:</strong> Email support@shenronglobal.com with order details and reason. Provide supporting evidence where relevant. Shenron will acknowledge receipt and investigate within 5 business days.
          </>,
          <>
            <strong>Resolution timeframe:</strong> Where a refund is approved, funds will be returned via the original payment method within 7–14 business days (times vary by payment provider).
          </>,
        ],
      },
    ],
  },
  {
    id: "special-cases",
    title: "Special Cases and Disputes",
    content: [
      {
        type: "list",
        items: [
          <>
            <strong>Good-faith resolution:</strong> Shenron aims to resolve disputes fairly. Escalate unresolved issues by following the escalation path provided in response to your request (support → billing manager → compliance/legal).
          </>,
          <>
            <strong>Final determination:</strong> Shenron reserves the right to make final determinations on refund eligibility subject to applicable law.
          </>,
        ],
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: [
      {
        type: "paragraph",
        text: "Shenron may update this Refund & Cancellation Policy from time to time. Material changes will be posted on the website and, where appropriate, notified by email. Continued use of services after publication constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    id: "consumer-rights",
    title: "Consumer Rights and Local Law",
    content: [
      {
        type: "paragraph",
        text: "This policy does not limit any statutory rights that may apply to consumers under applicable local law. Where local consumer protection rules require different refund terms, those rules will apply.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    content: [
      {
        type: "paragraph",
        text: "For cancellations, refunds or billing questions:",
      },
    ],
  },
];

const RefundPolicy = () => {
  return (
    <main className="terms-page refund-policy-page">
      <section className="legal-hero">
        <div className="legal-hero-content">
          <span className="legal-eyebrow">
            <span />
            LEGAL
            <span />
          </span>

          <h1>
            Refund & Cancellation
            <span> Policy</span>
          </h1>

          <p>
            Cancellation, refund eligibility and billing-dispute terms
            for Shenron Global services.
          </p>
        </div>
      </section>

      <div className="legal-content-wrapper">
        <aside className="legal-sidebar">
          <div className="legal-toc">
            <div className="legal-toc-heading">
              <span>ON THIS PAGE</span>
              <span className="legal-toc-line" />
            </div>

            <nav aria-label="Refund policy sections">
              {refundSections.map((section, index) => (
                <a key={section.id} href={`#${section.id}`}>
                  <span className="toc-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{section.title}</span>
                </a>
              ))}
            </nav>

            <div className="legal-sidebar-contact">
              <span>NEED HELP?</span>
              <p>Have a question about billing or refunds?</p>
              <a href="/contact-us">
                Contact Support <span>↗</span>
              </a>
            </div>
          </div>
        </aside>

        <article className="legal-content">
          <div className="legal-intro">
            <span className="legal-intro-label">POLICY OVERVIEW</span>
            <p>
              This Refund & Cancellation Policy applies to all paid services
              offered by Shenron Global, including signal subscriptions,
              copy-trading access, educational products, consultations, and
              portfolio management onboarding, except where a separate written
              agreement specifies different terms.
            </p>
          </div>

          {refundSections.map((section, index) => (
            <section
              className="legal-section"
              id={section.id}
              key={section.id}
            >
              <div className="legal-section-heading">
                <span className="legal-section-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2>{section.title}</h2>
              </div>

              <div className="legal-section-body">
                {section.content.map((item, itemIndex) => {
                  if (item.type === "paragraph") {
                    return <p key={itemIndex}>{item.text}</p>;
                  }

                  if (item.type === "list") {
                    return (
                      <ul key={itemIndex}>
                        {item.items.map((listItem, listIndex) => (
                          <li key={listIndex}>{listItem}</li>
                        ))}
                      </ul>
                    );
                  }

                  return null;
                })}
              </div>
            </section>
          ))}

          <div className="legal-acceptance refund-contact-card">
            <div className="refund-contact-icon">✉</div>
            <div>
              <span className="legal-contact-label">CONTACT SHENRON GLOBAL</span>
              <h3>Need help with a refund or cancellation?</h3>
              <p>
                For cancellations, refunds or billing questions, reach out
                to our support team.
              </p>
              <a href="mailto:support@shenronglobal.com">
                support@shenronglobal.com <span>↗</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default RefundPolicy;
