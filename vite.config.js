import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https://raw.githubusercontent.com; media-src https://raw.githubusercontent.com; connect-src 'self' https://pokeapi.co; font-src 'self'";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: { 'Content-Security-Policy': csp },
  },
  preview: {
    headers: { 'Content-Security-Policy': csp },
  },
})
