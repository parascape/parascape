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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send emails');
    }

    const data = await response.json();
    console.log('Netlify function response:', data);

    return data;
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
} 