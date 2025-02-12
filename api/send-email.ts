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
    const { name, email, phone, message, type } = formData;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send confirmation email to user
    const userEmailPromise = resend.emails.send({
      from: 'Parascape <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for contacting Parascape',
      html: `
        <h1>Thank you for reaching out, ${name}!</h1>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          ${message}
        </div>
        <p>Best regards,<br>The Parascape Team</p>
      `
    });

    // Send notification email to admin
    const adminEmailPromise = resend.emails.send({
      from: 'Parascape Website <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `New ${type} Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <h2>Contact Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Form Type:</strong> ${type}</li>
        </ul>
        <h2>Message:</h2>
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          ${message}
        </div>
      `
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