export const config = {
  baseUrl: '',
<<<<<<< HEAD
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  isProduction: import.meta.env.MODE === 'production',
  isDevelopment: import.meta.env.MODE === 'development',
  api: {
    formSubmission: import.meta.env.VITE_FORM_SUBMISSION_URL || 'https://hjhpcawffvgcczhxcjsr.supabase.co/functions/v1/handle-form-submission'
=======
  isProduction: import.meta.env.MODE === 'production',
  isDevelopment: import.meta.env.MODE === 'development',
  api: {
    formSubmission: import.meta.env.VITE_FORM_SUBMISSION_URL || '/api/contact'
  },
  getAssetPath: (path: string) => {
    return path.startsWith('/') ? path : `/${path}`;
>>>>>>> 58f5cb9a1562e0bacf9a89ba4e7f54bce409b662
  }
} as const; 