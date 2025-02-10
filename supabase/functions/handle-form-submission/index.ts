/// <reference types="https://deno.land/x/types/index.d.ts" />

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

interface FormData {
  name: string
  email: string
  message: string
  type?: 'contact' | 'audit'
}

interface RequestEvent {
  request: Request
  env: {
    RESEND_API_KEY: string
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export default async function handler(event: RequestEvent) {
  const { request, env } = event

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    })
  }

  try {
    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_ANON_KEY
    )

    const resend = new Resend(env.RESEND_API_KEY)
    const formData: FormData = await request.json()
    
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
      subject: 'Welcome to Parascape',
      html: `
        <h1>Welcome to Parascape, ${formData.name}!</h1>
        <p>Thank you for reaching out to us. We've received your message and will get back to you shortly.</p>
        <p>Here's what we received:</p>
        <blockquote>${formData.message}</blockquote>
        <p>Best regards,<br>The Parascape Team</p>
      `,
    })

    if (emailError) throw emailError

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
} 