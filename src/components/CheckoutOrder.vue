<template>
    <div class="container min-vh-100">
        <section>
            <div class="text-center pt-5 d-none d-md-block">
                <span class="h2 text-muted">購物車列表</span>
                <span class="h4 mx-3 text-muted"><i class="fas fa-chevron-right"></i></span>
                <span class="h2 text-muted">結帳資料</span>
                <span class="h4 mx-3 text-muted"><i class="fas fa-chevron-right"></i></span>
                <span class="h2 text-secondary">結帳確認</span>
            </div>
            <div class="text-center pt-5 d-block d-md-none">
                <span class="h2 text-secondary">結帳確認</span>
            </div>
            <div class="row mt-4">
                <div class="col-lg-7 mt-3 mt-lg-0">
                    <p class="h3">訂單確認</p>
                    <form @submit.prevent="payOrder">
                        <table class="table table-borderless">
                            <thead class="tableBorder">
                                <th>商品</th>
                                <th>總計</th>
                            </thead>
                            <tbody>
                                <tr v-for="item in order.products" :key="item.id" class="border-bottom">
                                    <td>{{item.product.title}} x {{item.qty}}</td>
                                    <th class="text-right">NT{{item.final_total | currency}}</th>
                                </tr>
                                <tr class="border-bottom">
                                    <td>總計</td>
                                    <th class="text-right">NT{{order.total | currency}}</th>
                                </tr>
                            </tbody>
                        </table>
                        <div class="w-100 text-right">
                            <button type="submit" class="btn btn-secondary">確認付款</button>
                        </div>
                    </form>
                </div>
                <div class="col-lg-5 my-3 my-lg-0" v-if="order.is_paid">
                    <div class="border border-success p-3">
                        <p class="text-success h2">付款成功，謝謝您的購買</p>
                        <ul class="mt-3">
                            <li class="mb-3">購買日期：{{order.create_at | date}}</li>
                            <li class="mb-3">付款金額：NT{{order.total | currency}}</li>
                            <li class="mb-3">訂單編號：{{order.id}}</li>
                        </ul>
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
      orderId: '',
      order: []
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`
      vm.$bus.$emit('loading: push', 'start')
      this.$http.get(api).then((response) => {
        vm.order = response.data.order
        vm.$bus.$emit('loading: push', 'stop')
      })
    },
    payOrder () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`
      vm.$bus.$emit('loading: push', 'start')
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.getOrder()
          this.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          this.$bus.$emit('message:push', '付款失敗', 'danger')
          vm.$bus.$emit('loading: push', 'stop')
        }
      })
    }
  },
  created () {
    const vm = this
    vm.orderId = this.$route.params.orderId
    vm.getOrder()
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
    .container{
      padding-top: 70px;
    }
    .tableBorder{
      border-bottom: solid 3px rgba($color: #DCDCDC, $alpha: 0.8)
    }
</style>
