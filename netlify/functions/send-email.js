const { Resend } = require('resend');

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Create email content with safe template replacement
function createEmailContent(template, data) {
  return template.replace(/\${(\w+)}/g, (_, key) => {
    return data[key] || '';
  });
}

exports.handler = async function(event, context) {
  // Set default headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Method Not Allowed' 
      })
    };
  }

  try {
    // Validate API key
    if (!process.env.RESEND_API_KEY) {
      throw new Error('Missing RESEND_API_KEY environment variable');
    }

    // Parse and validate request body
    let formData;
    try {
      formData = JSON.parse(event.body);
      console.log('Received form data:', formData);
    } catch (e) {
      console.error('JSON parse error:', e);
      throw new Error('Invalid JSON in request body');
    }

    const { name, email, phone, message, type } = formData;

    // Validate required fields
    if (!name || !email || !message || !type) {
      throw new Error('Missing required fields');
    }

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

    console.log('Sending emails for:', { name, email, phone, type });

    // Send both confirmation to user and notification to admin
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
        to: 'contact@parascape.org',
        subject: `New ${type} Form Submission from ${name}`,
        html: adminEmailHtml,
        reply_to: email
      })
    ]);

    console.log('Emails sent successfully:', { user: userResponse, admin: adminResponse });
    
    // Always return a JSON response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        data: { user: userResponse, admin: adminResponse } 
      })
    };
  } catch (error) {
    console.error('Error sending emails:', error);
    
    // Determine appropriate status code
    let statusCode = 500;
    if (error.message.includes('Missing RESEND_API_KEY')) statusCode = 503;
    if (error.message.includes('Invalid JSON')) statusCode = 400;
    if (error.message.includes('Missing required fields')) statusCode = 400;
    
    // Always return a JSON response
    return {
      statusCode,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send emails' 
      })
    };
  }
}; 