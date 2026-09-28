import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  devtools: true,
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
