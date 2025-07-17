const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'scan', component: () => import('pages/ScanPage.vue') },
      { path: 'query', component: () => import('pages/QueryPage.vue') },
    ],
  },
]

export default routes
