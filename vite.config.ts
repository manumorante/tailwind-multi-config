import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: command === 'build' ? '/tailwind-multi-config/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        'theme-a': './src/theme-a.css',
        'theme-b': './src/theme-b.css'
      }
    }
  }
}))
