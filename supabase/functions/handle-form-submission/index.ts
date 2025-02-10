/// <reference types="https://deno.land/x/types/index.d.ts" />

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Initialize Resend with API key from environment variable
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    })
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
}) 