
import React from "react";
import "./TermsAndConditions.css";
import "./Policy.css";

const privacySections = [
  {
    id: "controller-and-contact",
    title: "Controller and Contact",
    content: (
      <>
        <p>
          <strong>Data controller:</strong> Shenron Global, Business Centre,
          A3 Dubai South Business Park - Dubai - United Arab Emirates.
        </p>
        <p>
          <strong>Privacy contact:</strong>{" "}
          <a href="mailto:support@shenronglobal.ae">
            support@shenronglobal.ae
          </a>.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>
          We collect information you provide directly and data collected
          automatically when you use our services.
        </p>

        <h3>A. Information you provide</h3>
        <ul>
          <li><strong>Identity and account:</strong> full name, date of birth (where required), username, profile photo.</li>
          <li><strong>Contact:</strong> email address, phone number, postal address.</li>
          <li><strong>Financial/payment:</strong> billing address, payment method identifiers (card token, bank details) — payments are processed via third-party payment providers.</li>
          <li><strong>Verification and KYC:</strong> government ID, proof of address, corporate registration documents for business accounts.</li>
          <li><strong>Communications:</strong> messages, support requests, call recordings (where applicable), and correspondence.</li>
          <li><strong>Preferences:</strong> account settings, delivery channel choices (email/Telegram/app), marketing preferences.</li>
        </ul>

        <h3>B. Information collected automatically</h3>
        <ul>
          <li><strong>Usage data:</strong> IP address, device and browser type, operating system, pages visited, clickstream, referrer, session timings and other analytics.</li>
          <li><strong>Cookies and tracking:</strong> cookies, pixels, local storage and similar technologies.</li>
          <li><strong>Integration data:</strong> broker account identifiers or trade data only when you connect an external broker through our integrations and explicitly authorize access.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use personal data for the following purposes:</p>
        <ul>
          <li><strong>To deliver services:</strong> provide signals, alerts, copy trading connectivity, portfolio management, reports and customer support.</li>
          <li><strong>Account administration:</strong> registration, authentication, billing, subscription management and communications.</li>
          <li><strong>Compliance:</strong> KYC/AML checks, fraud prevention, sanctions screening and records required by law.</li>
          <li><strong>Product improvement and analytics:</strong> site analytics, performance monitoring and service development.</li>
          <li><strong>Marketing and communications:</strong> newsletters, promotional offers and market updates (with consent where legally required).</li>
          <li><strong>Legal and security:</strong> detect and prevent abuse, enforce our Terms, respond to legal requests and protect the rights and safety of Shenron and users.</li>
        </ul>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal Bases for Processing",
    content: (
      <>
        <p>
          Depending on jurisdiction and the type of processing, we rely on one
          or more legal bases to process personal data, which may include:
        </p>
        <ul>
          <li>Contractual necessity (to perform the services you request).</li>
          <li>Legal obligation (to comply with KYC/AML, tax and reporting duties).</li>
          <li>Legitimate interests (service operation, fraud prevention, product improvement), balanced against user rights.</li>
          <li>Consent (for marketing communications and non-essential cookies where required).</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Tracking Technologies",
    content: (
      <>
        <p>
          We use cookies and similar technologies to operate the site and
          improve user experience.
        </p>
        <ul>
          <li><strong>Types:</strong> essential cookies (required for platform functionality), performance/analytics cookies, functional cookies and marketing/advertising cookies.</li>
          <li><strong>Consent:</strong> where required by law we will request consent before setting non-essential cookies. You can manage and delete cookies via your browser settings; note that disabling certain cookies may affect functionality.</li>
          <li><strong>Cookie policy:</strong> a separate Cookie Policy page will provide detailed cookie lists, retention periods and management instructions.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Sharing and Disclosure of Data",
    content: (
      <>
        <p>We may share personal data with:</p>
        <ul>
          <li><strong>Service providers:</strong> payment processors, hosting/cloud providers, email platforms, analytics providers, CRM and customer support vendors — only to the extent necessary to provide services.</li>
          <li><strong>Broker partners:</strong> when you connect your broker account, data required for integration and trade mirroring is shared only with your explicit authorization.</li>
          <li><strong>Legal and regulatory bodies:</strong> where required by law, regulation, court order or to respond to lawful requests.</li>
          <li><strong>Business transfers:</strong> in the event of a merger, acquisition or sale of assets, personal data may be transferred subject to confidentiality and legal protections. We do not sell personal data to third parties.</li>
        </ul>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International Transfers",
    content: (
      <p>
        Shenron operates globally; personal data may be transferred to,
        processed, or stored in jurisdictions outside your country of
        residence. Where transfers occur, we apply appropriate safeguards
        (e.g., standard contractual clauses or other lawful transfer
        mechanisms) as required by applicable law.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: (
      <>
        <p>
          We retain personal data only as long as necessary to fulfil the
          purposes described, comply with legal obligations, resolve disputes,
          and enforce agreements. Typical retention periods:
        </p>
        <ul>
          <li><strong>KYC and transaction records:</strong> minimum 5 years (or as required by law).</li>
          <li><strong>Account information and billing:</strong> while account is active and for a reasonable period afterwards (e.g., 2–7 years) for recordkeeping and tax obligations.</li>
          <li><strong>Marketing preferences:</strong> until you withdraw consent. Specific retention schedules will be documented internally and updated per legal requirements.</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "Security Measures",
    content: (
      <p>
        We implement technical and organizational measures to protect personal
        data, including encryption in transit, access controls, secure servers
        and regular security monitoring. While we strive to protect data, no
        system can be guaranteed completely secure; report suspected breaches
        to <a href="mailto:support@shenronglobal.ae">support@shenronglobal.ae</a>{" "}
        immediately.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <>
        <p>Depending on your jurisdiction, you may have rights including:</p>
        <ul>
          <li><strong>Access:</strong> request confirmation of processing and a copy of personal data.</li>
          <li><strong>Correction:</strong> request correction of inaccurate or incomplete data.</li>
          <li><strong>Deletion:</strong> request erasure of personal data (subject to legal obligations to retain certain records).</li>
          <li><strong>Restriction:</strong> request restriction of processing in certain circumstances.</li>
          <li><strong>Portability:</strong> obtain a machine-readable copy of data you provided.</li>
          <li><strong>Objection:</strong> object to processing based on legitimate interests or to direct marketing.</li>
          <li><strong>Withdraw consent:</strong> withdraw any consent you previously gave (without affecting processing based on earlier consent).</li>
        </ul>
        <p>
          To exercise your rights, contact{" "}
          <a href="mailto:support@shenronglobal.ae">support@shenronglobal.ae</a>.
          We will respond within applicable legal timeframes and may require
          identity verification.
        </p>
      </>
    ),
  },
  {
    id: "minors",
    title: "Minors",
    content: (
      <p>
        Our services are intended for users aged 18 or older. We do not
        knowingly collect personal data from minors. If we learn that we have
        collected data from a minor, we will take steps to delete it.
      </p>
    ),
  },
  {
    id: "marketing",
    title: "Marketing Communications",
    content: (
      <p>
        We will send marketing emails or messages if you consented or as
        permitted by law. You can opt out at any time using the unsubscribe
        link or by contacting{" "}
        <a href="mailto:support@shenronglobal.ae">support@shenronglobal.ae</a>.
        Transactional and account-related communications (e.g., billing
        notices, security alerts) are not affected by marketing opt-out.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Links and Integrations",
    content: (
      <p>
        Our site may link to third-party websites and services. We are not
        responsible for the privacy practices or content of external sites.
        Review third-party privacy policies before providing personal
        information.
      </p>
    ),
  },
  {
    id: "data-processors",
    title: "Data Processors and Contracts",
    content: (
      <p>
        We require third-party service providers to process personal data only
        on our instructions and to maintain appropriate security measures.
        Contracts with processors include confidentiality and data protection
        obligations.
      </p>
    ),
  },
  {
    id: "complaints",
    title: "Complaints and Supervisory Authority",
    content: (
      <p>
        If you have a complaint about our handling of your personal data,
        contact{" "}
        <a href="mailto:support@shenronglobal.ae">support@shenronglobal.ae</a>.
        You may also have the right to lodge a complaint with a relevant data
        protection authority in your jurisdiction.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    content: (
      <p>
        We may update this policy to reflect changes in our practices or legal
        requirements. Material changes will be posted on the site and, where
        appropriate, notified by email. Please review this policy periodically.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Information",
    content: (
      <>
        <p>
          For privacy inquiries, data subject requests or complaints:
        </p>
        <p>
          <strong>Shenron Global</strong>
          <br />
          Business Centre, A3 Dubai South Business Park - Dubai - United Arab Emirates
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@shenronglobal.ae">
            support@shenronglobal.ae
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:+971565702852">+971565702852</a>
        </p>
      </>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <main className="terms-page privacy-policy-page">
      <section className="legal-hero">
        <span className="legal-eyebrow">LEGAL</span>

        <h1>
          Privacy <span>Policy</span>
        </h1>

        <p>
          How Shenron Global collects, uses, shares and protects
          personal information.
        </p>
      </section>

      <div className="legal-content-wrapper">
        <aside className="legal-sidebar">
          <nav className="legal-toc" aria-label="Privacy Policy contents">
            {privacySections.map((section, index) => (
              <a href={`#${section.id}`} key={section.id}>
                {String(index + 1).padStart(2, "0")}. {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="legal-content">
          <div className="legal-intro">
            <p>
              Shenron Global (“Shenron,” “we,” “us,” or “our”) is committed to
              protecting the privacy and security of the personal information
              we collect from users of our website, products and services.
              This Privacy Policy explains what information we collect, how
              we use and share it, your rights, and how to contact us. By
              accessing or using our services you consent to the collection
              and use of your information as described in this policy.
            </p>
          </div>

          {privacySections.map((section) => (
            <section
              className="legal-section"
              id={section.id}
              key={section.id}
            >
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
