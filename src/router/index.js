import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/event-detail/:id',
    name: 'EventDetail',
    component: () => import("../views/EventDetail.vue"),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
