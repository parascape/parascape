import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export async function sendContactEmails(formData: ContactFormData) {
  try {
    console.log('Sending form data to Resend:', formData);
    
    // Send confirmation email to user
    const userEmailPromise = resend.emails.send({
      from: 'Parascape <onboarding@resend.dev>',
      to: formData.email,
      subject: 'Thank you for contacting Parascape',
      html: `
        <h1>Thank you for reaching out, ${formData.name}!</h1>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          ${formData.message}
        </div>
        <p>Best regards,<br>The Parascape Team</p>
      `
    });

    // Send notification email to admin
    const adminEmailPromise = resend.emails.send({
      from: 'Parascape Website <onboarding@resend.dev>',
      to: import.meta.env.VITE_ADMIN_EMAIL,
      subject: `New ${formData.type} Form Submission from ${formData.name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <h2>Contact Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
          <li><strong>Form Type:</strong> ${formData.type}</li>
        </ul>
        <h2>Message:</h2>
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          ${formData.message}
        </div>
      `
    });

    // Send both emails concurrently
    const [userResponse, adminResponse] = await Promise.all([userEmailPromise, adminEmailPromise]);
    console.log('Email responses:', { user: userResponse, admin: adminResponse });

    return { success: true };
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
} 