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
                <router-link :to="{name:'checkout'}" class="h2 text-muted dataEffect">結帳資料</router-link>
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
                                <th width='90'>刪除</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cartList" :key="item.id">
                                <td class="align-middle"><img :src="item.product.imageUrl" class="imgSize mr-3">{{item.product.title}}</td>
                                <td class="text-right align-middle">NT{{item.product.price | currency}}<br><span class="text-success" v-if="carts.total !== carts.final_total">已套用優惠卷</span></td>
                                <td class="align-middle">{{item.qty}}/{{item.product.unit}}</td>
                                <td class="text-right align-middle" v-if="carts.total !== carts.final_total"><s><span class="text-muted">NT{{item.total | currency}}</span></s><br><span class="text-success">NT{{item.final_total | currency}}</span></td>
                                <td class="text-right align-middle" v-if="carts.total === carts.final_total">NT{{item.total | currency}}</td>
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
                                    <th class="text-right">NT{{carts.total | currency}}</th>
                                </tr>
                                <tr class="border-bottom" v-if="carts.total !== carts.final_total">
                                    <th>折扣價</th>
                                    <th class="text-right text-success">NT{{carts.final_total | currency}}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <router-link :to="{name:'checkout'}" class="btn btn-block btn-secondary">前 往 結 帳</router-link>
                    <div class="mt-3 borderCustomized pb-2">
                        <div class="form-group">
                            <label for="coupon"><i class="fas fa-ticket-alt text-secondary mr-2"></i>優惠卷</label>
                            <input type="text" class="form-control" id="coupon" placeholder="輸入優惠卷代碼" v-model="couponCode">
                        </div>
                    </div>
                    <button class="btn btn-block btn-primary mt-3 mb-3 mb-md-0" @click="useCoupon">套 用 優 惠 卷</button>
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
      carts: [],
      isLoading: false,
      couponCode: ''
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        vm.cartList = response.data.data.carts
        vm.carts = response.data.data
        console.log(vm.cartList)
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
    useCoupon () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
      const vm = this
      vm.isLoading = true
      this.$http.post(api, {data: {code: vm.couponCode}}).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          this.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
        vm.getCart()
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
          text-decoration: none
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
