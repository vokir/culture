import App from './App.vue'
import FloatingVue from 'floating-vue'
import router from "./router"
import {apolloClientConfig} from "./config/apolloClient.config";
import {createApp} from 'vue'
import {provideApolloClient} from "@vue/apollo-composable";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import pinia from "@/store/index.js";

const modules = import.meta.glob('./assets/icons/*.svg');

Object.values(modules).forEach(async (el) => await el());

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(FloatingVue)
app.use(Toast);

provideApolloClient(apolloClientConfig)

app.mount('#app')
