import { serve } from 'https://deno.fresh.dev/std@0.168.0/http/server.ts';
import { Resend } from 'resend';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const formData = await req.json();
    const { name, email, phone, message, type } = formData;

    if (!name || !email || !phone || !message || !type) {
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

    // Send both emails concurrently
    const [userResponse, adminResponse] = await Promise.all([
      // Send confirmation to user
      resend.emails.send({
        from: 'team@contact.parascape.org',
        to: email,
        subject: 'Thank you for contacting Parascape',
        html: userEmailHtml
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
    console.error('Error sending emails:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send emails';
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    );
  }
}); 