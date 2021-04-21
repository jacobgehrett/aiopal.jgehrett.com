import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Horizon from '../views/Horizon.vue'
import Ground from '../views/Ground.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/horizon',
    name: 'Horizon',
    component: Horizon
  },
  {
    path: '/ground',
    name: 'Ground',
    component: Ground
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
