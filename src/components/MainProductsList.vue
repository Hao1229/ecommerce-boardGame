<template>
    <div>
          <!-- 卡片產品列表麼模板 -->
            <div class="row">
              <div class="col-md-4 col-6 mb-3" v-for="item in newProducts" :key="item.id">
                <div class="card border-primary">
                  <img class="card-img-top" :src="item.imageUrl">
                  <div class="card-body">
                    <a href="#" class="card-title h5" @click.prevent="productDetail(item.id)">{{item.title}}</a>
                    <p class="card-text text-truncate">{{item.description}}</p>
                    <p class="d-lg-flex justify-content-between"><s><span class="text-muted mr-2">NT{{item.origin_price | currency}}</span></s><br><span class="h5 text-primary">NT{{item.price | currency}}</span></p>
                    <div class="d-lg-flex">
                      <div class="d-flex">
                        <div>
                          <button class="addtoCart border rounded-circle border-primary m-0" @click="addtoCart(item.id)" :disabled="buttonStatus.isAdd"><i class="fas fa-cart-plus"></i></button>
                        </div>
                        <div class="ml-2 mt-1" v-if="status.loadingItem === item.id"><i class="fas fa-cog fa-spin"></i></div>
                      </div>
                      <a href="#" class="ml-auto" @click.prevent="productDetail(item.id)">more..</a>
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
      status: {
        loadingItem: ''
      },
      buttonStatus: {
        isAdd: false
      }
    }
  },
  methods: {
    addtoCart (id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      vm.buttonStatus.isAdd = true
      const product = {
        'product_id': id,
        'qty': '1'
      }
      vm.status.loadingItem = id
      this.$http.post(api, {data: product}).then((response) => {
        vm.$bus.$emit('update:cart')
        vm.status.loadingItem = ''
        vm.buttonStatus.isAdd = false
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
     .addtoCart{
       background-color: transparent;
       outline: none;
       width: 35px;
       height: 35px;
       display: flex;
       justify-content: center;
       margin: 0;
     }
</style>
