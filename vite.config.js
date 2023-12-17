import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/api/v1/': {
        target: 'http://62.173.140.40:8080',
        changeOrigin: true
      },
      '/master-system-develop-storage': {
        target: 'https://storage.yandexcloud.net',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue(),
    createSvgSpritePlugin({
      include: '**/icons/**/*.svg',
      symbolId: '[name]'
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/style/_mixins.scss";'
      }
    }
  }
});
