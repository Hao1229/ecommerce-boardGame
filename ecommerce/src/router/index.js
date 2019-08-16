import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Main from '@/components/Main'
import Login from '@/components/pages/Login'
import DashBoard from '@/components/DashBoard'
import Home from '@/components/pages/AdminHome'
import Product from '@/components/pages/Products'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'dashBoard',
      component: DashBoard,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: { requiresAuth: true }
        },
        {
          path: 'home',
          name: 'home',
          component: Home,
          meta: { requiresAuth: true }
        },
        {
          path: 'products',
          name: 'products',
          component: Product,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
