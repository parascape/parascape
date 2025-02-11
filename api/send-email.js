export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message, type } = req.body;

  try {
    // Send confirmation email to user
    const userEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_RESEND_API_KEY}`
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
        'Authorization': `Bearer ${process.env.VITE_RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Parascape Website <onboarding@resend.dev>',
        to: process.env.VITE_ADMIN_EMAIL,
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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending emails:', error);
    return res.status(500).json({ error: error.message });
  }
} 