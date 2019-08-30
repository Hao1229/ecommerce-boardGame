import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Main from '@/components/Main'
import Login from '@/components/pages/Login'
import DashBoard from '@/components/DashBoard'
import Home from '@/components/pages/AdminHome'
import Product from '@/components/pages/Products'
import Coupon from '@/components/pages/Coupon'
import Orders from '@/components/pages/Orders'
import Maincontent from '@/components/MainContent'
import MainAllProducts from '@/components/MainAllProducts'
import MainPartyProducts from '@/components/MainParty'
import MainStrategyProducts from '@/components/MainStrategy'
import MainFamilyProducts from '@/components/MainFamily'
import MainThemeProducts from '@/components/MainTheme'
import ProductsDetail from '@/components/ProductsDetail'
import GetCoupon from '@/components/GetCoupon'
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
      component: Main,
      children: [
        {
          path: '',
          name: 'maincontent',
          component: Maincontent
        },
        {
          path: 'allproducts',
          name: 'mainallproducts',
          component: MainAllProducts
        },
        {
          path: 'partyproducts',
          name: 'partyproducts',
          component: MainPartyProducts
        },
        {
          path: 'strategyproducts',
          name: 'strategyproducts',
          component: MainStrategyProducts
        },
        {
          path: 'familygyproducts',
          name: 'familygyproducts',
          component: MainFamilyProducts
        },
        {
          path: 'themeproducts',
          name: 'themeproducts',
          component: MainThemeProducts
        },
        {
          path: 'products/:Id',
          name: 'productsDetail',
          component: ProductsDetail
        },
        {
          path: 'getcoupon',
          name: 'getcoupon',
          component: GetCoupon
        }
      ]
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
      children: [
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
        },
        {
          path: 'coupons',
          name: 'coupons',
          component: Coupon,
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
