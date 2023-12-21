import App from './App.vue';
import FloatingVue from 'floating-vue';
import router from './router';
import { createApp } from 'vue';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import pinia from '@/store/index.js';
import setupInterceptors from './services/setupInterceptors';
import { useAuthStore } from '@/store/auth/index.js';

const modules = import.meta.glob('./assets/icons/*.svg');

Object.values(modules).forEach(async (el) => await el());

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(FloatingVue);
app.use(Toast);

const authStore = useAuthStore();
setupInterceptors({
  onError: (error) => {
    if (error.response.status === 401) {
      authStore.logout();
    }
  }
});

app.mount('#app');
