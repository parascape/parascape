import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Helper function to invoke Edge Functions
export async function invokeSendEmail(formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}) {
  const { data, error } = await supabase.functions.invoke('send-email', {
    body: formData
  });

  if (error) throw error;
  return data;
} 