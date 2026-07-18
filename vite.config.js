import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base must match the GitHub Pages repo path so asset URLs resolve.
export default defineConfig({
  base: '/happy-anniversary/',
  plugins: [react()],
})
