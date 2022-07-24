import App from './App.vue'
import FloatingVue from 'floating-vue'
import router from "./router"
import { apolloClientConfig } from "./config/apolloClient.config";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { provideApolloClient } from "@vue/apollo-composable";

const app = createApp(App)
const store = createPinia()

app.use(router)
app.use(store)
app.use(FloatingVue)

provideApolloClient(apolloClientConfig)

app.mount('#app')
