import { createClient } from '@supabase/supabase-js';
import type { ContactFormData } from './email';

const supabaseUrl = 'https://api.parascape.org';
const supabaseAnonKey = 'secret6secret6secret6secret6secret6secret6';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

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
      'Content-Type': 'application/json'
    }
  }
}); 