import Vue from 'vue'
import VueRouter from 'vue-router'
import ChackService from '../components/ChackService'
import EditService from '../components/EditService'

Vue.use(VueRouter)
// var timestamp = (new Date()).getTime()
// var script = document.createElement('script')

const routes = [
  {
    path: '*',
    name: 'wildcard',
    redirect: '/'
  },
  {
    path: '/',
    component: ChackService
  },
  {
    path: '/ServiceOnemail',
    component: ChackService
  },
  {
    path: '/EditSOM',
    component: EditService
  }
]

// document.head.appendChild(script)

const router = new VueRouter({
  routes
  // mode: 'history'
})

export default router
