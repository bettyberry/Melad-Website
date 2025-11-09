import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      organization,
      contactPerson,
      sponsorshipType,
      projectType,
      budget,
      inquiryType,
    } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // ✅ Build the email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_RECEIVER || process.env.GMAIL_USER,
      subject: `New Contact Form Submission (${inquiryType})`,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Organization: ${organization || "-"}
Contact Person: ${contactPerson || "-"}
Sponsorship Type: ${sponsorshipType || "-"}
Project Type: ${projectType || "-"}
Budget: ${budget || "-"}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending contact form:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
