import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

/**
 * Creates an HTML email from a template and data
 */
export function createEmailFromTemplate(template, data) {
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
 * Sends contact form submission emails
 */
export async function sendContactFormEmails(formData) {
  try {
    console.log('Sending emails via Resend:', formData);
    
    // Create email content
    const userEmailContent = createEmailFromTemplate(userConfirmationTemplate, {
      name: formData.name,
      type: formData.type,
      message: formData.message
    });

    const adminEmailContent = createEmailFromTemplate(adminNotificationTemplate, formData);

    // Send confirmation email to user
    const userEmailPromise = resend.emails.send({
      from: import.meta.env.VITE_EMAIL_FROM || 'contact@parascape.org',
      to: formData.email,
      subject: 'Thank you for contacting Parascape',
      html: userEmailContent
    });

    // Send notification email to admin
    const adminEmailPromise = resend.emails.send({
      from: import.meta.env.VITE_EMAIL_FROM || 'contact@parascape.org',
      to: import.meta.env.VITE_ADMIN_EMAIL || 'contact@parascape.org',
      subject: `New ${formData.type} Form Submission from ${formData.name}`,
      html: adminEmailContent,
      reply_to: formData.email
    });

    // Send both emails concurrently
    const [userResponse, adminResponse] = await Promise.all([userEmailPromise, adminEmailPromise]);
    console.log('Email responses:', { user: userResponse, admin: adminResponse });

    return { success: true };
  } catch (error) {
    console.error('Error sending contact form emails:', error);
    return {
      success: false,
      error: error.message || 'Failed to send emails'
    };
  }
} 