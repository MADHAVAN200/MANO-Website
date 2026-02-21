import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  build: {
    assetsDir: 'static',
  },
  plugins: [react()],
})