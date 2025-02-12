interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

interface ApiResponse {
  success: boolean;
  error?: string;
}

export async function sendContactEmails(formData: ContactFormData): Promise<ApiResponse> {
  try {
    console.log('Sending form data to API:', formData);
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json() as ApiResponse;

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send emails');
    }

    console.log('API response:', result);
    return result;
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error instanceof Error 
      ? error 
      : new Error('An unexpected error occurred');
  }
} 