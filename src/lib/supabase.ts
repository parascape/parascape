import { createClient } from '@supabase/supabase-js';
import type { ContactFormData } from './email';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  global: {
    fetch: fetch.bind(globalThis)
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
  
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: formData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (error) {
      console.error('Edge Function error:', error);
      throw error;
    }

    console.log('Edge Function response:', data);
    return data;
  } catch (error) {
    console.error('Failed to invoke Edge Function:', error);
    throw error;
  }
} 