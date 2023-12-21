const News = () => import('@/views/news/news.vue');
const NewsDetail = () => import('@/views/news-detail/news-detail.vue');
const Complexes = () => import('@/views/complexes/complexes.vue');
const ComplexesDetail = () => import('@/views/complexes-detail/complexes-detail.vue');

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/master-system/news/'
  },
  {
    path: '/master-system/news/',
    component: News,
    meta: {
      pageTitle: 'Новости'
    }
  },
  {
    path: '/master-system/news/:id',
    name: 'news-detail',
    component: NewsDetail,
    meta: {
      pageTitle: 'Новости'
    }
  },
  {
    path: '/master-system/complexes',
    name: 'complexes',
    component: Complexes,
    meta: {
      pageTitle: 'Жилые комплексы'
    }
  },
  {
    path: '/master-system/complexes/:id',
    name: 'complexes-detail',
    component: ComplexesDetail,
    meta: {
      pageTitle: 'Жилые комплексы'
    }
  }
];

export default routes;
