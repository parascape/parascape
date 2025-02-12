import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const formData = JSON.parse(event.body);
    const { name, email, phone, message, type } = formData;

    // Create email content
    const userEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank you for contacting Parascape</title>
        </head>
        <body style="font-family: system-ui, sans-serif; color: #1f2937;">
          <h1 style="color: #059669;">Thank you for reaching out, ${name}!</h1>
          <p>We've received your ${type} request and will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <div style="background-color: #f3f4f6; padding: 16px; margin: 16px 0;">
            ${message}
          </div>
          <p>Best regards,<br><strong>The Parascape Team</strong></p>
        </body>
      </html>
    `;

    const adminEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: system-ui, sans-serif; color: #1f2937;">
          <h1 style="color: #059669;">New ${type} Form Submission</h1>
          <h2>Contact Details:</h2>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Form Type:</strong> ${type}</li>
          </ul>
          <h2>Message:</h2>
          <div style="background-color: #f3f4f6; padding: 16px; margin: 16px 0;">
            ${message}
          </div>
        </body>
      </html>
    `;

    // Send both emails concurrently
    const [userResponse, adminResponse] = await Promise.all([
      // Send confirmation to user
      resend.emails.send({
        from: process.env.EMAIL_FROM || 'contact@parascape.org',
        to: email,
        subject: 'Thank you for contacting Parascape',
        html: userEmailContent
      }),
      // Send notification to admin
      resend.emails.send({
        from: process.env.EMAIL_FROM || 'contact@parascape.org',
        to: process.env.ADMIN_EMAIL || 'contact@parascape.org',
        subject: `New ${type} Form Submission from ${name}`,
        html: adminEmailContent,
        reply_to: email
      })
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: { user: userResponse, admin: adminResponse } })
    };
  } catch (error) {
    console.error('Error sending emails:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send emails' 
      })
    };
  }
}; 