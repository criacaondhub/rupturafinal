import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/webhook-clint': {
        target: 'https://functions-api.clint.digital',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webhook-clint/, '/endpoints/integration/webhook/01af33f0-0fdf-4cfd-80d3-0925804377e6'),
      },
      '/api/webhook-n8n': {
        target: 'https://n8nw.novadimensaohub.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webhook-n8n/, '/webhook/marcelo-clint'),
      },
    },
  },
})
