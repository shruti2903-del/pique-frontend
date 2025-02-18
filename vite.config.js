import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/p/',
  server: {
    historyApiFallback: true, // Ensures the SPA routes are handled correctly
    fs: {
      allow: ['.'], // Fixes possible issues with serving files
    },
  },
})
