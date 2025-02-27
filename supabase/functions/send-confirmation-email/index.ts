import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// Hardcoded API key
const RESEND_API_KEY = 're_LUbgSRFx_D4kWoD9rpsptLJnhoa5zBMEN'

// Default Resend email address - using Resend's default
const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev'

// CORS headers to allow requests from any origin
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

console.log('Starting Edge Function with Resend default configuration')

interface EmailPayload {
  id: string
  name: string
  email: string
  business: string
  type: 'contact' | 'audit_request'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Simple logging
    console.log('Request received')
    
    // Parse JSON payload with error handling
    let payload: EmailPayload
    try {
      payload = await req.json()
      console.log('Payload received:', payload)
    } catch (jsonError) {
      console.error('Failed to parse JSON payload:', jsonError)
      return new Response(
        JSON.stringify({ error: 'Invalid JSON payload' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    
    const { name, email, business, type } = payload

    // Validate request
    if (!name || !email || !business || !type) {
      console.error('Missing required fields in payload')
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Sending email to:', email)

    // Send email using Resend with default configuration
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: DEFAULT_FROM_EMAIL,
          to: email,
          subject: type === 'audit_request' 
            ? 'Your Digital Audit Request Received - Parascape' 
            : 'Thank You for Contacting Parascape',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #10B981;">Thank you, ${name}!</h1>
              <p>We've received your ${type === 'audit_request' ? 'digital audit request' : 'message'}.</p>
              ${type === 'audit_request' 
                ? `<p>We'll analyze your digital presence and send you a comprehensive audit within 24 hours.</p>` 
                : `<p>We'll review your message and get back to you shortly.</p>`
              }
              <p>Here's what we received:</p>
              <ul>
                <li>Business: ${business}</li>
                <li>Type: ${type === 'audit_request' ? 'Digital Audit Request' : 'General Contact'}</li>
              </ul>
              <p>Best regards,<br>The Parascape Team</p>
            </div>
          `
        })
      })

      const responseText = await response.text()
      console.log('Resend API raw response:', responseText)
      
      let responseData
      try {
        responseData = JSON.parse(responseText)
        console.log('Resend API parsed response:', responseData)
      } catch (e) {
        console.error('Failed to parse Resend response:', e)
        responseData = { text: responseText }
      }

      if (!response.ok) {
        throw new Error(`Failed to send email: ${responseText}`)
      }

      return new Response(
        JSON.stringify({ message: 'Email sent successfully', data: responseData }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    } catch (fetchError) {
      console.error('Error sending email via Resend API:', fetchError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send email via Resend API', 
          details: fetchError.message 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
  } catch (error) {
    console.error('Unhandled error in Edge Function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message || 'Unknown error'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
}) 