interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

export async function sendContactEmails(formData: ContactFormData) {
  try {
    console.log('Sending form data to Supabase function:', formData);
    
    const response = await fetch('https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1OTI2NTcsImV4cCI6MjAyMzE2ODY1N30.vvuPFLgMOHHqBJxJOhHqfDJBEXXEBBSFEBOXPBxGXQE'
      },
      body: JSON.stringify(formData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const text = await response.text();
    console.log('Response text:', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse response as JSON:', e);
      throw new Error('Received invalid response from server');
    }

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send emails');
    }

    console.log('Supabase function response:', data);
    return data;
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
} 