import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig(env => {
 return {
   base: './',
   server: {
     proxy: {
       '/api/management/': {
         target: 'https://bitrix-stage.culture-home.ru/',
         changeOrigin: true,
       },
       '/upload': {
         target: 'https://bitrix-stage.culture-home.ru/',
         changeOrigin: true,
       },
     }
   },
   resolve: {
     alias: {
       '@': path.resolve(__dirname, 'src'),
     }
   },
   plugins: [vue()],
 }
})
