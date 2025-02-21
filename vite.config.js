
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/rbgGame/',
  server: {
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
