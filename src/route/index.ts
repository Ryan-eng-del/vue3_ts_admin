import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import localCache from '@/util/cache'
import { firstMenu } from '@/util/map-router'
import NavSide from '@/components/src/nav-side/nav-side.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    name: 'main',
    path: '/main',
    component: () => import('@/pages/main/main.vue'),
    redirect: '/main/analysis/overview'
  },
  {
    path: '/login',
    component: () => import('@/pages/login/login.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
