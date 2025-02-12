import { Resend } from 'resend';
import type { Buffer } from 'node:buffer';

// Initialize Resend with your API key
// Using import.meta.env for Vite environment variables
const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

// Types for email data
interface EmailData {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: {
    filename: string;
    content: Buffer;
  }[];
}

// Types for contact form data
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

// Types for email template data
interface TemplateData {
  [key: string]: any;
}

/**
 * Sends an email using Resend
 * @param emailData The email data including recipient, subject, and content
 * @returns Promise with the send result
 */
export async function sendEmail(emailData: EmailData) {
  try {
    const { to, subject, html, text, from, replyTo, cc, bcc, attachments } = emailData;
    
    const response = await resend.emails.send({
      from: from || import.meta.env.VITE_EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      html,
      text,
      reply_to: replyTo,
      cc,
      bcc,
      attachments
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email' 
    };
  }
}

/**
 * Creates an HTML email from a template and data
 * @param template The HTML template string with placeholders
 * @param data The data to inject into the template
 * @returns Compiled HTML string
 */
export function createEmailFromTemplate(template: string, data: TemplateData): string {
  return template.replace(/\${(\w+)}/g, (_, key) => data[key] || '');
}

// User confirmation email template
export const userConfirmationTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Thank you for contacting Parascape</title>
  </head>
  <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; color: #1f2937;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #059669; margin-bottom: 24px;">Thank you for reaching out, \${name}!</h1>
      <p style="margin-bottom: 16px; line-height: 1.5;">We've received your \${type} request and will get back to you as soon as possible.</p>
      <p style="margin-bottom: 8px; line-height: 1.5;">Here's a copy of your message:</p>
      <div style="background-color: #f3f4f6; padding: 16px; margin: 16px 0; border-radius: 6px; line-height: 1.5;">
        \${message}
      </div>
      <p style="margin-top: 24px; line-height: 1.5;">
        Best regards,<br>
        <strong>The Parascape Team</strong>
      </p>
    </div>
  </body>
</html>
`;

// Admin notification email template
export const adminNotificationTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Form Submission</title>
  </head>
  <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; color: #1f2937;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #059669; margin-bottom: 24px;">New \${type} Form Submission</h1>
      <h2 style="color: #374151; margin-bottom: 16px;">Contact Details:</h2>
      <ul style="list-style: none; padding: 0; margin: 0 0 24px 0;">
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Name:</strong> \${name}</li>
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Email:</strong> \${email}</li>
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Phone:</strong> \${phone}</li>
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Form Type:</strong> \${type}</li>
      </ul>
      <h2 style="color: #374151; margin-bottom: 16px;">Message:</h2>
      <div style="background-color: #f3f4f6; padding: 16px; margin: 16px 0; border-radius: 6px; line-height: 1.5;">
        \${message}
      </div>
    </div>
  </body>
</html>
`;

/**
 * Sends contact form submission emails (user confirmation and admin notification)
 * @param formData The contact form data
 * @returns Promise with the send result
 */
export async function sendContactFormEmails(formData: ContactFormData) {
  try {
    // Send confirmation email to user
    const userEmailContent = createEmailFromTemplate(userConfirmationTemplate, {
      name: formData.name,
      type: formData.type,
      message: formData.message
    });

    const userEmailPromise = sendEmail({
      to: formData.email,
      subject: 'Thank you for contacting Parascape',
      html: userEmailContent
    });

    // Send notification email to admin
    const adminEmailContent = createEmailFromTemplate(adminNotificationTemplate, formData);

    const adminEmailPromise = sendEmail({
      to: import.meta.env.VITE_ADMIN_EMAIL,
      subject: `New ${formData.type} Form Submission from ${formData.name}`,
      html: adminEmailContent,
      replyTo: formData.email
    });

    // Send both emails concurrently
    const [userResponse, adminResponse] = await Promise.all([userEmailPromise, adminEmailPromise]);

    return {
      success: userResponse.success && adminResponse.success,
      error: userResponse.error || adminResponse.error
    };
  } catch (error) {
    console.error('Error sending contact form emails:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send emails'
    };
  }
}

// Example email template
export const defaultEmailTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${'subject'}</title>
  </head>
  <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; color: #1f2937;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #059669; margin-bottom: 24px;">${'title'}</h1>
      <div style="margin-bottom: 24px; line-height: 1.5;">
        ${'content'}
      </div>
      <p style="margin-top: 24px; line-height: 1.5;">
        Best regards,<br>
        <strong>${'signature'}</strong>
      </p>
    </div>
  </body>
</html>
`;

// Example usage:
/*
const emailContent = createEmailFromTemplate(defaultEmailTemplate, {
  subject: 'Welcome to Our Service',
  title: 'Welcome aboard!',
  content: 'Thank you for joining us. We're excited to have you!',
  signature: 'The Team'
});

await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome to Our Service',
  html: emailContent
});
*/ 