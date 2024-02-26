export default [
  {
    name: 'login',
    path: '/login',
    meta: {
      isGuest: true
    },
    component: () => import('@/pages/common/auth/LoginPage.vue')
  },
  {
    name: 'register',
    path: '/register',
    meta: {
      isGuest: true
    },
    component: () => import('@/pages/common/auth/RegisterPage.vue')
  }
]
