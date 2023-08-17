import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ChackService from '../components/ChackService'
import EditService from '../components/EditService'

const routes = [
  {
    path: '/',
    name: 'Service',
    component: ChackService
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: HomeView
  // },
  {
    path: '/EditS',
    name: 'EditS',
    component: EditService
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
