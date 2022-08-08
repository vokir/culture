import { createRouter, createWebHistory } from "vue-router"

const News = () => import('../views/news/news.vue')
const NewsDetail = () => import('../views/news-detail/news-detail.vue')

const routes = [
  {
    name: 'news',
    path: '/news/',
    component: News,
    meta: {
      pageTitle: 'Новости'
    }
  },
  {
    path: '/news/:id',
    name: 'news-detail',
    component: NewsDetail,
    meta: {
      pageTitle: 'Новости'
    }
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
