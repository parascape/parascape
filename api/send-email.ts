import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

export const config = {
  runtime: 'edge'
};

const userEmailTemplate = (name: string, message: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Thank you for contacting Parascape</title>
  </head>
  <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; color: #1f2937;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #059669; margin-bottom: 24px;">Thank you for reaching out, ${name}!</h1>
      <p style="margin-bottom: 16px; line-height: 1.5;">We've received your message and will get back to you as soon as possible.</p>
      <p style="margin-bottom: 8px; line-height: 1.5;">Here's a copy of your message:</p>
      <div style="background-color: #f3f4f6; padding: 16px; margin: 16px 0; border-radius: 6px; line-height: 1.5;">
        ${message}
      </div>
      <p style="margin-top: 24px; line-height: 1.5;">
        Best regards,<br>
        <strong>The Parascape Team</strong>
      </p>
    </div>
  </body>
</html>
`;

const adminEmailTemplate = (formData: ContactFormData) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Form Submission</title>
  </head>
  <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; color: #1f2937;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #059669; margin-bottom: 24px;">New Contact Form Submission</h1>
      <h2 style="color: #374151; margin-bottom: 16px;">Contact Details:</h2>
      <ul style="list-style: none; padding: 0; margin: 0 0 24px 0;">
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Name:</strong> ${formData.name}</li>
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Email:</strong> ${formData.email}</li>
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Phone:</strong> ${formData.phone}</li>
        <li style="margin-bottom: 8px; line-height: 1.5;"><strong>Form Type:</strong> ${formData.type}</li>
      </ul>
      <h2 style="color: #374151; margin-bottom: 16px;">Message:</h2>
      <div style="background-color: #f3f4f6; padding: 16px; margin: 16px 0; border-radius: 6px; line-height: 1.5;">
        ${formData.message}
      </div>
    </div>
  </body>
</html>
`;

export default async function handler(req: Request) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://www.parascape.org',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  try {
    const formData: ContactFormData = await req.json();
    const { name, email, message } = formData;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send confirmation email to user
    const userEmailPromise = resend.emails.send({
      from: 'Parascape <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for contacting Parascape',
      html: userEmailTemplate(name, message)
    });

    // Send notification email to admin
    const adminEmailPromise = resend.emails.send({
      from: 'Parascape Website <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `New ${formData.type} Form Submission from ${name}`,
      html: adminEmailTemplate(formData)
    });

    // Send both emails concurrently
    const [userResponse, adminResponse] = await Promise.all([userEmailPromise, adminEmailPromise]);
    console.log('Email responses:', { user: userResponse, admin: adminResponse });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://www.parascape.org',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to send emails' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://www.parascape.org',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  }
} 