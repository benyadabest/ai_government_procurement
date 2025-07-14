import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ai_government_procurement/',
  define: {
    // Remove OpenAI API key in production builds for security
    'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(undefined)
  }
}) 