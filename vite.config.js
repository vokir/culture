import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(env => {
 return {
   base: './',
   server: {
     proxy: {
       '/api/management/graphql': {
         target: 'https://bitrix-stage.culture-home.ru/',
         changeOrigin: true,
       }
     }
   },
   plugins: [vue()],
 }
})
