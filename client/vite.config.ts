import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  root: './src',
  plugins: [react()],
  server: {
    port: 3001,
  },
  build: {
    outDir: '../build',
    rollupOptions: {
      input: './src/index.html',
    }
  }
})
