import { createClient } from '@supabase/supabase-js';
import type { ContactFormData } from './email';

// Define the form data interface
export interface ContactSubmission {
  name: string;
  email: string;
  business: string;
  phone?: string;
  about: string;
  type: 'contact' | 'audit_request';
}

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
  },
});

// Helper function for direct API access (useful for debugging)
export const directApiAccess = {
  async testConnection() {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/contact_submissions?select=id&limit=1`, {
        method: 'GET',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API connection test failed: ${response.status} ${errorText}`);
      }
      
      return { success: true, status: response.status };
    } catch (error) {
      console.error('API connection test error:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  },
  
  async submitForm(formData: ContactSubmission) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Form submission failed: ${response.status} ${errorText}`);
      }
      
      return { success: true, status: response.status };
    } catch (error) {
      console.error('Form submission error:', error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
};
