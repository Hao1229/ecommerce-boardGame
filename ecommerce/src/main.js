// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import router from './router'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.component('Loading', Loading)

Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
