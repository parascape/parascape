import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
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
    sourcemap: true,
    assetsDir: 'assets',
    cssCodeSplit: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        // Ensure consistent chunk names
        chunkFileNames: mode === 'production' 
          ? 'assets/js/[name]-[hash].js'
          : 'assets/js/[name].js',
        entryFileNames: mode === 'production'
          ? 'assets/js/[name]-[hash].js'
          : 'assets/js/[name].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return mode === 'production' 
              ? 'assets/images/[name]-[hash][extname]'
              : 'assets/images/[name][extname]';
          }
          if (/css/i.test(extType)) {
            return mode === 'production'
              ? 'assets/css/[name]-[hash][extname]'
              : 'assets/css/[name][extname]';
          }
          return mode === 'production'
            ? 'assets/[name]-[hash][extname]'
            : 'assets/[name][extname]';
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || 
                id.includes('react-dom') || 
                id.includes('scheduler') ||
                id.includes('prop-types')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer-motion';
            }
            if (id.includes('lucide') || 
                id.includes('@radix-ui') || 
                id.includes('@floating-ui') ||
                id.includes('@radix-ui/react')) {
              return 'vendor-ui';
            }
            if (id.includes('@vitejs') || 
                id.includes('vite') || 
                id.includes('@swc')) {
              return 'vendor-vite';
            }
            if (id.includes('@supabase') || 
                id.includes('analytics') || 
                id.includes('gtag')) {
              return 'vendor-async';
            }
            return 'vendor-common';
          }
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
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: mode === 'production'
        ? '[hash:base64:8]'
        : '[name]__[local]'
    },
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ]
    }
  },
  base: '/',
  // Handle environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    'import.meta.env.VITE_GA4_MEASUREMENT_ID': JSON.stringify(process.env.VITE_GA4_MEASUREMENT_ID)
  }
}));
