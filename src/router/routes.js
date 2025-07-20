const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'), // Quasar 默认布局
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'scan', component: () => import('pages/ScanPage.vue') },
      { path: 'detail', component: () => import('pages/DetailPage.vue') },
    ],
  },

  // 404 页面
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
