// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  organization?: string;
  contactPerson?: string;
  sponsorshipType?: string;
  projectType?: string;
  budget?: string;
  inquiryType?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactBody;
    console.log("Contact payload:", body);

    const { firstName, lastName, email, phone, subject, message, organization, contactPerson, sponsorshipType, projectType, budget, inquiryType } = body;

    if (!email || !message) {
      return NextResponse.json({ error: "Missing required fields (email and message)." }, { status: 400 });
    }

    // Read SMTP credentials from env
    const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
    const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const TO_EMAIL = process.env.TO_EMAIL || SMTP_USER;

    let transporter;

    // If SMTP credentials are set, use them. Otherwise, for local dev create an Ethereal test account.
    if (SMTP_USER && SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465, // true for 465, false for 587
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });
    } else {
      // Development fallback: Ethereal (fake SMTP) — shows a preview URL in the logs
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.warn("No SMTP creds found — using Ethereal test account. Email won't go to real inbox.");
    }

    // Verify connection (will throw if connection/auth fails)
    await transporter.verify();
    console.log("SMTP verified");

    // Build the email
    const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
    const mailSubject = subject?.trim() || `New contact — ${inquiryType ?? "general"}`;
    const html = `
      <h2>New contact submission</h2>
      <p><strong>Name:</strong> ${fullName || "N/A"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone ?? "N/A"}</p>
      <p><strong>Organization:</strong> ${organization ?? "N/A"}</p>
      <p><strong>Contact Person:</strong> ${contactPerson ?? "N/A"}</p>
      <p><strong>Sponsorship Type:</strong> ${sponsorshipType ?? "N/A"}</p>
      <p><strong>Project Type:</strong> ${projectType ?? "N/A"}</p>
      <p><strong>Budget:</strong> ${budget ?? "N/A"}</p>
      <p><strong>Inquiry Type:</strong> ${inquiryType ?? "N/A"}</p>
      <hr/>
      <p><strong>Message:</strong></p>
      <p>${message?.replace(/\n/g, "<br/>")}</p>
    `;

    const info = await transporter.sendMail({
      from: SMTP_USER ? `"Website Contact" <${SMTP_USER}>` : `"Website Contact" <no-reply@example.com>`,
      to: TO_EMAIL,
      subject: mailSubject,
      text: `Message from ${fullName || email}\n\n${message}`,
      html,
    });

    console.log("Message sent, id:", info.messageId);

    // If using Ethereal, print a preview URL (development help)
    if ((info as any).messageId && nodemailer.getTestMessageUrl) {
      const previewUrl = nodemailer.getTestMessageUrl(info as any);
      if (previewUrl) console.log("Preview URL (Ethereal):", previewUrl);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Email send error:", err);
    // In production avoid returning raw error messages; return for dev troubleshooting
    return NextResponse.json({ error: "Failed to send email", details: err?.message ?? String(err) }, { status: 500 });
  }
}
