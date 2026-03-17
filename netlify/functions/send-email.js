import nodemailer from 'nodemailer';

/**
 * Netlify Serverless Function to send emails
 * 
 * Environment variables needed:
 * - EMAIL_USER: Your email address (e.g., your-gmail@gmail.com)
 * - EMAIL_PASSWORD: App password or email password (for Gmail, use App Password)
 * - RECIPIENT_EMAIL: Where to send the contact form (pandey2928uday@gmail.com)
 * 
 * Setup for Gmail:
 * 1. Enable 2-factor authentication on your Google account
 * 2. Go to myaccount.google.com/apppasswords
 * 3. Generate an App Password for Mail
 * 4. Use this password as EMAIL_PASSWORD
 */

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }

  const { name, email, message } = body;

  // Validate input
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' })
    };
  }

  try {
    // Send email to you
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || 'pandey2928uday@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message from Your Portfolio Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    // Optional: Send confirmation email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Uday Pandey</p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message })
    };
  }
}
