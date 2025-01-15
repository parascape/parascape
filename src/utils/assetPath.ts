import { config } from '@/config/environment';

export const getAssetPath = (path: string): string => {
  return config.isProduction ? `/parascape${path}` : path;
}; 