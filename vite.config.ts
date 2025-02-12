import { defineConfig, type ConfigEnv, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => ({
  base: mode === 'production' ? '/' : '/',
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
    port: 5174,
    strictPort: false,
    host: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production'
      }
    },
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
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
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['framer-motion', 'lucide-react'],
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
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    'import.meta.env.VITE_GA4_MEASUREMENT_ID': JSON.stringify('G-NQLRXMREDQ')
  }
}));
