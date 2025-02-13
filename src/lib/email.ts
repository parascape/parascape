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
    
    const { data, error } = await supabase.rpc('handle_contact_submission', {
      p_name: formData.name,
      p_email: formData.email,
      p_phone: formData.phone,
      p_message: formData.message,
      p_type: formData.type
    });

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Submission response:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
} 