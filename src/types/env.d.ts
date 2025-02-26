/// <reference types="vite/client" />

interface ImportMetaEnv {
<<<<<<< HEAD
  readonly VITE_API_URL: string
=======
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_RESEND_API_KEY: string;
  readonly VITE_EMAIL_FROM: string;
  readonly VITE_EMAIL_TO: string;
  readonly VITE_ADMIN_EMAIL: string;
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
  // Add other env variables here
}

interface ImportMeta {
<<<<<<< HEAD
  readonly env: ImportMetaEnv
=======
  readonly env: ImportMetaEnv;
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
} 