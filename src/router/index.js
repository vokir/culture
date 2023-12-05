import {createRouter, createWebHistory} from "vue-router"

const News = () => import('../views/news/news.vue')
const NewsDetail = () => import('../views/news-detail/news-detail.vue')

const routes = [
  {
    path: "/:pathMatch(.*)*",
    redirect: '/master-system/news/'
  },
  {
    path: '/master-system/news/',
    component: News,
    meta: {
      pageTitle: 'Новости',
    }
  },
  {
    path: '/master-system/news/:id',
    name: 'news-detail',
    component: NewsDetail,
    meta: {
      pageTitle: 'Новости',
    }
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
