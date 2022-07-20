import { createRouter, createWebHistory } from "vue-router"

const Complex = () => import('../views/complex/complex.vue')

const routes = [
  {
    path: "/",
    component: Complex
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
