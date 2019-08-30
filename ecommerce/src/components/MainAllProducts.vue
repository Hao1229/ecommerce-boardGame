<template>
    <div class="container">
       <loading :active.sync="isLoading" :is-full-page="true">
        <template slot="before"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
        <template slot="default">
          <i class="fas fa-chess-knight fa-3x text-primary mb-3 mx-2"></i>
        </template>
        <template slot="after"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
       </loading>
      <div class="row">
          <div class="col-md-3">
            <div class="text-center mb-3 mb-md-0" style="position:sticky;top:80px;">
              <span class="h4 d-none d-md-inline">遊戲分類</span>
              <ul class="list-group list-group-flush mt-3 d-none d-md-block">
                <li class="list-group-item list-group-item-action pointer active">全部遊戲</li>
                <li class="list-group-item list-group-item-action pointer"><router-link :to="{name:'partyproducts'}">派對遊戲</router-link></li>
                <li class="list-group-item list-group-item-action pointer"><router-link :to="{name:'strategyproducts'}">策略遊戲</router-link></li>
                <li class="list-group-item list-group-item-action pointer"><router-link :to="{name:'familygyproducts'}">家庭遊戲</router-link></li>
                <li class="list-group-item list-group-item-action pointer"><router-link :to="{name:'themeproducts'}">主題遊戲</router-link></li>
              </ul>
              <span class="h4 d-inline d-md-none text-primary">全部遊戲</span>
            </div>
          </div>
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-4 col-6 mb-3" v-for="item in allProducts" :key="item.id">
                <div class="card border-primary">
                  <img class="card-img-top" :src="item.imageUrl">
                  <div class="card-body">
                    <h5 class="card-title">{{item.title}}</h5>
                    <p class="card-text text-truncate">{{item.description}}</p>
                    <p class="d-lg-flex justify-content-between"><s><span class="text-muted mr-2">NT{{item.origin_price | currency}}</span></s><br><span class="h4 text-primary">NT{{item.price | currency}}</span></p>
                    <div class="d-lg-flex justify-content-between">
                      <div>
                        <i class="fas fa-cart-plus pointer border border-primary rounded-circle p-2" @click="addtoCart(item.id)"></i>
                        <i class="fas fa-cog fa-spin ml-2" v-if="status.loadingItem === item.id"></i>
                      </div>
                      <a href="#" @click.prevent="productDetail(item.id)">more..</a>
                    </div>
                  </div>
                </div>
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
      allProducts: [],
      isLoading: false,
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        vm.allProducts = response.data.products
        // console.log(response.data, vm.allProducts)
        vm.isLoading = false
      })
    },
    addtoCart (id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      const product = {
        'product_id': id,
        'qty': '1'
      }
      vm.status.loadingItem = id
      this.$http.post(api, {data: product}).then((response) => {
        vm.$bus.$emit('update:cart')
        vm.status.loadingItem = ''
      })
    },
    productDetail (id) {
      this.$router.push(`/main/products/${id}`)
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
     @import url("@fortawesome/fontawesome-free/css/all.css");
     .container{
         margin-top: 80px;
     }
     .pointer{
         &:hover{
             cursor: pointer;
         }
     }
     .fa-cart-plus{
       &:hover{
         background-color: rgba($color: #ae0000, $alpha: 0.7);
         color: white
       }
     }
</style>
