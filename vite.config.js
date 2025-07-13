import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/crypto-brains/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true // Для отладки
  }
});