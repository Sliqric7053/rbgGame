
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/rbgGame/',
  server: {
    host: '0.0.0.0'
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: ['f9feec51-5780-4586-9ffa-fc38d8e73eeb-00-14a1j998184up.picard.replit.dev']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
