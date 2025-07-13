import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/cr/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true // Для отладки
  }
});