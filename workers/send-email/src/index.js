import { Resend } from 'resend';

export default {
  async fetch(request, env, ctx) {
    const resend = new Resend(env.RESEND_API_KEY);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const formData = await request.json();
      const { name, email, phone, message, type } = formData;

      // Create email templates
      const userEmailHtml = `
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

      const adminEmailHtml = `
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

      // Send both emails using Resend SDK
      const [userResponse, adminResponse] = await Promise.all([
        // Send confirmation to user
        resend.emails.send({
          from: 'contact@connect.parascape.org',
          to: email,
          subject: 'Thank you for contacting Parascape',
          html: userEmailHtml
        }),
        // Send notification to admin
        resend.emails.send({
          from: 'contact@connect.parascape.org',
          to: 'recordsparascape@gmail.com',
          subject: `New ${type} Form Submission from ${name}`,
          html: adminEmailHtml,
          reply_to: email
        })
      ]);

      return new Response(JSON.stringify({
        success: true,
        data: { user: userResponse, admin: adminResponse }
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      console.error('Error sending emails:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'Failed to send emails'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
}; 