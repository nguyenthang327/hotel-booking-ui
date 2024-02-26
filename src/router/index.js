import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import common from '@/utils/common'

import commonRoutes from '@/pages/common/routes'
import adminRoutes from '@/pages/admin/routes'
import userRoutes from '@/pages/user/routes'

import { me } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    ...commonRoutes,
    ...adminRoutes,
    ...userRoutes
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = common.TOKEN()
  const user = common.USER() || null

  if (!token && to.meta.requiresAuth) {
    next({ name: 'login' })
  } else if (token && to.meta.isGuest) {
    if (user?.role == 'admin') {
      next({ name: 'admin-list-user' })
    } else if (user?.role == 'user') {
      next({ name: 'user-list-room' })
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
