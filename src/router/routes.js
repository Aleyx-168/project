// src/router/routes.js
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/scan', name: 'scan', component: () => import('pages/ScanPage.vue') },
      { path: '/detail', name: 'detail', component: () => import('pages/DetailPage.vue') },
    ],
  },
]

export default routes
