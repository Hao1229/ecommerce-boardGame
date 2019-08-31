<template>
    <div class="container min-vh-100">
         <loading :active.sync="isLoading" :is-full-page="true">
            <template slot="before"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
            <template slot="default">
            <i class="fas fa-chess-knight fa-3x text-primary mb-3 mx-2"></i>
            </template>
            <template slot="after"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
        </loading>
        <section>
            <div class="text-center pt-5 d-none d-md-block">
                <span class="h2 text-secondary">購物車列表</span>
                <span class="h4 mx-3 text-muted"><i class="fas fa-chevron-right"></i></span>
                <span class="h2 text-muted dataEffect">結帳資料</span>
                <span class="h4 mx-3 text-muted"><i class="fas fa-chevron-right"></i></span>
                <span class="h2 text-muted">結帳確認</span>
            </div>
            <div class="text-center pt-5 d-block d-md-none">
                <span class="h2 text-secondary">購物車列表</span>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="table-responsive">
                        <table class="table mt-5">
                            <thead class="thead-light">
                                <tr>
                                <th>商品</th>
                                <th width='130'>價格</th>
                                <th width='180'>數量</th>
                                <th width='100'>總計</th>
                                <th width='80'>刪除</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cartList" :key="item.id">
                                <td class="align-middle"><img :src="item.product.imageUrl" class="imgSize mr-3">{{item.product.title}}</td>
                                <td class="text-right align-middle">NT{{item.product.price | currency}}</td>
                                <td class="align-middle">{{item.qty}}/{{item.product.unit}}</td>
                                <td class="text-right align-middle">NT{{item.final_total | currency}}</td>
                                <td class="text-center align-middle"><i class="fas fa-trash-alt pointer" @click="removeCart(item.id)"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <span class="h3 backshop" @click="backShop"><i class="fas fa-hand-point-left mr-2"></i>繼續選購</span>
                </div>
                <div class="col-md-4">
                    <div>
                        <table class="table mt-5">
                            <thead class="thead-light">
                                <tr>
                                <th>購物車總計</th>
                                </tr>
                            </thead>
                        </table>
                        <table class="table table-borderless">
                            <tbody>
                                <tr class="border-bottom">
                                <th class="align-middle">運送方式</th>
                                <th class="text-right">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="delivery" id="homeDelivery" checked>
                                        <label class="form-check-label" for="homeDelivery">
                                            宅配
                                        </label>
                                        </div>
                                        <div class="form-check">
                                        <input class="form-check-input" type="radio" name="delivery" id="convenience">
                                        <label class="form-check-label" for="convenience">
                                            超商取貨
                                        </label>
                                        </div>
                                        <div class="form-check">
                                        <input class="form-check-input" type="radio" name="delivery" id="store">
                                        <label class="form-check-label" for="store">
                                            到店自取
                                        </label>
                                    </div>
                                </th>
                                </tr>
                                <tr class="border-bottom">
                                    <th>總計</th>
                                    <th class="text-right">NT{{cartTotal | currency}}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="btn btn-block btn-secondary">前 往 結 帳</button>
                    <div class="mt-3 borderCustomized pb-2">
                        <span><i class="fas fa-ticket-alt text-secondary mr-2"></i>優惠卷</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
      cartList: [],
      cartTotal: '',
      isLoading: false
    }
  },
  methods: {
    getCart () {
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
      vm.isLoading = true
      this.$http.delete(api).then((response) => {
        vm.getCart()
        this.$bus.$emit('update:cart')
        vm.isLoading = false
      })
    },
    backShop () {
      this.$router.push('/main/allproducts')
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
  @import url("@fortawesome/fontawesome-free/css/all.css");
  .container{
      margin-top: 80px;
  }
  .dataEffect {
      &:hover{
          color: #D2691E !important;
          cursor: pointer;
      }
  }
  .imgSize{
      width: 60px;
      height: 60px
  }
  .pointer{
      cursor: pointer;
  }
  .backshop{
      color: rgba($color: brown, $alpha: 0.8);
      &:hover{
        cursor: pointer;
        color: brown
      }
    }
  .borderCustomized{
      border-bottom: solid 3px rgba($color: #DCDCDC, $alpha: 0.8)
  }
</style>
