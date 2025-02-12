const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// User confirmation email template
const userConfirmationTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Thank you for contacting Parascape</title>
  </head>
  <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; color: #1f2937;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #059669; margin-bottom: 24px;">Thank you for reaching out, ${name}!</h1>
      <p style="margin-bottom: 16px; line-height: 1.5;">We've received your ${type} request and will get back to you as soon as possible.</p>
      <p style="margin-bottom: 8px; line-height: 1.5;">Here's a copy of your message:</p>
      <div style="background-color: #f3f4f6; padding: 16px; margin: 16px 0; border-radius: 6px; line-height: 1.5;">
        ${message}
      </div>
      <p style="margin-top: 24px; line-height: 1.5;">
        Best regards,<br>
        <strong>The Parascape Team</strong>
      </p>
    </div>
  </body>
</html>
`;

// Admin notification email template
const adminNotificationTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Form Submission</title>
  </head>
  <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; color: #1f2937;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #059669; margin-bottom: 24px;">New ${type} Form Submission</h1>
      <h2 style="color: #374151; margin-bottom: 16px;">Contact Details:</h2>
      <ul style="list-style: none; padding: 0; margin: 0 0 24px 0;">
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Name:</strong> ${name}</li>
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Email:</strong> ${email}</li>
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Phone:</strong> ${phone}</li>
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Form Type:</strong> ${type}</li>
      </ul>
      <h2 style="color: #374151; margin-bottom: 16px;">Message:</h2>
      <div style="background-color: #f3f4f6; padding: 16px; margin: 16px 0; border-radius: 6px; line-height: 1.5;">
        ${message}
      </div>
    </div>
  </body>
</html>
`;

exports.handler = async function(event, context) {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, phone, message, type } = JSON.parse(event.body);
    console.log('Sending emails for:', { name, email, phone, type });

    // Send both confirmation to user and notification to admin
    const [userResponse, adminResponse] = await Promise.all([
      // Send confirmation to user
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Thank you for contacting Parascape',
        html: userConfirmationTemplate.replace(/\${(\w+)}/g, (_, key) => ({
          name, type, message
        })[key] || '')
      }),
      // Send notification to admin
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'onboarding@resend.dev',
        subject: `New ${type} Form Submission from ${name}`,
        html: adminNotificationTemplate.replace(/\${(\w+)}/g, (_, key) => ({
          name, email, phone, type, message
        })[key] || ''),
        reply_to: email
      })
    ]);

    console.log('Emails sent successfully:', { user: userResponse, admin: adminResponse });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        data: { user: userResponse, admin: adminResponse } 
      })
    };
  } catch (error) {
    console.error('Error sending emails:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send emails' 
      })
    };
  }
}; 