import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from '@supabase/supabase-js';
import { SMTPClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://parascape.org',  // Production domain from CNAME
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info, Accept',
  'Access-Control-Max-Age': '86400'
};

// Initialize Supabase client
const supabaseUrl = 'https://hjhpcawffvgcczhxcjsr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqaHBjYXdmZnZnY2N6aHhjanNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4OTAyMDksImV4cCI6MjA1MjQ2NjIwOX0.GPBSmG_F06Uw0SzEwiaSGZ8xfuaU7dZj8k5WqfgjAf8';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize SMTP client
const client = new SMTPClient({
  connection: {
    hostname: "smtp.resend.com",
    port: 465,
    tls: true,
    auth: {
      username: "resend",
      password: Deno.env.get('RESEND_API_KEY') || ''
    }
  }
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type?: 'contact' | 'audit';
}

async function sendEmail(to: string, subject: string, html: string) {
  try {
    await client.send({
      from: "Parascape <contact@parascape.org>",
      to: to,
      subject: subject,
      content: html,
      html: html
    });
  } catch (error) {
    console.error('SMTP error:', error);
    throw new Error('Failed to send email');
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Method not allowed'
      }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }

  try {
    const formData = await req.json() as FormData;
    console.log('Received data:', formData);

    // First check if the table exists
    const { data: tables, error: tableError } = await supabase
      .from('contact_submissions')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('Table check error:', {
        message: tableError.message,
        details: tableError.details,
        hint: tableError.hint,
        code: tableError.code
      });
      throw new Error(`Database table error: ${tableError.message}`);
    }

    console.log('Table check successful');

    // Store submission in Supabase
    const { data: insertData, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          type: formData.type || 'contact',
          status: 'pending'
        }
      ])
      .select();

    if (dbError) {
      console.error('Database error:', {
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint,
        code: dbError.code
      });
      throw new Error(`Failed to store submission: ${JSON.stringify({
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint,
        code: dbError.code
      })}`);
    }

    console.log('Stored submission:', insertData);

    // Send confirmation to user
    try {
      await sendEmail(
        formData.email,
        formData.type === 'audit' 
          ? 'Your Digital Audit Request - Parascape'
          : 'Thank you for contacting Parascape',
        `
          <h2>Thank you for reaching out, ${formData.name}!</h2>
          <p>We've received your message and will get back to you soon.</p>
          <p>Best regards,<br>The Parascape Team</p>
        `
      );
    } catch (emailError) {
      console.error('User email error:', emailError);
      // Don't throw here, continue with admin notification
    }

    // Send admin notification
    try {
      await sendEmail(
        'contact@parascape.org',
        `New ${formData.type || 'contact'} form submission`,
        `
          <h2>New Form Submission</h2>
          <p><strong>Type:</strong> ${formData.type || 'contact'}</p>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
        `
      );
    } catch (emailError) {
      console.error('Admin email error:', emailError);
      // Don't throw here since we've already stored the submission
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