export default [
  {
    name: 'user-list-room',
    path: '/user-list-room',
    meta: {
      isUser: true,
      requiresAuth: true
    },
    component: () => import('@/pages/user/room/ListRoom.vue')
  }
]
