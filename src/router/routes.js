// 定义路由数组
const routes = [
  {
    path: '/',
    name: 'IndexPage',
    component: () => import('src/pages/IndexPage.vue'),
  },
  {
    path: '/scan',
    name: 'ScanPage',
    component: () => import('src/pages/ScanPage.vue'),
  },
  {
    path: '/outrecords',
    name: 'OutRecordsPage',
    component: () => import('src/pages/OutRecordsPage.vue'),
  },
]

export default routes
