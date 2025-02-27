import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// Hardcoded API key
const RESEND_API_KEY = 're_LUbgSRFx_D4kWoD9rpsptLJnhoa5zBMEN'

// Default Resend email address
const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev'

console.log('Starting Edge Function with configuration:', {
  RESEND_API_KEY_SET: !!RESEND_API_KEY
})

interface EmailPayload {
  id: string
  name: string
  email: string
  business: string
  type: 'contact' | 'audit_request'
}

serve(async (req) => {
  try {
    // Log request method and URL
    console.log(`Request received: ${req.method} ${req.url}`)
    
    // Log request headers for debugging
    console.log('Request headers:', Object.fromEntries(req.headers.entries()))
    
    // Check if request body exists
    const contentLength = req.headers.get('content-length')
    console.log(`Content length: ${contentLength}`)
    
    if (!contentLength || parseInt(contentLength) === 0) {
      console.error('Empty request body')
      return new Response(
        JSON.stringify({ error: 'Empty request body' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    
    // Parse JSON payload with error handling
    let payload: EmailPayload
    let rawBody: string = ''
    
    try {
      // Get raw body for logging
      rawBody = await req.text()
      console.log('Raw request body:', rawBody)
      
      // Parse the JSON
      payload = JSON.parse(rawBody)
      console.log('Successfully parsed JSON payload:', payload)
    } catch (jsonError) {
      console.error('Failed to parse JSON payload:', jsonError)
      console.error('Raw body was:', rawBody)
      return new Response(
        JSON.stringify({ error: 'Invalid JSON payload', details: jsonError.message, rawBody }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    
    const { name, email, business, type } = payload

    // Log payload for debugging
    console.log('Processing payload:', payload)

    // Validate request
    if (!name || !email || !business || !type) {
      console.error('Missing required fields in payload:', { name, email, business, type })
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          received: { name, email, business, type }
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Sending email to:', email)

    // Send email using Resend
    try {
      console.log('Preparing to call Resend API')
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

      console.log('Resend API response status:', response.status)
      
      // Get raw response for logging
      const responseText = await response.text()
      console.log('Resend API raw response:', responseText)
      
      // Parse the response
      const responseData = JSON.parse(responseText)
      console.log('Resend API parsed response:', responseData)

      if (!response.ok) {
        throw new Error(`Failed to send email: ${responseText}`)
      }

      return new Response(
        JSON.stringify({ message: 'Email sent successfully', data: responseData }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
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
          headers: { 'Content-Type': 'application/json' }
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
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}) 