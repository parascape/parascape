import { createClient } from '@supabase/supabase-js';
<<<<<<< HEAD
=======
import type { ContactFormData } from './email';
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

<<<<<<< HEAD
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 
=======
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public'
  },
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    }
  }
}); 
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
