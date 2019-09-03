<template>
    <div>
        <loading :active.sync="isLoading" :is-full-page="true">
            <template slot="before"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
            <template slot="default">
            <i class="fas fa-chess-knight fa-3x text-primary mb-3 mx-2"></i>
            </template>
            <template slot="after"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
       </loading>
          <!-- 卡片產品列表麼模板 -->
            <div class="row">
              <div class="col-md-4 col-6 mb-3" v-for="item in newProducts" :key="item.id">
                <div class="card border-primary">
                  <img class="card-img-top" :src="item.imageUrl">
                  <div class="card-body">
                    <a href="#" class="card-title h5" @click.prevent="productDetail(item.id)">{{item.title}}</a>
                    <p class="card-text text-truncate">{{item.description}}</p>
                    <p class="d-lg-flex justify-content-between"><s><span class="text-muted mr-2">NT{{item.origin_price | currency}}</span></s><br><span class="h5 text-primary">NT{{item.price | currency}}</span></p>
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
</template>

<script>
export default {
  props: ['getProducts'],
  data () {
    return {
      isLoading: false,
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
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
      this.$router.push(`/products/${id}`)
    }
  },
  computed: {
    newProducts () {
      return this.getProducts
    }
  }
}
</script>

<style lang="scss" scoped>
     @import url("@fortawesome/fontawesome-free/css/all.css");
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
