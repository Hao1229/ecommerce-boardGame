<template>
  <div>
    <div class="contentBg min-vh-100 d-flex justify-content-center align-items-center">
        <div>
          <img src="https://i.imgur.com/HXIW7B2.png" class="logo">
        </div>
    </div>
    <div class="bg-light">
    <div class="container pb-2 pt-5 pb-md-0">
      <section class="timeline-section pt-5">
        <div class="row animated">
          <div class="mt-3 col-6">
            <router-link to="/allproducts">
              <img src="https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" class="RWDadImg">
            </router-link>
          </div>
          <div class="col-6 d-flex justify-content-center align-items-center">
            <div>
               <router-link to="/allproducts" class="RWDadTitle">週年慶大促銷</router-link>
               <p class="h2 mt-2 RWDadTitle">全館商品大特價</p>
               <p class="h2 mt-2 RWDadTitle">不限金額、數量，全館免運</p>
               <p class="h2 mt-2 RWDadTitle">7天鑑賞期，不滿意退貨</p>
            </div>
          </div>
        </div>
        <div class="row animated mt-5">
          <div class="col-6 d-flex justify-content-center align-items-center">
            <div>
              <router-link to="/getcoupon" class="RWDadTitle">優惠卷大放送</router-link>
              <p class="h2 mt-2 RWDadTitle">回答問卷領取優惠卷</p>
              <p class="h2 mt-2 RWDadTitle">多種優惠卷、多種折扣</p>
              <p class="h2 mt-2 RWDadTitle">全館商品皆可使用</p>
            </div>
          </div>
          <div class="mt-3 col-6">
            <router-link to="/getcoupon">
              <img src="https://images.unsplash.com/photo-1487712010531-65e9aa8b4b1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80" class="RWDadImg">
            </router-link>
          </div>
        </div>
      </section>
        <section>
          <div class="mt-5 text-center d-flex align-items-center">
            <div class="bg-dark flex-fill" style="height:2px"></div>
            <h3 class="border border-dark p-2">熱門商品</h3>
            <div class="bg-dark flex-fill" style="height:2px"></div>
          </div>
          <div class="row mt-3 pb-5">
            <div class="col-4 position-relative animated" v-for="item in productHot" :key="item.id">
              <img :src="item.imageUrl" class="mw-100 pointer" @click="gotoDetail(item.id)">
              <div class="text-center w-100 mt-2">{{item.title}}</div>
              <div class="text-center">
                <span v-if="!item.price">NT{{item.origin_price | currency}}</span>
                <span class="text-muted" v-if="item.price"><s>NT{{item.origin_price | currency}}</s></span>
                <span class="ml-1" v-if="item.price">NT{{item.price | currency}}</span>
              </div>
              <button class="addtoCart p-2 d-none d-lg-block" @click="addtoCart(item.id)" :disabled="buttonStatus.isAdd">
                <i class="fas fa-cart-plus fa-3x"></i>
              </button>
            </div>
          </div>
        </section>
    </div>
    </div>
    <section>
      <div class="p-4 text-center realshopBg">
          <span class="h3">實體店面服務</span>
          <div class="row mt-4 border-bottom border-dark">
            <div class="col-md-6">
              <div class="d-flex text-left">
                <div class="mr-3"><i class="fas fa-couch fa-4x"></i></div>
                <div>
                  <h4>遊戲空間出租</h4>
                  <p>店面提供良好的遊戲空間，冷氣、沙發一應具全，只需要小小的租金就可以一整天泡在這裡與朋友一起享受桌遊。</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 mt-2 mt-md-0">
              <div class="d-flex text-left">
                <div class="mr-3"><i class="fas fa-chess-board fa-4x"></i></div>
                <div>
                  <h4>百款遊戲租借</h4>
                  <p>提供多款火紅桌遊租借遊玩，無論是借回家跟家人同樂或是現場與朋友遊玩都是很棒的選擇!!</p>
                </div>
              </div>
            </div>
          </div>
          <div class="text-left mt-3 row">
            <div class="col-md-6 pb-3">
              <p class="h4 mb-3">店鋪位置</p>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7230.261699561725!2d121.5318037224058!3d25.02963310720639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9803a65369f%3A0x61fb21e8f586e51f!2z5aSn5a6J5qOu5p6X5YWs5ZyS!5e0!3m2!1szh-TW!2stw!4v1566903215323!5m2!1szh-TW!2stw" width="100%" height="90%" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
            </div>
            <div class="col-md-6 mt-4 mt-md-0">
              <p class="h4 mb-3">電話預約</p>
              <div class="mt-2">
                <i class="fas fa-phone-square-alt mr-2"></i>
                <span>02-12345678</span>
              </div>
              <p class="h4 my-3">營業時間</p>
              <div class="mt-2">
                <i class="fas fa-store mr-2"></i>
                <p class="mt-2">週二到週五, 11am - 20pm</p>
                <p>假日, 10am - 21pm</p>
                <p>週一公休</p>
              </div>
            </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'
