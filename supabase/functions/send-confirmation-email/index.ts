import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = 're_LUbgSRFx_D4kWoD9rpsptLJnhoa5zBMEN'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? ''

// Default Resend email address
const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev'

console.log('Starting Edge Function with configuration:', {
  RESEND_API_KEY_SET: !!RESEND_API_KEY,
  SUPABASE_URL_SET: !!SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY_SET: !!SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_ANON_KEY_SET: !!SUPABASE_ANON_KEY
})

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

interface EmailPayload {
  id: string
  name: string
  email: string
  business: string
  type: 'contact' | 'audit_request'
}

serve(async (req) => {
  try {
    // Verify authorization
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization' }),
        { status: 401 }
      )
    }

    // Log request details for debugging
    console.log('Processing request with token:', token)

    const payload: EmailPayload = await req.json()
    const { id, name, email, business, type } = payload

    // Log payload for debugging
    console.log('Processing payload:', payload)

    // Validate request
    if (!id || !name || !email || !business || !type) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          received: { id, name, email, business, type }
        }),
        { status: 400 }
      )
    }

    if (!RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable')
      return new Response(
        JSON.stringify({ 
          error: 'Configuration error',
          message: 'Missing RESEND_API_KEY environment variable'
        }),
        { status: 500 }
      )
    }

    console.log('Sending email to:', email)

    // Send email using Resend
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

    const responseData = await response.json()
    console.log('Resend API response:', responseData)

    if (!response.ok) {
      throw new Error(`Failed to send email: ${JSON.stringify(responseData)}`)
    }

    // Update submission status in database
    const { error: updateError } = await supabase
      .from('contact_submissions')
      .update({ 
        email_sent: true,
        status: 'processed'
      })
      .eq('id', id)

    if (updateError) {
      console.error('Failed to update submission status:', updateError)
    }

    return new Response(
      JSON.stringify({ message: 'Email sent successfully', data: responseData }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500 }
    )
  }
}) 