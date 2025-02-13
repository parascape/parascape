import { serve } from 'https://deno.fresh.dev/std@0.168.0/http/server.ts';
import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

// List of allowed origins
const allowedOrigins = [
  'https://parascape.org',
  'https://www.parascape.org',
  'http://parascape.org',
  'http://www.parascape.org'
];

serve(async (req) => {
  // Get the request origin
  const origin = req.headers.get('origin') || '';
  
  // Create CORS headers based on the origin
  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Max-Age': '86400', // 24 hours cache for preflight requests
    'Vary': 'Origin' // Important for CDN caching
  };

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Method not allowed' 
      }), 
      { 
        status: 405,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      }
    );
  }

  try {
    // Parse and validate request body
    const formData = await req.json();
    console.log('Received form data:', formData);

    const { name, email, phone, message, type } = formData;

    // Validate required fields
    if (!name || !email || !phone || !message || !type) {
      throw new Error('Missing required fields');
    }

    // Validate email format
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
      throw new Error('Invalid phone format');
    }

    // Create email templates
    const userEmailHtml = `
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

    const adminEmailHtml = `
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

    console.log('Attempting to send emails...');

    // Send both emails concurrently
    const [userResponse, adminResponse] = await Promise.all([
      // Send confirmation to user
      resend.emails.send({
        from: 'team@contact.parascape.org',
        to: email,
        subject: 'Thank you for contacting Parascape',
        html: userEmailHtml,
        reply_to: 'contact@parascape.org'
      }),
      // Send notification to admin
      resend.emails.send({
        from: 'team@contact.parascape.org',
        to: 'contact@parascape.org',
        subject: `New ${type} Form Submission from ${name}`,
        html: adminEmailHtml,
        reply_to: email
      })
    ]);

    console.log('Emails sent successfully:', { userResponse, adminResponse });

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { user: userResponse, admin: adminResponse } 
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    // Determine if this is a known error type
    const isKnownError = error instanceof Error;
    const status = isKnownError ? 400 : 500;
    const message = isKnownError ? error.message : 'An unexpected error occurred';
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: message
      }),
      { 
        status,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    );
  }
});

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone format (basic validation)
function isValidPhone(phone: string): boolean {
  return phone.length >= 10;
} 