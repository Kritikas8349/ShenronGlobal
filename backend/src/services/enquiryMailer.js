import nodemailer from "nodemailer";

export function createEnquiryMailer(env) {
  if (!env.smtpConfigured) {
    return {
      configured: false,
      fromEmail: env.smtpFromEmail || "",
      async send() {
        const error = new Error("Company email sending is not configured yet.");
        error.status = 503;
        throw error;
      },
    };
  }

  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    requireTLS: !env.smtpSecure,
    auth: { user: env.smtpUser, pass: env.smtpPassword },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  return {
    configured: true,
    fromEmail: env.smtpFromEmail,
    async send(enquiry, message) {
      const result = await transporter.sendMail({
        from: { name: env.smtpFromName, address: env.smtpFromEmail },
        to: enquiry.email,
        replyTo: env.smtpFromEmail,
        subject: "Re: Your enquiry to Shenron Global",
        text: message,
      });
      if (!result.accepted?.length) throw new Error("The SMTP server did not accept this recipient.");
      return result;
    },
  };
}
