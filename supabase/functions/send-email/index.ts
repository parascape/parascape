import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'npm:resend@3.1.0';
import { getUserEmailTemplate, getAdminEmailTemplate, type EmailData } from './templates.ts';
import { validateFormData, ValidationError } from './validation.ts';

// Initialize Resend with API key from environment
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

// List of allowed origins
const allowedOrigins = [
  'https://parascape.org',
  'https://www.parascape.org',
  'http://parascape.org',
  'http://www.parascape.org',
  'http://localhost:5173', // Development
  'http://localhost:4173'  // Preview
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
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
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
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      throw new ValidationError('Rate limit exceeded. Please try again later.');
    }

    // Parse and validate request body
    const formData = await req.json();
    console.log('Received form data:', formData);

    // Validate form data
    validateFormData(formData);

    // Send both emails concurrently
    const [userResponse, adminResponse] = await Promise.all([
      // Send confirmation to user
      resend.emails.send({
        from: 'Parascape <onboarding@resend.dev>',
        to: [formData.email], // Use the email from the form submission
        subject: 'Thank you for contacting Parascape',
        html: getUserEmailTemplate(formData),
        reply_to: 'recordsparascape@gmail.com'
      }),
      // Send notification to admin
      resend.emails.send({
        from: 'Parascape Website <onboarding@resend.dev>',
        to: ['recordsparascape@gmail.com'], // Use the admin email
        subject: `New ${formData.type} Form Submission from ${formData.name}`,
        html: getAdminEmailTemplate(formData),
        reply_to: formData.email
      })
    ]);

    console.log('Emails sent successfully:', { user: userResponse, admin: adminResponse });

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
    
    const isValidationError = error instanceof ValidationError;
    const status = isValidationError ? 400 : 500;
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    
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