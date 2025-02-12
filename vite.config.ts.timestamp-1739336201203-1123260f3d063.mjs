// vite.config.ts
import { defineConfig } from "file:///workspaces/parascape-master/node_modules/vite/dist/node/index.js";
import react from "file:///workspaces/parascape-master/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import tailwindcss from "file:///workspaces/parascape-master/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///workspaces/parascape-master/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "/workspaces/parascape-master";
var vite_config_default = defineConfig(({ mode }) => ({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@ui": path.resolve(__vite_injected_original_dirname, "./src/components/ui"),
      "@features": path.resolve(__vite_injected_original_dirname, "./src/components/features"),
      "@layouts": path.resolve(__vite_injected_original_dirname, "./src/components/layouts")
    }
  },
  server: {
    port: 5174,
    strictPort: false,
    host: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    assetsDir: "assets",
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production"
      }
    },
    rollupOptions: {
      input: path.resolve(__vite_injected_original_dirname, "index.html"),
      output: {
        chunkFileNames: mode === "production" ? "assets/js/[name]-[hash].js" : "assets/js/[name].js",
        entryFileNames: mode === "production" ? "assets/js/[name]-[hash].js" : "assets/js/[name].js",
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split(".")[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return mode === "production" ? "assets/images/[name]-[hash][extname]" : "assets/images/[name][extname]";
          }
          if (/css/i.test(extType)) {
            return mode === "production" ? "assets/css/[name]-[hash][extname]" : "assets/css/[name][extname]";
          }
          return mode === "production" ? "assets/[name]-[hash][extname]" : "assets/[name][extname]";
        },
        manualChunks: {
          "vendor": ["react", "react-dom", "react-router-dom"],
          "ui": ["framer-motion", "lucide-react"]
        }
      }
    }
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: mode === "production" ? "[hash:base64:8]" : "[name]__[local]"
    },
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
    "import.meta.env.VITE_GA4_MEASUREMENT_ID": JSON.stringify("G-NQLRXMREDQ")
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy9wYXJhc2NhcGUtbWFzdGVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvd29ya3NwYWNlcy9wYXJhc2NhcGUtbWFzdGVyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy93b3Jrc3BhY2VzL3BhcmFzY2FwZS1tYXN0ZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgQ29uZmlnRW52LCB0eXBlIFVzZXJDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAndGFpbHdpbmRjc3MnO1xyXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+ICh7XHJcbiAgYmFzZTogJy8nLFxyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgICAnQHVpJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbXBvbmVudHMvdWknKSxcclxuICAgICAgJ0BmZWF0dXJlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzL2ZlYXR1cmVzJyksXHJcbiAgICAgICdAbGF5b3V0cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzL2xheW91dHMnKSxcclxuICAgIH1cclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogNTE3NCxcclxuICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxyXG4gICAgaG9zdDogdHJ1ZSxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnR0VULCBQT1NULCBQVVQsIERFTEVURSwgT1BUSU9OUycsXHJcbiAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbidcclxuICAgIH1cclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6ICdkaXN0JyxcclxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgIGFzc2V0c0RpcjogJ2Fzc2V0cycsXHJcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nLFxyXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IG1vZGUgPT09ICdwcm9kdWN0aW9uJ1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBpbnB1dDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2luZGV4Lmh0bWwnKSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyBcclxuICAgICAgICAgID8gJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJ1xyXG4gICAgICAgICAgOiAnYXNzZXRzL2pzL1tuYW1lXS5qcycsXHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IG1vZGUgPT09ICdwcm9kdWN0aW9uJ1xyXG4gICAgICAgICAgPyAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnXHJcbiAgICAgICAgICA6ICdhc3NldHMvanMvW25hbWVdLmpzJyxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZXh0VHlwZSA9IGFzc2V0SW5mby5uYW1lLnNwbGl0KCcuJylbMV07XHJcbiAgICAgICAgICBpZiAoL3BuZ3xqcGU/Z3xzdmd8Z2lmfHRpZmZ8Ym1wfGljby9pLnRlc3QoZXh0VHlwZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZGUgPT09ICdwcm9kdWN0aW9uJyBcclxuICAgICAgICAgICAgICA/ICdhc3NldHMvaW1hZ2VzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nXHJcbiAgICAgICAgICAgICAgOiAnYXNzZXRzL2ltYWdlcy9bbmFtZV1bZXh0bmFtZV0nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKC9jc3MvaS50ZXN0KGV4dFR5cGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlID09PSAncHJvZHVjdGlvbidcclxuICAgICAgICAgICAgICA/ICdhc3NldHMvY3NzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nXHJcbiAgICAgICAgICAgICAgOiAnYXNzZXRzL2Nzcy9bbmFtZV1bZXh0bmFtZV0nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG1vZGUgPT09ICdwcm9kdWN0aW9uJ1xyXG4gICAgICAgICAgICA/ICdhc3NldHMvW25hbWVdLVtoYXNoXVtleHRuYW1lXSdcclxuICAgICAgICAgICAgOiAnYXNzZXRzL1tuYW1lXVtleHRuYW1lXSc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgICd2ZW5kb3InOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXHJcbiAgICAgICAgICAndWknOiBbJ2ZyYW1lci1tb3Rpb24nLCAnbHVjaWRlLXJlYWN0J10sXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIG1vZHVsZXM6IHtcclxuICAgICAgbG9jYWxzQ29udmVudGlvbjogJ2NhbWVsQ2FzZScsXHJcbiAgICAgIGdlbmVyYXRlU2NvcGVkTmFtZTogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXHJcbiAgICAgICAgPyAnW2hhc2g6YmFzZTY0OjhdJ1xyXG4gICAgICAgIDogJ1tuYW1lXV9fW2xvY2FsXSdcclxuICAgIH0sXHJcbiAgICBwb3N0Y3NzOiB7XHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICB0YWlsd2luZGNzcyxcclxuICAgICAgICBhdXRvcHJlZml4ZXIsXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9LFxyXG4gIGRlZmluZToge1xyXG4gICAgJ3Byb2Nlc3MuZW52Lk5PREVfRU5WJzogSlNPTi5zdHJpbmdpZnkobW9kZSksXHJcbiAgICAnaW1wb3J0Lm1ldGEuZW52LlZJVEVfR0E0X01FQVNVUkVNRU5UX0lEJzogSlNPTi5zdHJpbmdpZnkoJ0ctTlFMUlhNUkVEUScpXHJcbiAgfVxyXG59KSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1EsU0FBUyxvQkFBcUQ7QUFDcFUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGtCQUFrQjtBQUp6QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBOEI7QUFBQSxFQUNoRSxNQUFNO0FBQUEsRUFDTixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLE9BQU8sS0FBSyxRQUFRLGtDQUFXLHFCQUFxQjtBQUFBLE1BQ3BELGFBQWEsS0FBSyxRQUFRLGtDQUFXLDJCQUEyQjtBQUFBLE1BQ2hFLFlBQVksS0FBSyxRQUFRLGtDQUFXLDBCQUEwQjtBQUFBLElBQ2hFO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsK0JBQStCO0FBQUEsTUFDL0IsZ0NBQWdDO0FBQUEsTUFDaEMsZ0NBQWdDO0FBQUEsSUFDbEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxjQUFjO0FBQUEsSUFDZCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjLFNBQVM7QUFBQSxRQUN2QixlQUFlLFNBQVM7QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLE9BQU8sS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUMzQyxRQUFRO0FBQUEsUUFDTixnQkFBZ0IsU0FBUyxlQUNyQiwrQkFDQTtBQUFBLFFBQ0osZ0JBQWdCLFNBQVMsZUFDckIsK0JBQ0E7QUFBQSxRQUNKLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsZ0JBQU0sVUFBVSxVQUFVLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUMzQyxjQUFJLGtDQUFrQyxLQUFLLE9BQU8sR0FBRztBQUNuRCxtQkFBTyxTQUFTLGVBQ1oseUNBQ0E7QUFBQSxVQUNOO0FBQ0EsY0FBSSxPQUFPLEtBQUssT0FBTyxHQUFHO0FBQ3hCLG1CQUFPLFNBQVMsZUFDWixzQ0FDQTtBQUFBLFVBQ047QUFDQSxpQkFBTyxTQUFTLGVBQ1osa0NBQ0E7QUFBQSxRQUNOO0FBQUEsUUFDQSxjQUFjO0FBQUEsVUFDWixVQUFVLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBLFVBQ25ELE1BQU0sQ0FBQyxpQkFBaUIsY0FBYztBQUFBLFFBQ3hDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxrQkFBa0I7QUFBQSxNQUNsQixvQkFBb0IsU0FBUyxlQUN6QixvQkFDQTtBQUFBLElBQ047QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sd0JBQXdCLEtBQUssVUFBVSxJQUFJO0FBQUEsSUFDM0MsMkNBQTJDLEtBQUssVUFBVSxjQUFjO0FBQUEsRUFDMUU7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
