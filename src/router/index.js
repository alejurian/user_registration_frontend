import VueRouter from 'vue-router'
import Forms from '../pages'
import Users from '../pages/Users'
import Verification from '../pages/Verification'

const routes = [
  { path: '/', component: Forms },
  { path: '/users', component: Users },
  { path: '/verification/:id', component: Verification },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
