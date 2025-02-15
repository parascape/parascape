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
    console.log('Submitting form data to Supabase:', formData);
    
    // Validate the Supabase client
    if (!supabase) {
      throw new Error('Supabase client is not initialized');
    }

    // Submit directly to Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        type: formData.type,
        status: 'pending'
      }])
      .select();

    if (error) {
      console.error(`Supabase error: ${JSON.stringify(error)}`);
      throw new Error(`Failed to submit form: ${error.message}`);
    }

    console.log('Submission stored in Supabase:', data);
    return { success: true, data };
  } catch (error) {
    console.error(`Error submitting form: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
} 