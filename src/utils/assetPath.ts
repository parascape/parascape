import { config } from '@/config/environment';

export const getAssetPath = (path: string): string => {
  // Remove leading slash if present to prevent double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // In development, serve from root
  if (config.isDevelopment) {
    return `/${cleanPath}`;
  }

  // In production, use the full base URL
  return `${config.baseUrl}/${cleanPath}`;
};
