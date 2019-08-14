import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import main from '@/components/main'
import login from '@/components/pages/login'
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
      component: index
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
