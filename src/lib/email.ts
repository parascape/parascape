interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

export async function sendContactEmails(formData: ContactFormData) {
  try {
    console.log('Sending form data to Netlify function:', formData);
    
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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

    console.log('Netlify function response:', data);
    return data;
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
} 