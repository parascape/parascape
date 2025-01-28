import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@features': path.resolve(__dirname, './src/components/features'),
      '@layouts': path.resolve(__dirname, './src/components/layouts'),
    }
  },
  server: {
    // CORS configuration
    cors: {
      origin: [
        'http://localhost:5173',
        'http://localhost:3000'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true
    },
    // Only allow specific hosts
    allowedHosts: ['localhost', '*.localhost'],
    // Enable HTTPS for better security
    https: mode === 'development',
    // Add security headers
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer-motion';
            }
            if (id.includes('lucide') || id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            if (id.includes('@vitejs') || id.includes('vite')) {
              return 'vendor-vite';
            }
            return 'vendor';
          }
          if (id.includes('src/components/ui')) {
            return 'ui';
          }
          if (id.includes('src/components/features')) {
            return 'features';
          }
          if (id.includes('src/pages')) {
            const pageName = id.split('src/pages/')[1].split('.')[0].toLowerCase();
            return `page-${pageName}`;
          }
        }
      }
    }
  },
  base: '/',
  // Handle environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    'import.meta.env.VITE_GA4_MEASUREMENT_ID': JSON.stringify(process.env.VITE_GA4_MEASUREMENT_ID)
  }
}));
