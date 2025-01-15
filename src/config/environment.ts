export const config = {
  baseUrl: import.meta.env.MODE === 'production' ? '/parascape' : '',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  isProduction: import.meta.env.MODE === 'production',
  isDevelopment: import.meta.env.MODE === 'development',
}; 