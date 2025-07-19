const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'IndexPage', component: () => import('pages/IndexPage.vue') },
      { path: 'scan', name: 'ScanPage', component: () => import('pages/ScanPage.vue') },
      {
        path: 'in-detail',
        name: 'InDetailPage',
        component: () => import('pages/InDetailPage.vue'),
      },
      {
        path: 'out-detail',
        name: 'OutDetailPage',
        component: () => import('pages/OutDetailPage.vue'),
      },
    ],
  },
]

export default routes
