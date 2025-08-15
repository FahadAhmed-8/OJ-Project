import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { webcrypto } from "crypto"

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend server URL
        changeOrigin: true,
      }
} } })
