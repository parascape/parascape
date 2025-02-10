/// <reference types="https://deno.land/x/types/index.d.ts" />

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Initialize Resend with API key
const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

interface FormData {
  name: string
  email: string
  message: string
  type?: 'contact' | 'audit'
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || ''
    )

    const formData: FormData = await req.json()
    
    // Store in Supabase
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          type: formData.type || 'contact'
        }
      ])

    if (dbError) throw dbError

    // Send welcome email
    const { error: emailError } = await resend.emails.send({
      from: 'Parascape <hello@parascape.org>',
      to: formData.email,
      subject: formData.type === 'audit' 
        ? 'Your Digital Audit Request - Parascape'
        : 'Welcome to Parascape',
      html: getWelcomeEmailHtml(formData.name, formData.type || 'contact'),
    })

    if (emailError) throw emailError

    // Send notification to admin
    await resend.emails.send({
      from: 'Parascape <hello@parascape.org>',
      to: 'contact@parascape.com',
      subject: `New ${formData.type || 'contact'} form submission`,
      html: `
        <h2>New form submission</h2>
        <p><strong>Type:</strong> ${formData.type || 'contact'}</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    })

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Form submitted successfully and welcome email sent'
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
    console.error('Error:', errorMessage)
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        success: false 
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