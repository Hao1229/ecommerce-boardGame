<template>
  <div>
     <loading :active.sync="isLoading" :is-full-page="true">
        <template slot="before"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
        <template slot="default">
          <i class="fas fa-chess-knight fa-3x text-primary mb-3 mx-2"></i>
        </template>
        <template slot="after"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
    </loading>
    <div class="contentBg min-vh-100 d-flex justify-content-center align-items-center">
        <div>
          <img src="https://i.imgur.com/HXIW7B2.png" class="logo">
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mb-3 mb-md-0">
                <div class="adBg mt-3 p-4 h-100">
                    <router-link to="/" class="textNodecoration">
                      <div class="text-center d-flex flex-column adAnimation">
                        <i class="fas fa-birthday-cake fa-3x text-primary"></i>
                        <span class="display-3 mb-3 text-primary">週年慶大促銷</span>
                        <span class="h2 text-dark font-italic">全館商品特價</span>
                      </div>
                    </router-link>
                </div>
            </div>
            <div class="col-md-6">
                <div class="couponBg mt-3 p-4 h-100">
                    <router-link to="/" class="textNodecoration">
                      <div class="text-center d-flex flex-column couponAnimation">
                        <i class="fas fa-ticket-alt fa-3x text-success"></i>
                        <span class="display-3 mb-3 text-success"> 優惠卷加碼送 </span>
                        <span class="h2 text-dark font-italic">取得優惠卷 Go~</span>
                      </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div>
          <div class="mt-5 text-center d-flex align-items-center">
            <div class="bg-dark flex-fill" style="height:2px"></div>
            <h3 class="border border-dark p-2">熱門商品</h3>
            <div class="bg-dark flex-fill" style="height:2px"></div>
          </div>
          <div class="row mt-3">
            <div class="col-4 position-relative" v-for="item in productHot" :key="item.id">
              <img :src="item.imageUrl" class="h-75 w-100">
              <div class="h4 text-center w-100 mt-2">{{item.title}}</div>
              <div class="text-center">
                <span class="h5" v-if="!item.price">NT{{item.origin_price | currency}}</span>
                <span class="h5 text-muted" v-if="item.price"><s>NT{{item.origin_price | currency}}</s></span>
                <span class="h5 ml-1" v-if="item.price">NT{{item.price | currency}}</span>
              </div>
              <div class="addtoCart p-2 d-none d-md-block" @click="addtoCart(item.id)">
                <i class="fas fa-cart-plus fa-3x"></i>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  data () {
    return {
      productAll: [],
      productHot: [],
      isLoading: false
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
      const product = {
        'product_id': id,
        'qty': '1'
      }
      vm.isLoading = true
      this.$http.post(api, {data: product}).then((response) => {
        vm.isLoading = false
        vm.$bus.$emit('update:cart')
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
     @import url("@fortawesome/fontawesome-free/css/all.css");
     .adBg{
        background: -webkit-linear-gradient(left top,#90EE90,#AFEEEE);
        background: -o-linear-gradient(bottom right,#90EE90,#AFEEEE);
        background: -moz-linear-gradient(bottom right,#90EE90,#AFEEEE);
        background: linear-gradient(to bottom right,#90EE90,#AFEEEE);
     }
     .couponBg{
        background: -webkit-linear-gradient(left top,#FFD700,#FA8072);
        background: -o-linear-gradient(bottom right,#FFD700,#FA8072);
        background: -moz-linear-gradient(bottom right,#FFD700,#FA8072);
        background: linear-gradient(to bottom right,#FFD700,#FA8072);
     }
     .textNodecoration{
        text-decoration: none
     }
     .contentBg{
        background-image: url('https://i.imgur.com/3eRcJNV.jpg');
        background-attachment: fixed ;
     }
     .logo{
         width: 320px;
         height: 320px;
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
      top: 63%;
      left: 3%;
      background-color: rgba($color: white, $alpha: 0.8);
      transition: all .5s;
      cursor: pointer;
      @media(max-width: 768px){
        top: 57%;
      }
    }
</style>
