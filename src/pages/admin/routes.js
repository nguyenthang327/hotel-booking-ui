export default [
  {
    name: 'admin-list-user',
    path: '/list-user',
    meta: {
      isAdmin: true,
      requiresAuth: true
    },
    component: () => import('@/pages/admin/user/ListUser.vue')
  },
  {
    name: 'admin-list-room',
    path: '/list-room',
    meta: {
      isAdmin: true,
      requiresAuth: true
    },
    component: () => import('@/pages/admin/room/ListRoom.vue')
  }
]
