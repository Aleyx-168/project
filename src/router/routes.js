const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // 首页，九宫格按钮
      {
        path: '',
        name: 'index',
        component: () => import('pages/IndexPage.vue'),
      },

      // 扫码页面：接受参数 mode（single/bulk/out）
      {
        path: 'scan/:mode',
        name: 'scan',
        component: () => import('pages/ScanPage.vue'),
        props: true, // ✅ 启用 props 传参（可选）
      },
    ],
  },

  // 404 页面（如果找不到页面）
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
