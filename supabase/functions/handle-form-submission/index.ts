/// <reference types="https://deno.land/x/types/index.d.ts" />
/// <reference lib="deno.ns" />

import { serve } from "std/http/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Initialize Resend with API key from environment variable
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
if (!RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not set');
}
const resend = new Resend(RESEND_API_KEY);

// Initialize Supabase client using built-in environment variables
const supabase = createClient(
  Deno.env.get('DB_URL') ?? '',
  Deno.env.get('DB_ANON_KEY') ?? '',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  }
);

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  type?: 'contact' | 'audit'
}

// Updated CORS headers to be more permissive
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Max-Age': '86400',
}

const getWelcomeEmailHtml = (name: string, type: string) => {
  const isAudit = type === 'audit'
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { color: #10B981; font-size: 24px; margin-bottom: 20px; }
          .content { margin-bottom: 30px; }
          .footer { color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            Welcome to Parascape, ${name}!
          </div>
          <div class="content">
            <p>Thank you for reaching out to us. ${
              isAudit 
                ? "We're excited to help you discover opportunities to improve your digital presence."
                : "We're looking forward to discussing how we can help transform your business."
            }</p>
            
            <p>${
              isAudit
                ? "Our team will begin working on your digital audit right away. We'll analyze your current online presence and identify key areas for improvement."
                : "Our team will review your message and get back to you within 1-2 business days with personalized recommendations for your business."
            }</p>

            <p>In the meantime, feel free to explore our services at <a href="https://parascape.org/services">parascape.org/services</a>.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The Parascape Team</p>
            <p>
              Parascape Digital Solutions<br>
              Arcata, CA<br>
              <a href="tel:17073626816">1(707)362-6816</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

const getAdminNotificationHtml = (formData: FormData) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { color: #10B981; font-size: 24px; margin-bottom: 20px; }
          .content { margin-bottom: 30px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            New Form Submission
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Type:</div>
              <div>${formData.type || 'contact'}</div>
            </div>
            <div class="field">
              <div class="label">Name:</div>
              <div>${formData.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div>${formData.email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div>${formData.phone}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div>${formData.message}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  try {
    const origin = req.headers.get('origin');
    console.log('Request details:', {
      method: req.method,
      origin,
      headers: Object.fromEntries(req.headers.entries()),
      url: req.url
    });

    const formData: FormData = await req.json();
    console.log('Received form data:', formData);
    
    // Store in Supabase with better error handling
    try {
      const supabaseUrl = Deno.env.get('DB_URL');
      const supabaseKey = Deno.env.get('DB_ANON_KEY');
      
      console.log('Database connection info:', {
        url: supabaseUrl ? 'Set' : 'Not set',
        key: supabaseKey ? 'Key present' : 'Key missing',
        formData: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          type: formData.type || 'contact'
        }
      });

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Database credentials not properly configured');
      }

      // Test database connection
      const { data: testData, error: testError } = await supabase
        .from('contacts')
        .select('id')
        .limit(1);

      if (testError) {
        console.error('Database connection test failed:', testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }

      console.log('Database connection test successful');
      
      // Proceed with insert
      const { data, error: dbError } = await supabase
        .from('contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          type: formData.type || 'contact',
          status: 'new'
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error details:', {
          code: dbError.code,
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
          full: JSON.stringify(dbError)
        });
        throw new Error(`Database error: ${dbError.message}`);
      }

      if (!data) {
        console.error('No data returned from insert');
        throw new Error('Failed to insert data - no error but no data returned');
      }

      console.log('Successfully stored in database:', data);
    } catch (error) {
      console.error('Database operation failed:', error);
      throw new Error('Failed to store form submission in database');
    }

    // Send welcome email with better error handling
    try {
      console.log('Attempting to send welcome email...');
      const welcomeEmailResult = await resend.emails.send({
        from: 'Parascape <onboarding@resend.dev>',
        to: formData.email,
        subject: formData.type === 'audit' 
          ? 'Your Digital Audit Request - Parascape'
          : 'Welcome to Parascape',
        html: getWelcomeEmailHtml(formData.name, formData.type || 'contact'),
        reply_to: 'contact@parascape.org'
      });

      console.log('Welcome email result:', welcomeEmailResult);

      if ('error' in welcomeEmailResult) {
        console.error('Welcome email error:', welcomeEmailResult.error);
      } else {
        console.log('Successfully sent welcome email');
      }
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Continue with admin notification
    }

    // Send notification to admin with better error handling
    try {
      console.log('Attempting to send admin notification...');
      const adminEmailResult = await resend.emails.send({
        from: 'Parascape <onboarding@resend.dev>',
        to: 'contact@parascape.org',
        subject: `New ${formData.type || 'contact'} form submission`,
        html: getAdminNotificationHtml(formData),
        reply_to: formData.email
      });

      console.log('Admin email result:', adminEmailResult);

      if ('error' in adminEmailResult) {
        console.error('Admin notification email error:', adminEmailResult.error);
      } else {
        console.log('Successfully sent admin notification');
      }
    } catch (emailError) {
      console.error('Admin notification email error:', emailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Form submitted successfully and notifications sent'
      }), 
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        success: false,
        details: error instanceof Error ? error.stack : undefined
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