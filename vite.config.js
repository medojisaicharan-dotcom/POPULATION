import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Determine base path: if deployed to Vercel/Netlify use '/', if GitHub Pages use repo name '/POPULATION/'
const base = process.env.VERCEL || process.env.NETLIFY 
  ? '/' 
  : (process.env.NODE_ENV === 'production' ? '/POPULATION/' : '/');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
  server: {
    port: 5173,
    strictPort: true,
  },
})
