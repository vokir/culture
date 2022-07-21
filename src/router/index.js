import { createRouter, createWebHistory } from "vue-router"

const News = () => import('../views/news/news.vue')

const routes = [
  {
    name: 'Новости',
    path: "/news",
    component: News,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
