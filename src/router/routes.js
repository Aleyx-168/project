const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'), // 主布局
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'scan', component: () => import('pages/ScanPage.vue') },
      { path: 'batch-out', component: () => import('pages/BatchOutPage.vue') },
      { path: 'records-in', component: () => import('pages/InRecordsPage.vue') },
      { path: 'records-out', component: () => import('pages/OutRecordsPage.vue') },
    ],
  },

  // 404 错误页面
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
