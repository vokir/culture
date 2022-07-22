import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    cors: false,
    proxy: {
      "/api": {
        target: 'https://bitrix-stage.culture-home.ru/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
  plugins: [vue()],
})
