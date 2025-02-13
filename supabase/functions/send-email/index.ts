// @deno-types="npm:@types/node"
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@1.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { getUserEmailTemplate, getAdminEmailTemplate, type EmailData } from "./templates.ts";
import { validateFormData, ValidationError } from "./validation.ts";

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Resend with API key from environment
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
if (!RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set');
}

const resend = new Resend(RESEND_API_KEY);

// Constants for email configuration
const FROM_EMAIL = Deno.env.get('EMAIL_FROM') || 'onboarding@resend.dev';
const EMAIL_TO = Deno.env.get('EMAIL_TO');

if (!EMAIL_TO) {
  throw new Error('EMAIL_TO environment variable is not set');
}

// List of allowed origins
const allowedOrigins = [
  'https://parascape.org',
  'https://www.parascape.org',
  'http://parascape.org',
  'http://www.parascape.org',
  'http://localhost:5173', // Development
  'http://localhost:4173',  // Preview
  'http://localhost:3000'   // Additional development port
];

// Simple in-memory rate limiting (resets every hour)
const rateLimits = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // Maximum requests per hour
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimits.get(ip);

  // Clean up old entries
  if (userLimit && now - userLimit.timestamp > RATE_LIMIT_WINDOW) {
    rateLimits.delete(ip);
    return true;
  }

  if (!userLimit) {
    rateLimits.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

serve(async (req) => {
  // Get the request origin and IP
  const origin = req.headers.get('origin') || '';
  const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  
  // Create CORS headers based on the origin
  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }), 
      { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  try {
    if (!checkRateLimit(clientIP)) {
      throw new ValidationError('Rate limit exceeded. Please try again later.');
    }

    const formData = await req.json();
    validateFormData(formData);

    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        type: formData.type
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to store submission');
    }

    try {
      const [userResponse, adminResponse] = await Promise.all([
        resend.emails.send({
          from: FROM_EMAIL,
          to: [formData.email],
          subject: 'Thank you for contacting Parascape',
          html: getUserEmailTemplate(formData),
          reply_to: EMAIL_TO
        }),
        resend.emails.send({
          from: FROM_EMAIL,
          to: [EMAIL_TO],
          subject: `New message from ${formData.name}`,
          html: getAdminEmailTemplate(formData),
          reply_to: formData.email
        })
      ]);

      await supabase
        .from('contact_submissions')
        .update({ 
          status: 'processed',
          email_sent: true,
          email_sent_at: new Date().toISOString()
        })
        .eq('id', submission.id);

      return new Response(
        JSON.stringify({ success: true, data: { user: userResponse, admin: adminResponse } }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      throw new Error('Failed to send emails');
    }
  } catch (error) {
    console.error('Error processing request:', error);
    
    const isValidationError = error instanceof ValidationError;
    const status = isValidationError ? 400 : 500;
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
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