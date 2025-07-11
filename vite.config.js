import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/crypto-brains/', // Критически важно для GitHub Pages
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true // Для отладки
  }
});