import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          quizData: ['./src/data/quizBank.js']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});
