import { supabase } from './supabase';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function sendContactEmails(formData: ContactFormData): Promise<ApiResponse> {
  try {
    console.log('Submitting form data:', formData);
    
    // Submit form data through Cloudflare worker
    const response = await fetch('https://r2.parascape.org/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Worker response error:', error);
      throw new Error(`Failed to submit form: ${response.status} ${response.statusText} - ${error}`);
    }

    const data = await response.json();
    console.log('Submission stored:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
} 