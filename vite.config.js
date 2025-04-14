import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
      '@images': '/public/images'
    }
  },
  assetsInclude: ['**/*.gif', '**/*.GIF'] // move this OUT of resolve
})
