export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Add your Supabase tables here if needed
    };
    Views: {
      // Add your Supabase views here if needed
    };
    Functions: {
      // Add your Supabase functions here if needed
    };
    Enums: {
      // Add your Supabase enums here if needed
    };
  };
}

export type EmailResponse = {
  success: boolean;
  data?: {
    user: {
      id: string;
      from: string;
      to: string;
      created_at: string;
    };
    admin: {
      id: string;
      from: string;
      to: string;
      created_at: string;
    };
  };
  error?: string;
}; 