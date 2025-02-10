/// <reference types="https://deno.land/x/types/index.d.ts" />

import { serve } from "std/http/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Initialize Resend with API key from environment variable
const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

// Initialize Supabase client with environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl!, supabaseKey!)

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  type?: 'contact' | 'audit'
}

// Updated CORS headers to allow both production and development
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allow during development, change to https://parascape.org in production
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData: FormData = await req.json()
    console.log('Received form data:', formData)
    
    // Store in Supabase
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          type: formData.type || 'contact'
        }
      ])

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error(`Database error: ${JSON.stringify(dbError)}`)
    }

    console.log('Successfully stored in database')

    // Send welcome email with better error handling
    try {
      const { error: welcomeEmailError } = await resend.emails.send({
        from: 'Parascape <onboarding@resend.dev>',
        to: formData.email,
        subject: formData.type === 'audit' 
          ? 'Your Digital Audit Request - Parascape'
          : 'Welcome to Parascape',
        html: getWelcomeEmailHtml(formData.name, formData.type || 'contact'),
        reply_to: 'contact@parascape.org'
      })

      if (welcomeEmailError) {
        console.error('Welcome email error:', welcomeEmailError)
        // Don't throw, continue with admin notification
      } else {
        console.log('Successfully sent welcome email')
      }
    } catch (emailError) {
      console.error('Welcome email error:', emailError)
      // Continue with admin notification
    }

    // Send notification to admin with better error handling
    try {
      const { error: adminEmailError } = await resend.emails.send({
        from: 'Parascape <onboarding@resend.dev>',
        to: 'contact@parascape.org',
        subject: `New ${formData.type || 'contact'} form submission`,
        html: getAdminNotificationHtml(formData),
        reply_to: formData.email
      })

      if (adminEmailError) {
        console.error('Admin notification email error:', adminEmailError)
        // Don't throw, return success for form submission
      } else {
        console.log('Successfully sent admin notification')
      }
    } catch (emailError) {
      console.error('Admin notification email error:', emailError)
      // Continue with success response
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
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Form submission error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        success: false,
        details: error instanceof Error ? error.stack : undefined
      }), 
      {
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    )
  }
}) 