import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.parascape.org',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info',
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
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!supabaseUrl || !supabaseServiceKey || !resendApiKey) {
      throw new Error('Missing environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);

    // Parse form data
    const formData = await req.json() as FormData;
    console.log('Received data:', formData);

    // Store in Supabase
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        type: formData.type || 'contact'
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to store submission');
    }

    // Send admin notification
    await resend.emails.send({
      from: 'Parascape <onboarding@resend.dev>',
      to: 'contact@parascape.org',
      subject: `New ${formData.type || 'contact'} form submission`,
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Type:</strong> ${formData.type || 'contact'}</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `,
      reply_to: formData.email
    });

    // Send confirmation to user
    await resend.emails.send({
      from: 'Parascape <onboarding@resend.dev>',
      to: formData.email,
      subject: formData.type === 'audit' 
        ? 'Your Digital Audit Request - Parascape'
        : 'Thank you for contacting Parascape',
      html: `
        <h2>Thank you for reaching out, ${formData.name}!</h2>
        <p>We've received your message and will get back to you soon.</p>
        <p>Best regards,<br>The Parascape Team</p>
      `,
      reply_to: 'contact@parascape.org'
    });

    // Return success
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        data: submission
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