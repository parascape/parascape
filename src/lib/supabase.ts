import { createClient } from '@supabase/supabase-js';
import type { ContactFormData } from './email';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  },
  global: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
    }
  }
});

export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
}

// Helper function to invoke Edge Functions
export async function invokeSendEmail(formData: ContactFormData) {
  console.log('Invoking send-email Edge Function with data:', formData);
  
  const { data, error } = await supabase.functions.invoke<ContactFormData>('send-email', {
    body: formData,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    }
  });

  if (error) {
    console.error('Edge Function error:', error);
    throw error;
  }

  console.log('Edge Function response:', data);
  return data;
} 