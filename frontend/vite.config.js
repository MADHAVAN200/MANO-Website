import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 5173,
  },
  build: {
    assetsDir: 'static',
  },
  plugins: [react()],
})