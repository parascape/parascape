export const config = {
  baseUrl: '',
  apiUrl: 'https://hpuqzerpfylevdfwembv.supabase.co',
  isProduction: import.meta.env.MODE === 'production',
  isDevelopment: import.meta.env.MODE === 'development',
  api: {
    formSubmission: import.meta.env.MODE === 'production'
      ? 'https://hpuqzerpfylevdfwembv.functions.supabase.co/handle-form-submission'
      : 'http://localhost:54321/functions/v1/handle-form-submission'
  },
  supabase: {
    url: 'https://hpuqzerpfylevdfwembv.supabase.co',
    anonKey: import.meta.env.MODE === 'production'
      ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NzI5NjAsImV4cCI6MjAyNjQ0ODk2MH0.Ij9XFqQFEFVGGfOEGQRbYxZGmxn_Wd_zVH_HsHrYaYo'
      : 'your-dev-anon-key'
  },
  getAssetPath: (path: string) => {
    return path.startsWith('/') ? path : `/${path}`;
  }
} as const; 