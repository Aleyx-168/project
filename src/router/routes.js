// src/router/routes.js

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'), // 主布局
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'), // 首页
      },
      {
        path: '/scan/:mode',
        name: 'scan',
        component: () => import('pages/ScanPage.vue'), // 扫码页面（入库/出库）
      },
    ],
  },

  // 捕捉所有未匹配路径的404页面
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
