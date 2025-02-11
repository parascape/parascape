import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { Resend } from 'resend';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.parascape.org',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info, Accept',
  'Access-Control-Max-Age': '86400'
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type?: 'contact' | 'audit';
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('Missing Resend API key');
    }

    const resend = new Resend(resendApiKey);
    const formData = await req.json() as FormData;
    console.log('Received data:', formData);

    // Send confirmation to user first
    const { error: userEmailError } = await resend.emails.send({
      from: 'Parascape <no-reply@parascape.org>',
      to: [formData.email],
      subject: formData.type === 'audit' 
        ? 'Your Digital Audit Request - Parascape'
        : 'Thank you for contacting Parascape',
      html: `
        <h2>Thank you for reaching out, ${formData.name}!</h2>
        <p>We've received your message and will get back to you soon.</p>
        <p>Best regards,<br>The Parascape Team</p>
      `,
      replyTo: 'contact@parascape.org'
    });

    if (userEmailError) {
      console.error('User email error:', userEmailError);
      throw new Error('Failed to send confirmation email');
    }

    // Send admin notification
    const { error: adminEmailError } = await resend.emails.send({
      from: 'Parascape <no-reply@parascape.org>',
      to: ['contact@parascape.org'],
      subject: `New ${formData.type || 'contact'} form submission`,
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Type:</strong> ${formData.type || 'contact'}</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `,
      replyTo: formData.email
    });

    if (adminEmailError) {
      console.error('Admin email error:', adminEmailError);
      // Don't throw here, just log the error since user already got confirmation
      console.warn('Failed to send admin notification, but user was notified');
    }

    // Return success
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully'
      }), 
      { 
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}); 