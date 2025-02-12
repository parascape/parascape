import { sendContactFormEmails, type ContactFormData } from './resend';

interface ApiResponse {
  success: boolean;
  error?: string;
}

export async function sendContactEmails(formData: ContactFormData): Promise<ApiResponse> {
  try {
    console.log('Sending form data:', formData);
    
    const result = await sendContactFormEmails(formData);
    
    console.log('API response:', result);
    return result;
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error instanceof Error 
      ? error 
      : new Error('An unexpected error occurred');
  }
} 