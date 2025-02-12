import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New ${data.type} Form Submission from ${data.name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
      reply_to: data.email
    });

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
} 