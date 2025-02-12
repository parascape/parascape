interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

export async function sendContactEmails(formData: ContactFormData) {
  try {
    console.log('Sending form data to API:', formData);
    
    const response = await fetch('https://parascape.org/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send emails');
    }

    const result = await response.json();
    console.log('API response:', result);

    return result;
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
} 