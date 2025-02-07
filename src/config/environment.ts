export const config = {
  baseUrl: import.meta.env.MODE === 'production' ? '/parascape' : '',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  isProduction: import.meta.env.MODE === 'production',
  isDevelopment: import.meta.env.MODE === 'development',
  api: {
    formSubmission: import.meta.env.VITE_FORM_SUBMISSION_URL || 'https://hjhpcawffvgcczhxcjsr.supabase.co/functions/v1/handle-form-submission'
  },
  getAssetPath: (path: string) => {
    const base = import.meta.env.MODE === 'production' ? '/parascape' : '';
    return `${base}${path.startsWith('/') ? path : `/${path}`}`;
  }
} as const; 