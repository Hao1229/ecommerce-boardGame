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
                <router-link :to="{name:'cart'}" class="h2 text-muted cartEffect">購物車列表</router-link>
                <span class="h4 mx-3 text-muted"><i class="fas fa-chevron-right"></i></span>
                <span class="h2 text-secondary">結帳資料</span>
                <span class="h4 mx-3 text-muted"><i class="fas fa-chevron-right"></i></span>
                <span class="h2 text-muted">結帳確認</span>
            </div>
             <div class="text-center pt-5 d-block d-md-none">
                <span class="h2 text-secondary">結帳資料</span>
            </div>
            <div class="row mt-5">
                <div class="col-md-7">
                    <p class="h5 tipBorder pb-3 text-danger">若要使用優惠卷，請先到購物車列表輸入您的優惠卷代碼喔!!</p>
                    <form class="mt-3">
                        <span class="h3">訂購者資訊</span>
                        <div class="form-group mt-3">
                            <label for="username">姓名</label><abbr title="必填欄位">*</abbr>
                            <input type="text" class="form-control" id="username" placeholder="請輸入您的姓名" name="name" v-validate="'required'" :class="{'is-invalid':errors.has('name')}" v-model="user.name">
                            <span class="text-danger" v-if="errors.has('name')">請輸入您的大名</span>
                        </div>
                        <div class="form-group mt-3">
                            <label for="useremail">電子信箱</label><abbr title="必填欄位">*</abbr>
                            <input type="email" class="form-control" id="useremail" placeholder="請輸入您的Email" name="email" v-validate="'required|email'" :class="{'is-invalid':errors.has('email')}" v-model="user.email">
                            <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
                        </div>
                        <div class="form-group">
                            <label for="userphone">連絡電話</label><abbr title="必填欄位">*</abbr>
                            <input type="tel" class="form-control" id="userphone" placeholder="請輸入您的連絡電話" name="phone" v-validate="'required'" :class="{'is-invalid':errors.has('phone')}" v-model="user.tel">
                            <span class="text-danger" v-if="errors.has('phone')">請輸入您的連絡電話</span>
                        </div>
                        <div class="form-group">
                            <label for="useraddress">寄送地址</label><abbr title="必填欄位">*</abbr>
                            <input type="text" class="form-control" id="useraddress" placeholder="請輸入收件地址" name="address" v-validate="'required'" :class="{'is-invalid':errors.has('address')}" v-model="user.address">
                            <span class="text-danger" v-if="errors.has('address')">請輸入您的收件地址</span>
                        </div>
                        <div class="form-group">
                            <label for="message">訂單備註</label>
                            <textarea class="form-control" id="message" rows="3" v-model="message"></textarea>
                        </div>
                    </form>
                </div>
                <div class="col-md-5 pb-3 pb-md-0">
                    <div class="datasureBorder p-3">
                        <p class="h4">訂單資訊<span class="h5 text-success ml-3" v-if="carts.final_total !== carts.total">已套用優惠卷</span></p>
                        <table class="table table-borderless mt-2">
                            <thead>
                                <tr class="tipBorder">
                                <th>商品</th>
                                <th>總計</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cartList" :key="item.id" class="border-bottom">
                                    <td>{{item.product.title}} x {{item.qty}}</td>
                                    <th class="text-right">NT{{item.final_total | currency}}</th>
                                </tr>
                                <tr class="border-bottom">
                                    <th>運送方式</th>
                                    <td class="text-right">
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
                                    </td>
                                </tr>
                                <tr>
                                    <th>總計</th>
                                    <th class="text-right">NT{{carts.final_total | currency}}</th>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn btn-block btn-outline-secondary" @click="finishOrder">資 料 確 認</button>
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
      user: {},
      message: '',
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
        vm.carts = response.data.data
        vm.isLoading = false
      })
    },
    finishOrder () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
      const vm = this
      vm.isLoading = true
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.$http.post(api, {data: {user: vm.user, message: vm.message}}).then((response) => {
            vm.isLoading = false
            vm.getCart()
            this.$bus.$emit('update:cart')
            if (response.data.success) {
              vm.$router.push(`/main/checkoutorder/${response.data.orderId}`)
            }
          })
        } else {
          alert('請將資料填寫完整喔~')
          vm.isLoading = false
        }
      })
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
    .cartEffect {
      &:hover{
          color: #D2691E !important;
          cursor: pointer;
          text-decoration: none
      }
   }
   .tipBorder{
       border-bottom: solid 3px rgba($color: #DCDCDC, $alpha: 0.8)
   }
   .datasureBorder{
       border: solid 3px #D2691E
   }
</style>
