export const config = {
  baseUrl: '',
  isProduction: import.meta.env.MODE === 'production',
  isDevelopment: import.meta.env.MODE === 'development',
  api: {
    formSubmission: import.meta.env.VITE_FORM_SUBMISSION_URL || '/api/contact',
  },
  getAssetPath: (path: string) => {
    return path.startsWith('/') ? path : `/${path}`;
  },
} as const;
