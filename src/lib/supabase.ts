import { createClient } from '@supabase/supabase-js';
import type { ContactFormData } from './email';

const supabaseUrl = 'https://hpuqzerpfylevdfwembv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NTM5NzgsImV4cCI6MjAyNTQyOTk3OH0.7z1LBl-9EbHnXEF9Kc8ljrF6c3EhKNj_lBCqk-YNSMs';

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
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  }
}); 