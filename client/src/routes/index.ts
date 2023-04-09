import { createRouter, createWebHistory } from 'vue-router'
let routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/view/Game/game.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router