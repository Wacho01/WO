import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './indexProduct.html'
      }
    }
  },
  server: {
    port: 3001,
    open: '/indexProduct.html'
  },
  optimizeDeps: {
    include: ['three'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  esbuild: {
    target: 'es2022'
  }
});