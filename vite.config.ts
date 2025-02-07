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
    // Disable HTTPS for development
    https: false,
    // Enable network access
    host: true,
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
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        // Ensure consistent chunk names
        chunkFileNames: mode === 'production' 
          ? 'assets/[name]-[hash].js'
          : 'assets/[name].js',
        entryFileNames: mode === 'production'
          ? 'assets/[name]-[hash].js'
          : 'assets/[name].js',
        assetFileNames: mode === 'production'
          ? 'assets/[name]-[hash][extname]'
          : 'assets/[name][extname]',
        manualChunks: (id) => {
          // React and related packages should be bundled together
          if (id.includes('node_modules')) {
            if (id.includes('react') || 
                id.includes('react-dom') || 
                id.includes('scheduler') ||
                id.includes('prop-types')) {
              return 'vendor-react';
            }
            // Keep Framer Motion separate as it's a large dependency
            if (id.includes('framer-motion')) {
              return 'vendor-framer-motion';
            }
            // Group UI-related packages together
            if (id.includes('lucide') || 
                id.includes('@radix-ui') || 
                id.includes('@floating-ui') ||
                id.includes('@radix-ui/react')) {
              return 'vendor-ui';
            }
            // Bundle build tools together
            if (id.includes('@vitejs') || 
                id.includes('vite') || 
                id.includes('@swc')) {
              return 'vendor-vite';
            }
            // Split remaining vendors into common and async
            if (id.includes('@supabase') || 
                id.includes('analytics') || 
                id.includes('gtag')) {
              return 'vendor-async';
            }
            return 'vendor-common';
          }
          // Group UI components more granularly
          if (id.includes('src/components/ui')) {
            const component = id.split('src/components/ui/')[1]?.split('.')[0];
            if (component) {
              return `ui-${component}`;
            }
            return 'ui-shared';
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
  base: mode === 'production' ? '/parascape/' : '/',
  // Handle environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    'import.meta.env.VITE_GA4_MEASUREMENT_ID': JSON.stringify(process.env.VITE_GA4_MEASUREMENT_ID)
  }
}));
