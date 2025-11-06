import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
      inquiryType
    } = body

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password
      },
    })

    let emailSubject = ''
    let emailContent = ''

    switch (inquiryType) {
      case 'general':
        emailSubject = `General Inquiry: ${subject}`
        emailContent = `
          <h2>New General Inquiry</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
        break

      case 'commission':
        emailSubject = `Custom Commission Request: ${projectType}`
        emailContent = `
          <h2>New Custom Commission Request</h2>
          <p><strong>Name:</strong> ${firstName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
          <p><strong>Project Details:</strong></p>
          <p>${message}</p>
        `
        break

      case 'sponsorship':
        emailSubject = `Sponsorship Proposal: ${organization}`
        emailContent = `
          <h2>New Sponsorship Proposal</h2>
          <p><strong>Organization:</strong> ${organization}</p>
          <p><strong>Contact Person:</strong> ${contactPerson}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Sponsorship Type:</strong> ${sponsorshipType}</p>
          <p><strong>Proposal Details:</strong></p>
          <p>${message}</p>
        `
        break

      case 'partnership':
        emailSubject = `Partnership Proposal: ${organization}`
        emailContent = `
          <h2>New Partnership Proposal</h2>
          <p><strong>Organization:</strong> ${organization}</p>
          <p><strong>Contact Person:</strong> ${contactPerson}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Proposal Details:</strong></p>
          <p>${message}</p>
        `
        break

      default:
        emailSubject = `New Contact Form Submission: ${subject}`
        emailContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
    }

    // Send email to your organization
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER, // Where you want to receive emails
      subject: emailSubject,
      html: emailContent,
    })

    // Optional: Send confirmation email to the user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thank you for contacting us - Melad Manuscripts',
      html: `
        <h2>Thank You for Your Inquiry</h2>
        <p>Dear ${firstName},</p>
        <p>We have received your ${inquiryType} inquiry and will get back to you within 24 hours.</p>
        <p><strong>Our Contact Information:</strong></p>
        <p>Email: info@melad.org</p>
        <p>Phone: +251 91 234 5678</p>
        <p>Address: Grarar Jarso Wereda, Chagal, Debre Libanos, Ethiopia</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Melad Manuscripts Team</strong></p>
      `,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}