import { serve } from 'https://deno.fresh.dev/std@0.168.0/http/server.ts';
import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

// List of allowed origins
const allowedOrigins = [
  'https://parascape.org',
  'https://www.parascape.org',
  'http://parascape.org',
  'http://www.parascape.org',
  'http://localhost:5173',
  'http://localhost:4173'
];

serve(async (req) => {
  // Get the request origin
  const origin = req.headers.get('origin') || '';
  
  // Create CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }), 
      { 
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }

  try {
    const formData = await req.json();
    console.log('Received form data:', formData);

    // Send test email
    const emailResponse = await resend.emails.send({
      from: 'team@contact.parascape.org',
      to: 'contact@parascape.org',
      subject: 'Test Contact Form Submission',
      html: '<p>This is a test email from the new contact-form Edge Function.</p>'
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { 
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
}); 