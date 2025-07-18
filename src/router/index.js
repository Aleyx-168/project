// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js' // 注意这里一定是 './routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
