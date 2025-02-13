interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

interface ResendResponse {
  id: string;
  from: string;
  to: string[];
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  data?: ResendResponse;
  error?: string;
}

export async function sendContactEmails(formData: ContactFormData): Promise<ApiResponse> {
  try {
    console.log('Sending form data to Resend API:', formData);
    
    const [userResponse, adminResponse] = await Promise.all([
      // Send confirmation to user
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Parascape <onboarding@resend.dev>',
          to: ['recordsparascape@gmail.com'], // For testing, send all emails to verified address
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
        })
      }).then(res => res.json()),

      // Send notification to admin
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Parascape <onboarding@resend.dev>',
          to: ['recordsparascape@gmail.com'],
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
        })
      }).then(res => res.json())
    ]);

    console.log('Email responses:', { user: userResponse, admin: adminResponse });

    if (userResponse.error || adminResponse.error) {
      throw new Error(userResponse.error || adminResponse.error);
    }

    return { success: true, data: userResponse };
  } catch (error) {
    console.error('Error sending emails:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
} 