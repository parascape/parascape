import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

export async function sendContactEmails(formData: ContactFormData) {
  const { name, email, phone, message, type } = formData;

  // Send confirmation email to user
  await resend.emails.send({
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
    `,
  });

  // Send notification email to admin
  await resend.emails.send({
    from: 'Parascape Website <onboarding@resend.dev>',
    to: import.meta.env.VITE_ADMIN_EMAIL,
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
    `,
  });
} 