/// <reference types="https://deno.land/x/types/index.d.ts" />

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'npm:resend'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FormSubmission {
  name: string
  email: string
  business: string
  phone?: string
  about: string
  honeypot?: string
}

interface EmailTemplate {
  subject: string
  body: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
    const { name, email, business, phone, about, honeypot } = await req.json() as FormSubmission
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown'

    // Spam checks
    if (honeypot) {
      return new Response(
        JSON.stringify({ message: 'Form submitted successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // Check rate limiting
    const { data: isAllowed, error: rateCheckError } = await supabase
      .rpc('check_submission_rate_limit', { submission_ip: clientIp })

    if (rateCheckError || !isAllowed) {
      return new Response(
        JSON.stringify({ error: 'Too many submissions. Please try again later.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
      )
    }

    // Store submission
    const { data: submission, error: submissionError } = await supabase
      .from('form_submissions')
      .insert([
        {
          name,
          email,
          business,
          phone,
          about,
          ip_address: clientIp,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (submissionError) throw submissionError

    // Get welcome email template
    const { data: welcomeTemplate, error: templateError } = await supabase
      .rpc('get_email_template', {
        template_name: 'welcome',
        template_vars: { name, business }
      })
      .single()

    if (templateError) throw templateError

    // Send welcome email
    await resend.emails.send({
      from: 'Parascape <hello@parascape.com>',
      to: email,
      subject: welcomeTemplate.subject,
      html: welcomeTemplate.body
    })

    // Send admin notification
    await resend.emails.send({
      from: 'Parascape Forms <forms@parascape.com>',
      to: 'recordsparascape@gmail.com',
      subject: `New Contact Form: ${business}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Business:</strong> ${business}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
        </ul>
        <h3>Message:</h3>
        <p>${about}</p>
      `
    })

    // Schedule follow-up email (24 hours)
    await fetch('https://api.resend.com/v1/emails/schedule', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Parascape <hello@parascape.com>',
        to: email,
        subject: `Quick Follow-up: Your Digital Journey with ${business}`,
        html: (await supabase
          .rpc('get_email_template', {
            template_name: 'follow_up',
            template_vars: { name, business }
          })
          .single()).data.body,
        send_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      })
    })

    // Schedule value-add email (3 days)
    await fetch('https://api.resend.com/v1/emails/schedule', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Parascape <hello@parascape.com>',
        to: email,
        subject: `Digital Growth Tips for ${business}`,
        html: (await supabase
          .rpc('get_email_template', {
            template_name: 'value_add',
            template_vars: { name, business }
          })
          .single()).data.body,
        send_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      })
    })

    return new Response(
      JSON.stringify({ message: 'Form submitted successfully', data: submission }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
}) 