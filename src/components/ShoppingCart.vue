<template>
    <div class="container min-vh-100 mb-3">
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
                <div class="col-md-8 mb-4">
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
                                <td class="text-center align-middle"><button @click="removeCart(item.id)" :disabled="buttonStatus.isRemove"><i class="fas fa-trash-alt pointer"></i></button></td>
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
                    <div class="mt-3 borderCustomized pt-3">
                        <div class="input-group-sm mb-3 input-group">
                            <input type="text" class="form-control" placeholder="輸入優惠卷代碼" v-model="couponCode">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" @click="useCoupon">套用優惠卷</button>
                            </div>
                        </div>
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
      carts: [],
      couponCode: '',
      buttonStatus: {
        isRemove: false
      }
    }
  },
  methods: {
    getCart (item) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      if (item !== 'noRepeat') {
        vm.$bus.$emit('loading: push', 'start')
      }
      this.$http.get(api).then((response) => {
        vm.cartList = response.data.data.carts
        vm.carts = response.data.data
        this.$bus.$emit('update:cart', 'stop')
      })
    },
    removeCart (id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      const vm = this
      vm.buttonStatus.isRemove = true
      vm.$bus.$emit('loading: push', 'start')
      this.$http.delete(api).then((response) => {
        vm.getCart('noRepeat')
        vm.buttonStatus.isRemove = false
      })
    },
    useCoupon () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
      const vm = this
      vm.$bus.$emit('loading: push', 'start')
      this.$http.post(api, {data: {code: vm.couponCode}}).then((response) => {
        if (response.data.success) {
          this.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
        vm.getCart('noRepeat')
      })
    },
    backShop () {
      this.$router.push('/allproducts')
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
      padding-top: 70px;
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
      border-top: solid 3px rgba($color: #DCDCDC, $alpha: 0.8)
  }
</style>
