<template>
    <div class="fixed-top">
      <div class="d-flex justify-content-between align-items-center navbarBg">
          <router-link to="/" class="text-primary navbarIcon ml-3 h3 my-2"><i class="fas fa-chess-knight mr-2"></i>桌迷藏</router-link>
          <!-- 漢堡選單icon -->
          <div class="mr-4 h4 text-primary d-md-none my-2 pointer" @click="showOffcanvas"><i class="fas fa-bars"></i></div>
          <!-- pad以上解析度出現的Navbar按鈕 -->
          <div class="mainNavbar d-flex h-100">
             <!-- 商品列表按鈕 -->
            <div>
              <router-link class="mainNavbarBtn mr-4 py-2 h5" :to="{name:'mainallproducts'}"><i class="fas fa-shopping-bag mr-2"></i>商品列表</router-link>
            </div>
            <!-- 優惠卷按鈕 -->
            <div class="position-relative" @mouseleave="couponHide">
              <a href="#" class="mainNavbarBtn py-2 h5 h-100 mr-3" @mouseenter="couponShow"><i class="fas fa-ticket-alt mr-2"></i>優惠卷<i class="fas fa-angle-down ml-2"></i></a>
              <div class="couponTable d-none bg-primary" :class="{'p-4':tempCoupons.length === 0}" @mouseleave="couponHide">
                <span class="h5 text-white text-nowrap" v-if="tempCoupons.length === 0">您尚未有任何優惠卷</span>
                <router-link :to="{name:'getcoupon'}" v-if="tempCoupons.length === 0" class="h5 btn btn-outline-light mt-3">拿取優惠卷</router-link>
                <table class="table" v-if="tempCoupons.length > 0">
                  <thead>
                    <tr class="text-nowrap text-white">
                      <th>優惠卷名稱</th>
                      <th>優惠卷代碼</th>
                      <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="text-nowrap text-white" v-for="(item, i) in tempCoupons" :key="item.code">
                      <td>{{item.title}}</td>
                      <td class="text-center">{{item.code}}</td>
                      <td class="pointer" @click="removeCoupon(i)"><i class="fas fa-trash"></i></td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 購物車按鈕 -->
            <div class="position-relative" @mouseleave="cartHide">
              <a href="#" class="mainNavbarBtn mr-3 py-2 h5" @mouseenter="cartShow"><i class="fas fa-shopping-cart mr-2 position-relative"></i>購物車<i class="fas fa-angle-down ml-2"></i></a>
              <div class="bg-primary cartTable d-none px-5" @mouseleave="cartHide">
                <ul v-if="cartList.length > 0" class="liststyleNone px-0 mx-0 pr-5" style="overflow-y:auto;max-height:50vh">
                  <li v-for="item in cartList" :key="item.id" class="border-bottom border-light position-relative mt-2 pb-2">
                  <div class="text-white text-nowrap">
                    <h5>{{item.product.title}}</h5>
                    <span>{{item.qty}}{{item.product.unit}} x </span><span>NT{{item.product.price | currency}}</span>
                  </div>
                  <button class="cancel" :disabled="buttonStatus.isRemove" @click="removeCart(item.id)"><i class="fas fa-times-circle text-white"></i></button>
                  </li>
                  <li class="border-bottom border-light position-relative mt-2 pb-2">
                    <div class="text-white text-nowrap">
                      <span class="text-white">小計：</span><span class="font-weight-bold text-white">NT{{cartTotal | currency}}</span>
                    </div>
                  </li>
                </ul>
                <ul v-if="cartList.length > 0" class="liststyleNone px-0 mx-0 pr-5">
                  <li class="my-2">
                    <router-link :to="{name:'cart'}" class="btn btn-block btn-info btn-lg text-nowrap">前往購物車</router-link>
                  </li>
                </ul>
                <ul v-if="cartList.length === 0" class="liststyleNone px-0 mx-0">
                  <li class="p-2">
                    <span class="text-white text-nowrap">購物車無任何物品</span>
                  </li>
                </ul>
              </div>
              <div class="cartCount border border-white rounded-circle text-center align-middle text-primary" v-if="cartList.length > 0">{{cartList.length}}</div>
            </div>
          </div>
      </div>
      <!-- pad以下解析度並點擊漢堡icon才會出現的 offcanvas -->
      <aside class="side min-vw-100 min-vh-100">
        <div class="offcanvas">
          <i class="fas fa-times-circle cancelOffcanvas text-primary fa-2x" @click.prevent="closeOffcanvas"></i>
          <!-- 購物車按鈕 -->
          <div>
            <a href="#" class="mt-5 mainNavbarBtn pt-2 h3 d-block text-center" @click.prevent="RWDcartshow">
              <i class="fas fa-shopping-cart mr-2 position-relative">
                <div class="cartCount border border-white rounded-circle text-center align-middle text-primary" v-if="cartList.length > 0">{{cartList.length}}</div>
              </i>購物車<i class="fas fa-angle-down ml-2" :class="{'fa-angle-up': cartExpand}"></i>
            </a>
              <div class="bg-primary RWDcart">
                <table class="table">
                  <tbody v-if="cartList.length > 0">
                      <tr v-for="item in cartList" :key="item.id">
                        <td class="position-relative">
                          <div class="text-white text-nowrap">
                            <h5>{{item.product.title}}</h5>
                            <span>{{item.qty}}{{item.product.unit}} x </span><span>NT{{item.product.price | currency}}</span>
                          </div>
                          <button class="cancel" :disabled="buttonStatus.isRemove" @click="removeCart(item.id)"><i class="fas fa-times-circle text-white"></i></button>
                        </td>
                      </tr>
                      <tr>
                        <td class="position-relative">
                          <div class="text-white text-nowrap">
                            <span class="text-white">小計：</span><span class="font-weight-bold text-white">NT{{cartTotal | currency}}</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <router-link :to="{name:'cart'}" class="btn btn-block btn-info btn-lg text-nowrap">前往購物車</router-link>
                        </td>
                      </tr>
                    </tbody>
                    <tbody  v-if="cartList.length === 0">
                      <tr>
                        <td class="text-center">
                          <span class="text-white text-nowrap">購物車無任何物品</span>
                        </td>
                      </tr>
                    </tbody>
                </table>
              </div>
          </div>
          <!-- 優惠卷按鈕 -->
          <div>
            <a href="#" class="mt-5 mainNavbarBtn pt-2 h3 d-block text-center" @click.prevent="RWDcouponsShow"><i class="fas fa-ticket-alt mr-2"></i>優惠卷<i class="fas fa-angle-down ml-2"  :class="{'fa-angle-up': couponExpand}"></i></a>
              <div class="bg-primary RWDcoupons" :class="{'text-center':tempCoupons.length === 0}">
                <span class="h5 text-white text-nowrap" v-if="tempCoupons.length === 0">您尚未有任何優惠卷</span><br>
                <router-link :to="{name:'getcoupon'}" v-if="tempCoupons.length === 0" class="h5 btn btn-outline-light mt-3">拿取優惠卷</router-link>
                <table class="table" v-if="tempCoupons.length > 0">
                  <thead>
                    <tr class="text-nowrap text-white">
                      <th>優惠卷名稱</th>
                      <th>優惠卷代碼</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="text-nowrap text-white" v-for="(item, i) in tempCoupons" :key="item.code">
                      <td>{{item.title}}</td>
                      <td class="text-center">{{item.code}}</td>
                      <td class="pointer" @click.prevent="removeCoupon(i)"><i class="fas fa-trash"></i></td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
          <!-- 商品列表按鈕 -->
          <router-link class="mainNavbarBtn pt-2 h3 mt-5 d-block text-center" :to="{name:'mainallproducts'}"><i class="fas fa-shopping-bag mr-2"></i>商品列表</router-link>
        </div>
      </aside>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      tempCoupons: JSON.parse(localStorage.getItem('coupon')) || [],
      couponExpand: false,
      cartExpand: false,
      productsExpand: false,
      cartList: [],
      cartTotal: null,
      buttonStatus: {
        isRemove: false
      }
    }
  },
  methods: {
    showOffcanvas () {
      $('.side').addClass('offcanvasShow')
    },
    closeOffcanvas () {
      $('.side').removeClass('offcanvasShow')
      $('.RWDcoupons').removeClass('RWDcoupons-active')
      $('.RWDcart').removeClass('RWDcart-active')
      $('.RWDproducts').removeClass('RWDproducts-active')
      const vm = this
      vm.couponExpand = false
      vm.cartExpand = false
      vm.productsExpand = false
    },
    cartShow () {
      $('.cartTable').addClass('d-block')
    },
    cartHide () {
      $('.cartTable').removeClass('d-block')
    },
    couponShow () {
      $('.couponTable').addClass('d-block')
    },
    couponHide () {
      $('.couponTable').removeClass('d-block')
    },
    RWDcouponsShow () {
      $('.RWDcoupons').toggleClass('RWDcoupons-active')
      const vm = this
      vm.couponExpand = !vm.couponExpand
    },
    RWDcartshow () {
      $('.RWDcart').toggleClass('RWDcart-active')
      const vm = this
      vm.cartExpand = !vm.cartExpand
    },
    RWDproductshow () {
      $('.RWDproducts').toggleClass('RWDproducts-active')
      const vm = this
      vm.productsExpand = !vm.productsExpand
    },
    removeCoupon (i) {
      const vm = this
      vm.tempCoupons.splice(i, 1)
      if (vm.tempCoupons.length === 0) {
        vm.couponExpand = false
      }
    },
    getCarts (status) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      if (status !== 'stop') {
        vm.$bus.$emit('loading: push', 'start')
      }
      this.$http.get(api).then((response) => {
        vm.cartList = response.data.data.carts
        vm.cartTotal = response.data.data.final_total
        vm.$bus.$emit('loading: push', 'stop')
      })
    },
    removeCart (id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      const vm = this
      vm.buttonStatus.isRemove = true
      vm.$bus.$emit('loading: push', 'start')
      this.$http.delete(api).then((response) => {
        vm.getCarts('stop')
        vm.buttonStatus.isRemove = false
        if (vm.cartList.length === 0) {
          vm.cartExpand = false
        }
      })
    },
    updateCoupons (title, code) {
      const vm = this
      const judgeCoupon = vm.tempCoupons.some((item) => {
        return item.title === title
      })
      if (!judgeCoupon) {
        vm.tempCoupons.push({
          title,
          code
        })
      } else if (judgeCoupon) {
        alert('已有此優惠卷')
      }
    }
  },
  created () {
    this.getCarts()
    const vm = this
    vm.$bus.$on('update:cart', (status) => {
      vm.getCarts(status)
    })
    vm.$bus.$on('coupon:get', (title, code) => {
      vm.updateCoupons(title, code)
    })
  },
  watch: {
    tempCoupons: {
      handler () {
        let storageName = 'coupon'
        localStorage.setItem(storageName, JSON.stringify(this.tempCoupons))
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
    .navbarBg{
        background-color: rgba($color: #DCDCDC, $alpha: 0.9)
    }
    .mainNavbarBtn{
        position: relative;
        color: rgba($color: #ae0000, $alpha: 0.8);
        &::before{
            position: absolute;
            content: '';
            top: 0;
            left: 50%;
            height: 3px;
            margin-top: 4px;
            background: #ae0000;
            width: 0%;
            transform: translateX(-50%);
            transition: all .3s;
            @media(max-width: 767px){
                display: none
            }
        }
        @media(min-width: 768px){
            &:hover{
            color: rgba($color: #ae0000, $alpha: 1.0);
            &::before{
            position: absolute;
            content: '';
            top: 0;
            left: 50%;
            height: 3px;
            margin-top: 4px;
            background: #ae0000;
            width: 100%;
            transform: translateX(-50%);
            transition: all .3s
          }
            text-decoration: none;
          }
        }
        &:active{
            color: rgba($color: #ae0000, $alpha: 1.0);
            &::before{
            position: absolute;
            content: '';
            top: 0;
            left: 50%;
            height: 3px;
            background: #ae0000;
            width: 100%;
            transform: translateX(-50%);
            transition: all .3s
        }
            text-decoration: none;
        }
    }
    .mainNavbar{
        padding-right: 85px;
        @media(max-width: 768px){
          padding-right: 70px;
        }
        @media(max-width: 767px){
            display: none !important
        }
    }
    .offcanvas{
        min-width: 50vw;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba($color: #DCDCDC, $alpha: 0.8);
        overflow: auto;
    }
    .side{
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: rgba($color:#696969, $alpha: 0.7);
        transition: all .3s;
        transform: translateX(100vw);
        overflow: hidden;
    }
    .offcanvasShow{
        transform: translateX(0);
        overflow: auto
    }
    .cancelOffcanvas{
      position: absolute;
      top: 0;
      right: 0;
    }
    .cancel{
        position: absolute;
        top: 0px;
        right: 0px;
        border: none;
        outline: none;
        background-color: transparent;
        margin: 0;
        padding: 0;
        @media(max-width: 767px){
          right: 10px;
        }
    }
    .navbarIcon{
        text-decoration: none
    }
    .pointer{
        cursor: pointer;
    }
    .liststyleNone{
        list-style-type: none
    }
    .cartTable{
        position: absolute;
        top: 35px;
        left: -40px;
        z-index: 999;
           &::before{
                content: '';
                position: absolute;
                top: -23px;
                left: 30%;
                height: 0;
                width:0;
                border: transparent 12px solid;
                border-bottom: #ae0000 12px solid;
            }
    }
    .couponTable{
        position: absolute;
        top: 35px;
        z-index: 999;
           &::before{
                content: '';
                position: absolute;
                top: -23px;
                left: 20%;
                height: 0;
                width:0;
                border: transparent 12px solid;
                border-bottom: #ae0000 12px solid;
            }
    }
    .RWDcoupons{
        max-height: 0 ;
        overflow: hidden;
    }
    .RWDcoupons-active{
        max-height: 500px ;
        transition:  max-height 1.5s;
    }
    .RWDcart{
        max-height: 0 ;
        overflow: hidden;
    }
    .RWDcart-active{
        max-height: 1000px ;
        transition:  max-height 1.5s;
    }
    .RWDproducts{
        max-height: 0 ;
        overflow: hidden;
    }
    .RWDproducts-active{
        max-height: 200px ;
        transition:  max-height 1.5s;
    }
    .cartCount{
      font-size: 10px;
      background-color: rgba($color: white, $alpha: 1.0);
      position: absolute;
      top: -10px;
      left: 10px;
      width: 20px;
      height: 20px;
      @media(max-width: 767px) {
        width:15px;
        height: 15px;
        top: -7px;
        left: 22px;
      }
    }
</style>
