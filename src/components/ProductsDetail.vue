<template>
    <div class="container mb-4">
       <div class="row">
         <div class="col-lg-5 text-center">
           <img :src="productDetail.imageUrl" class="detailImg">
         </div>
         <div class="col-lg-7 mt-3 mt-lg-0">
           <h3 class="text-secondary font-weight-bold">{{productDetail.title}}</h3>
           <p class="border-bottom border-secondary pb-3">{{productDetail.description}}</p>
           <p class="border-bottom border-secondary pb-3">{{productDetail.content}}</p>
           <div class="d-md-flex mt-5">
             <div class="btn-group mr-auto" role="group">
               <button type="button" class="btn btn-outline-secondary"  @click="reduceQty" :disabled="productQty == 1">-</button>
               <input type="number" class="w-50 text-center" min="1" max="10" v-model="productQty">
               <button type="button" class="btn btn-outline-secondary" @click="addQty" :disabled="productQty == 10">+</button>
               <i class="fas fa-cart-plus fa-2x ml-4 border rounded-circle border-secondary p-2" @click="addtoCart" v-if="!isAdding"></i>
               <i class="fas fa-cog fa-spin fa-2x ml-4 border rounded-circle border-secondary p-2" v-if="isAdding"></i>
             </div>
             <div class="mt-4 mt-md-0">
               <span class="h4 text-muted"><s>NT{{productDetail.origin_price | currency}}</s></span>
               <span class="h1 text-secondary ml-3">NT{{productDetail.price | currency}}</span>
             </div>
           </div>
            <div class="mt-5">
             <span class="h3 backstep" @click="backShop"><i class="fas fa-hand-point-left mr-2"></i>繼續選購</span>
           </div>
         </div>
       </div>
       <div class="w-100 border border-secondary my-4"></div>
       <!-- 相似商品 -->
       <span>同類型商品</span>
       <div class="row my-3">
        <div class="col-lg-3 col-md-4 col-6" v-for="item in sameProducts" :key="item.id">
          <div class="card border-primary">
            <img class="card-img-top" :src="item.imageUrl">
            <div class="card-body">
              <a href="#" class="card-title h5" @click.prevent="sameproductDetail(item.id)">{{item.title}}</a>
              <p class="card-text text-truncate">{{item.description}}</p>
              <p class="d-lg-flex justify-content-between"><s><span class="text-muted mr-2">NT{{item.origin_price | currency}}</span></s><br><span class="h5 text-primary">NT{{item.price | currency}}</span></p>
              <a href="#" @click.prevent="sameproductDetail(item.id)">more..</a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      productId: '',
      productDetail: [],
      allProducts: [],
      sameProducts: [],
      productQty: '1',
      isAdding: false
    }
  },
  methods: {
    getDetail () {
      const vm = this
      vm.$bus.$emit('loading: push', 'start')
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`
      this.$http.get(api).then((response) => {
        vm.productDetail = response.data.product
        vm.getsameProducts()
      })
    },
    getsameProducts () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      const vm = this
      this.$http.get(api).then((response) => {
        vm.allProducts = response.data.products
        vm.sameProducts = vm.allProducts.filter((item) => {
          return item.category === vm.productDetail.category && item.id !== vm.productDetail.id
        })
        vm.$bus.$emit('loading: push', 'stop')
      })
    },
    sameproductDetail (id) {
      this.$router.push(`/products/${id}`)
    },
    addQty () {
      const vm = this
      vm.productQty = parseInt(vm.productQty) + 1
    },
    reduceQty () {
      const vm = this
      vm.productQty = parseInt(vm.productQty) - 1
    },
    addtoCart () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      const product = {
        'product_id': vm.productId,
        'qty': vm.productQty
      }
      vm.$bus.$emit('loading: push', 'start')
      this.$http.post(api, {data: product}).then((response) => {
        vm.$bus.$emit('update:cart')
      })
    },
    backShop () {
      this.$router.push('/allproducts')
    }
  },
  created () {
    this.productId = this.$route.params.Id
    this.getDetail()
  },
  watch: {
    $route: {
      handler () {
        this.productId = this.$route.params.Id
        this.getDetail()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
    .container{
         padding-top: 70px;
     }
    .detailImg{
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: auto
    }
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    .fa-cart-plus{
      &:hover{
        background-color: rgba($color: brown, $alpha: 0.7);
        color:white;
        cursor: pointer;
      }
    }
    .backstep{
      color: rgba($color: brown, $alpha: 0.8);
      &:hover{
        cursor: pointer;
        color: brown
      }
    }
</style>
