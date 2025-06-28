import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: true,
  },
  preview: {
    host: true,
    port: 8080,
    allowedHosts: ['sun-walk-production-b3af.up.railway.app']
  }
});