$(window).scroll(() => {
  let scrollPos = $(window).scrollTop()
  let windowHeight = $(window).height()
  $('.animated').each(function () {
    let thisPos = $(this).offset().top
    if ((windowHeight + scrollPos) >= thisPos) {
      $(this).addClass('fadeIn')
    }
  })
})
export default {
  data () {
    return {
      productAll: [],
      productHot: [],
      buttonStatus: {
        isAdd: false
      }
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      const vm = this
      this.$http.get(api).then((response) => {
        vm.productAll = response.data.products
        vm.productHot = vm.productAll.filter((item, i) => {
          return i < 3
        })
      })
    },
    addtoCart (id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      vm.buttonStatus.isAdd = true
      const product = {
        'product_id': id,
        'qty': '1'
      }
      vm.$bus.$emit('loading: push', 'start')
      this.$http.post(api, {data: product}).then((response) => {
        vm.$bus.$emit('update:cart')
        vm.buttonStatus.isAdd = false
      })
    },
    gotoDetail (id) {
      this.$router.push(`/products/${id}`)
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
     @import url("@fortawesome/fontawesome-free/css/all.css");
      .timeline-section{
        position: relative;
      }
      .timeline-section::after{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        background: #ae0000;
        width: 2px;
        transform: translateX(-50%);
      }
      .RWDadTitle{
        font-size: 40px;
        @media(max-width: 768px){
          font-size: 20px
        }
      }
      .RWDadImg{
        max-height: auto;
        max-width: 100%;
        box-shadow: 5px 5px 5px gray
      }
     .textNodecoration{
        text-decoration: none
     }
     .contentBg{
        background-image: url('https://i.imgur.com/3eRcJNV.jpg');
        background-attachment: fixed ;
     }
     .logo{
         width: 300px;
         height: 300px;
         opacity: 0.9;
     }
     .adAnimation{
         &:hover{
            opacity: 0.5;
         }
     }
     .couponAnimation{
         &:hover{
            opacity: 0.5;
         }
     }
     .liststyleNone{
        list-style-type: none
    }
    .addtoCart{
      position: absolute;
      top: 71%;
      left: 3.5%;
      background-color: rgba($color: white, $alpha: 0.8);
      outline: none;
      border: none;
      transition: all .5s;
    }
    .animated{
      opacity: 0;
      transition: all 1.5s;
      transform: translateY(50px)
    }
    .fadeIn{
      opacity: 1;
      transform: translateY(0)
    }
    .realshopsectionBg{
      background-image: url('https://i.imgur.com/uD8TZ6t.jpg');
      background-attachment: fixed ;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover
    }
    .realshopBg{
      background-color: rgba($color: #D2691E, $alpha: 0.6);
    }
    .pointer{
      &:hover{
        cursor: pointer;
      }
    }
</style>
