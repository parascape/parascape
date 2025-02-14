import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

// Initialize Resend with API key from environment
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
if (!RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set');
}

const resend = new Resend(RESEND_API_KEY);

// Get email configuration from environment variables or use defaults
const FROM_EMAIL = Deno.env.get('EMAIL_FROM') || 'onboarding@resend.dev';
const EMAIL_TO = Deno.env.get('EMAIL_TO') || 'recordsparascape@gmail.com';

// Get Supabase configuration
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://hpuqzerpfylevdfwembv.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set');
}

interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
  status: 'pending' | 'processed' | 'failed';
}

function getUserEmailTemplate(data: ContactSubmission): string {
  return `
    <h1>Thank you for reaching out, ${data.name}!</h1>
    <p>We've received your message and will get back to you as soon as possible.</p>
    <p>Here's a copy of your message:</p>
    <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
      ${data.message}
    </div>
    <p>Best regards,<br>The Parascape Team</p>
  `;
}

function getAdminEmailTemplate(data: ContactSubmission): string {
  return `
    <h1>New ${data.type} Form Submission</h1>
    <h2>Contact Details:</h2>
    <ul>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
      <li><strong>Form Type:</strong> ${data.type}</li>
    </ul>
    <h2>Message:</h2>
    <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
      ${data.message}
    </div>
  `;
}

serve(async (req) => {
  try {
    // Get the submission data from the webhook payload
    const payload = await req.json();
    console.log('Received webhook payload:', payload);

    // The webhook payload contains the new record in payload.record
    const submission: ContactSubmission = payload.record;
    
    if (!submission) {
      throw new Error('No submission data in webhook payload');
    }

    console.log('Processing submission:', submission);

    try {
      // Send emails in parallel
      const [userResponse, adminResponse] = await Promise.all([
        resend.emails.send({
          from: FROM_EMAIL,
          to: [submission.email],
          subject: 'Thank you for contacting Parascape',
          html: getUserEmailTemplate(submission),
          reply_to: EMAIL_TO
        }),
        resend.emails.send({
          from: FROM_EMAIL,
          to: [EMAIL_TO],
          subject: `New message from ${submission.name}`,
          html: getAdminEmailTemplate(submission),
          reply_to: submission.email
        })
      ]);

      console.log('Email responses:', { userResponse, adminResponse });

      // Initialize Supabase client
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

      // Update the submission status
      const { error: updateError } = await supabase
        .from('contact_submissions')
        .update({ 
          status: 'processed',
          email_sent: true,
          email_sent_at: new Date().toISOString()
        })
        .eq('id', submission.id);

      if (updateError) {
        console.error('Error updating submission status:', updateError);
        throw updateError;
      }

      return new Response(
        JSON.stringify({ success: true, data: { userResponse, adminResponse } }),
        { 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (emailError) {
      console.error('Error sending emails:', emailError);

      // Update the submission with the error
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

      await supabase
        .from('contact_submissions')
        .update({ 
          status: 'failed',
          error_message: emailError instanceof Error ? emailError.message : 'Failed to send emails'
        })
        .eq('id', submission.id);

      throw emailError;
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}); 