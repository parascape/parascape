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
    console.log('Sending form data to Edge Function:', formData);
    
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: formData
    });

    if (error) {
      console.error('Edge Function error:', error);
      throw error;
    }

    console.log('Edge Function response:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
} 