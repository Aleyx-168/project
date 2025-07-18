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
]

export default routes
