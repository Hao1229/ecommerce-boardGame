<template>
    <div class="fixed-top">
      <loading :active.sync="isLoading" :is-full-page="true">
        <template slot="before"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
        <template slot="default">
          <i class="fas fa-chess-knight fa-3x text-primary mb-3 mx-2"></i>
        </template>
        <template slot="after"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
      </loading>
      <div class="d-flex justify-content-between align-items-center navbarBg">
          <router-link to="/" class="text-primary navbarIcon ml-3 h3 my-2"><i class="fas fa-chess-knight mr-2"></i>桌迷藏</router-link>
          <!-- 漢堡選單icon -->
          <div class="mr-4 h4 text-primary d-md-none my-2 pointer" @click="showOffcanvas"><i class="fas fa-bars"></i></div>
          <!-- pad以上解析度出現的Navbar按鈕 -->
          <ul class="mainNavbar d-md-flex flex-md-row-reverse mr-5 align-items-md-center liststyleNone mb-0">
              <li>
                  <router-link to="/login" class="mainNavbarBtn pt-2 h5"><i class="fas fa-user mr-2"></i>後台登入</router-link>
              </li>
               <li class="position-relative" @mouseleave="couponHide">
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
                  <a href="#" class="mainNavbarBtn mr-4 pt-2 h5" @mouseenter="couponShow"><i class="fas fa-ticket-alt mr-2"></i>優惠卷<i class="fas fa-angle-down ml-2"></i></a>
              </li>
              <li class="position-relative" @mouseleave="cartHide">
                  <div class="bg-primary cartTable d-none px-5" @mouseleave="cartHide">
                    <ul v-if="cartList.length > 0" class="liststyleNone px-0 mx-0 pr-5" style="overflow-y:auto;max-height:50vh">
                      <li v-for="item in cartList" :key="item.id" class="border-bottom border-light position-relative mt-2 pb-2">
                        <div class="text-white text-nowrap">
                            <h5>{{item.product.title}}</h5>
                            <span>{{item.qty}}{{item.product.unit}} x </span><span>NT{{item.product.price | currency}}</span>
                        </div>
                         <i class="fas fa-times-circle cancel text-white" @click="removeCart(item.id)"></i>
                      </li>
                      <li class="border-bottom border-light position-relative mt-2 pb-2">
                         <div class="text-white text-nowrap">
                            <span class="text-white">小計：</span><span class="font-weight-bold text-white">NT{{cartTotal | currency}}</span>
                         </div>
                      </li>
                      <li class="my-2">
                        <button class="btn btn-block btn-info btn-lg text-nowrap">前往購物車</button>
                        <button class="btn btn-block btn-success btn-lg text-nowrap mt-2">結帳</button>
                      </li>
                    </ul>
                    <ul v-if="cartList.length === 0" class="liststyleNone px-0 mx-0">
                      <li class="p-3">
                        <span class="text-white text-nowrap">購物車無任何物品</span>
                      </li>
                    </ul>
                  </div>
                  <a href="#" class="mainNavbarBtn mr-4 pt-2 h5" @mouseenter="cartShow"><i class="fas fa-shopping-cart mr-2"></i>購物車<i class="fas fa-angle-down ml-2"></i></a>
              </li>
              <li class="position-relative" @mouseleave="producttableHide">
                  <div class="bg-primary productTable d-none" @mouseleave="producttableHide">
                      <table class="table table-borderless">
                        <tbody>
                            <tr>
                              <td><router-link :to="{name:'mainallproducts'}" class="btn btn-light text-nowrap">全部遊戲</router-link></td>
                            </tr>
                            <tr>
                            <td><router-link :to="{name:'partyproducts'}" class="btn btn-light text-nowrap">派對遊戲</router-link></td>
                            <td><router-link :to="{name:'strategyproducts'}" class="btn btn-light text-nowrap">策略遊戲</router-link></td>
                            </tr>
                            <tr>
                            <td><router-link :to="{name:'familygyproducts'}" class="btn btn-light text-nowrap">家庭遊戲</router-link></td>
                            <td><router-link :to="{name:'themeproducts'}" class="btn btn-light text-nowrap">主題遊戲</router-link></td>
                            </tr>
                        </tbody>
                      </table>
                  </div>
                  <a href="#" class="mainNavbarBtn mr-4 pt-2 h5" @mouseenter="producttableShow"><i class="fas fa-shopping-bag mr-2"></i>全部商品<i class="fas fa-angle-down ml-2"></i></a>
              </li>
          </ul>
      </div>
      <!-- pad以下解析度並點擊漢堡icon才會出現的 offcanvas -->
      <aside class="side min-vw-100 min-vh-100">
           <ul class="liststyleNone p-0 m-0 px-2 offcanvas">
             <i class="fas fa-times-circle cancel text-primary fa-2x" @click="closeOffcanvas"></i>
              <li class="mt-5 d-flex justify-content-center p-0 m-0">
                  <router-link to="/login" class="mainNavbarBtn pt-2 h3"><i class="fas fa-user mr-2"></i>後台登入</router-link>
              </li>
              <li class="mt-5 p-0 m-0">
                  <a href="#" class="mainNavbarBtn pt-2 h3 d-block text-center" @click="RWDcartshow"><i class="fas fa-shopping-cart mr-2"></i>購物車<i class="fas fa-angle-down ml-2" :class="{'fa-angle-up': cartExpand}"></i></a>
                   <div class="bg-primary RWDcart">
                      <table class="table">
                        <tbody v-if="cartList.length > 0">
                            <tr v-for="item in cartList" :key="item.id">
                            <td class="position-relative">
                                <div class="text-white text-nowrap">
                                    <h5>{{item.product.title}}</h5>
                                    <span>{{item.qty}}{{item.product.unit}} x </span><span>NT{{item.product.price | currency}}</span>
                                </div>
                                <i class="fas fa-times-circle cancel text-white" @click="removeCart(item.id)"></i>
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
                                  <button class="btn btn-block btn-info btn-lg text-nowrap">前往購物車</button>
                                  <button class="btn btn-block btn-success btn-lg text-nowrap mt-2">結帳</button>
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
              </li>
                   <li class="mt-5 p-0 m-0">
                  <a href="#" class="mainNavbarBtn pt-2 h3 d-block text-center" @click="RWDcouponsShow"><i class="fas fa-ticket-alt mr-2"></i>優惠卷<i class="fas fa-angle-down ml-2"  :class="{'fa-angle-up': couponExpand}"></i></a>
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
                            <td class="pointer" @click="removeCoupon(i)"><i class="fas fa-trash"></i></td>
                            </tr>
                        </tbody>
                      </table>
                  </div>
              </li>
              <li class="my-5 p-0 m-0">
                  <a href="#" class="mainNavbarBtn pt-2 h3  d-block text-center" @click="RWDproductshow"><i class="fas fa-shopping-bag mr-2"></i>全部商品<i class="fas fa-angle-down ml-2" :class="{'fa-angle-up': productsExpand}"></i></a>
                    <div class="bg-primary RWDproducts">
                      <table class="table table-borderless">
                        <tbody>
                            <tr>
                              <td><router-link :to="{name:'mainallproducts'}" class="btn btn-light text-nowrap">全部遊戲</router-link></td>
                            </tr>
                            <tr>
                            <td><router-link :to="{name:'partyproducts'}" class="btn btn-light text-nowrap">派對遊戲</router-link></td>
                            <td><router-link :to="{name:'strategyproducts'}" class="btn btn-light text-nowrap">策略遊戲</router-link></td>
                            </tr>
                            <tr>
                            <td><router-link :to="{name:'familygyproducts'}" class="btn btn-light text-nowrap">家庭遊戲</router-link></td>
                            <td><router-link :to="{name:'themeproducts'}" class="btn btn-light text-nowrap">主題遊戲</router-link></td>
                            </tr>
                        </tbody>
                      </table>
                  </div>
              </li>
          </ul>
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
      isLoading: false,
      cartList: [],
      cartTotal: null
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
    producttableShow () {
      $('.productTable').addClass('d-block')
    },
    producttableHide () {
      $('.productTable').removeClass('d-block')
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
    getCarts () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        vm.cartList = response.data.data.carts
        vm.cartTotal = response.data.data.final_total
        vm.isLoading = false
      })
    },
    removeCart (id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      const vm = this
      this.$http.delete(api).then((response) => {
        vm.getCarts()
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
      } else {
        alert('已有此優惠卷')
      }
    }
  },
  created () {
    this.getCarts()
    const vm = this
    vm.$bus.$on('update:cart', () => {
      vm.getCarts()
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
        padding: 20px 0 ;
        @media(max-width: 767px){
            display: none
        }
    }
    .offcanvas{
        min-width: 50vw;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba($color: #DCDCDC, $alpha: 0.8);
        overflow: auto
    }
    .side{
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: rgba($color:#696969, $alpha: 0.7);
        transition: all .3s;
        transform: translateX(-100vw);
        overflow: hidden;
    }
    .offcanvasShow{
        transform: translateX(0);
        overflow: auto
    }
    .cancel{
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 999;
        &:hover{
            cursor: pointer;
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
    .productTable{
        position: absolute;
        top: 45px;
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
    .cartTable{
        position: absolute;
        top: 45px;
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
    .couponTable{
        position: absolute;
        top: 45px;
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
</style>
