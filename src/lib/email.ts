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
    // Validate form data
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim() || !formData.message?.trim()) {
      throw new Error('All fields are required');
    }

    if (!formData.type || !['contact', 'audit'].includes(formData.type)) {
      throw new Error('Invalid submission type');
    }

    // Format phone number (remove non-digits)
    const formattedPhone = formData.phone.replace(/\D/g, '');
    if (formattedPhone.length < 10) {
      throw new Error('Please enter a valid phone number in the format (XXX) XXX-XXXX');
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Invalid email format');
    }

    console.log('Submitting form data to Supabase:', {
      ...formData,
      phone: formattedPhone
    });
    
    // Validate the Supabase client
    if (!supabase) {
      throw new Error('Supabase client is not initialized');
    }

    // Submit directly to Supabase with properly formatted data
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formattedPhone,
        message: formData.message.trim(),
        type: formData.type,
        status: 'pending',
        email_sent: false
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