/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_RESEND_API_KEY: string;
  readonly VITE_EMAIL_FROM: string;
  readonly VITE_ADMIN_EMAIL: string;
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 