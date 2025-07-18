import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js' // 注意是 './routes.js'，不是 './router.js'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
