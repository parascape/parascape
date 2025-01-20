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
  type?: 'audit_request' | 'contact'
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
    const { name, email, business, phone, about, honeypot, type } = await req.json() as FormSubmission
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
          status: 'pending',
          type: type || 'contact'
        }
      ])
      .select()
      .single()

    if (submissionError) throw submissionError

    // Get appropriate email template
    const templateName = type === 'audit_request' ? 'audit_welcome' : 'welcome'
    const { data: emailTemplate, error: templateError } = await supabase
      .rpc('get_email_template', {
        template_name: templateName,
        template_vars: { name, business }
      })
      .single()

    let emailSubject = type === 'audit_request' 
      ? `Your Digital Audit Request - Parascape`
      : `Welcome to Parascape - Let's Transform Your Digital Presence`
    
    let emailBody = type === 'audit_request' 
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10B981;">Digital Audit Request Received</h1>
          <p>Thank you for requesting a digital presence audit for ${business}.</p>
          <p>Our team will conduct a thorough analysis of your digital presence and send you a detailed report within 24 hours.</p>
          <p>The audit will include:</p>
          <ul>
            <li>SEO Performance Analysis</li>
            <li>User Experience Review</li>
            <li>Competitor Comparison</li>
          </ul>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10B981;">Welcome to Parascape, ${name}!</h1>
          <p>Thank you for reaching out about ${business}. We're excited to explore how we can help transform your digital presence.</p>
          <p>Our team will review your message and get back to you shortly.</p>
        </div>
      `

    if (!templateError && emailTemplate && emailTemplate.body) {
      emailSubject = emailTemplate.subject
      emailBody = emailTemplate.body
    } else {
      console.log('Using fallback template - database template not found')
    }

    try {
      // Send welcome email
      console.log('Attempting to send welcome email to:', email)
      const welcomeResult = await resend.emails.send({
        from: 'Parascape <hello@parascape.com>',
        to: email,
        subject: emailSubject,
        html: emailBody
      })
      console.log('Welcome email sent successfully:', welcomeResult)
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      console.error('Error details:', {
        to: email,
        subject: emailSubject,
        error: emailError instanceof Error ? emailError.message : 'Unknown error'
      })
      throw new Error(`Email sending failed: ${emailError instanceof Error ? emailError.message : 'Unknown error'}`)
    }

    // Send admin notification with error handling
    try {
      console.log('Attempting to send admin notification')
      const adminResult = await resend.emails.send({
        from: 'Parascape Forms <forms@parascape.com>',
        to: 'recordsparascape@gmail.com',
        subject: type === 'audit_request' 
          ? `New Audit Request: ${business}`
          : `New Contact Form: ${business}`,
        html: `
          <h2>${type === 'audit_request' ? 'New Audit Request' : 'New Contact Form Submission'}</h2>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Business:</strong> ${business}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
            <li><strong>Type:</strong> ${type || 'contact'}</li>
          </ul>
          <h3>Message:</h3>
          <p>${about}</p>
        `
      })
      console.log('Admin notification sent successfully:', adminResult)
    } catch (adminEmailError) {
      console.error('Error sending admin notification:', adminEmailError)
      console.error('Admin notification error details:', adminEmailError instanceof Error ? adminEmailError.message : 'Unknown error')
      // Continue execution - don't throw here as the user submission was successful
    }

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