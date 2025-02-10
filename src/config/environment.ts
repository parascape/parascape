export const config = {
  baseUrl: '',  // Empty string since we're using a custom domain
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  isProduction: import.meta.env.MODE === 'production',
  isDevelopment: import.meta.env.MODE === 'development',
  api: {
    formSubmission: import.meta.env.VITE_FORM_SUBMISSION_URL || 'https://hjhpcawffvgcczhxcjsr.supabase.co/functions/v1/handle-form-submission'
  },
  getAssetPath: (path: string) => {
    return path.startsWith('/') ? path : `/${path}`;
  }
} as const; 