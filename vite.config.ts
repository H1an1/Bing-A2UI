import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // 代理 Gemini API 请求
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gemini/, ''),
        secure: true,
        configure: (proxy) => {
          // 使用用户的本地代理
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('🌐 Proxying to Gemini:', req.url);
          });
          proxy.on('error', (err, req, res) => {
            console.log('❌ Proxy error:', err.message);
          });
        }
      },
      // 代理 Google Custom Search API
      '/api/google': {
        target: 'https://www.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/google/, ''),
        secure: true,
      }
    }
  }
})
