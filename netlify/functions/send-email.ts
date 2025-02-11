import { Handler } from '@netlify/functions';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const formData: ContactFormData = JSON.parse(event.body || '{}');
    const { name, email, phone, message, type } = formData;

    // Send confirmation email to user
    const userEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
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
      })
    });

    if (!userEmailResponse.ok) {
      const errorData = await userEmailResponse.json();
      throw new Error(`Failed to send user email: ${JSON.stringify(errorData)}`);
    }

    // Send notification email to admin
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Parascape Website <onboarding@resend.dev>',
        to: 'contact@parascape.org',
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
      })
    });

    if (!adminEmailResponse.ok) {
      const errorData = await adminEmailResponse.json();
      throw new Error(`Failed to send admin email: ${JSON.stringify(errorData)}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error sending emails:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to send emails' })
    };
  }
};

export { handler }; 