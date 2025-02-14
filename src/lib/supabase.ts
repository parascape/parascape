import { createClient } from '@supabase/supabase-js';
import type { ContactFormData } from './email';

const supabaseUrl = 'https://hpuqzerpfylevdfwembv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTUxMjA4MiwiZXhwIjoyMDU1MDg4MDgyfQ.3U72os4aO9g7rc3Dg4ewMh198J-XZ8j4-iS-UKBkyDo';

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