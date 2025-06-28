import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production'
    ? '/' // Railway автоматически добавит домен, поэтому не пиши абсолютный URL
    : '/',
  server: {
    port: 3000,
  },
})
