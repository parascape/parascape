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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not set')
    }
    
    const resend = new Resend(resendApiKey)
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

    let emailSubject = `Welcome to Parascape - Let's Transform Your Digital Presence`
    let emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10B981;">Welcome to Parascape, ${name}!</h1>
        <p>Thank you for reaching out about ${business}. We're excited to explore how we can help transform your digital presence.</p>
        <p>Our team will review your message and get back to you shortly.</p>
      </div>
    `

    if (!templateError && welcomeTemplate && welcomeTemplate.body) {
      emailSubject = welcomeTemplate.subject
      emailBody = welcomeTemplate.body
    } else {
      console.log('Using fallback template - database template not found')
    }

    try {
      // Send welcome email
      await resend.emails.send({
        from: 'Parascape <onboarding@resend.dev>',
        to: email,
        subject: emailSubject,
        html: emailBody
      })
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      throw new Error(`Email sending failed: ${emailError instanceof Error ? emailError.message : 'Unknown error'}`)
    }

    // Send admin notification with error handling
    try {
      await resend.emails.send({
        from: 'Parascape Forms <onboarding@resend.dev>',
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
    } catch (adminEmailError) {
      console.error('Error sending admin notification:', adminEmailError)
      // Continue execution - don't throw here as the user submission was successful
    }

    // Schedule follow-up email (24 hours)
    await fetch('https://api.resend.com/v1/emails/schedule', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Parascape <onboarding@resend.dev>',
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
        from: 'Parascape <onboarding@resend.dev>',
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
    console.error('Error processing form submission:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process form submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
}) 