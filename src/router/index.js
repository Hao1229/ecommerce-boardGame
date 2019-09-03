import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
import Main from '@/components/Main'
import Login from '@/components/pages/Login'
import DashBoard from '@/components/DashBoard'
import Home from '@/components/pages/AdminHome'
import Product from '@/components/pages/Products'
import Coupon from '@/components/pages/Coupon'
import Orders from '@/components/pages/Orders'
import Maincontent from '@/components/MainContent'
import MainAllProducts from '@/components/MainAllProducts'
import ProductsDetail from '@/components/ProductsDetail'
import GetCoupon from '@/components/GetCoupon'
import Cart from '@/components/ShoppingCart'
import Checkout from '@/components/Checkout'
import CheckoutOrder from '@/components/CheckoutOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    // {
    //   path: '/',
    //   name: 'index',
    //   component: Index
    // },
    {
      path: '/',
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
          path: 'products/:Id',
          name: 'productsDetail',
          component: ProductsDetail
        },
        {
          path: 'getcoupon',
          name: 'getcoupon',
          component: GetCoupon
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: Checkout
        },
        {
          path: 'checkoutorder/:orderId',
          name: 'checkoutorder',
          component: CheckoutOrder
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
