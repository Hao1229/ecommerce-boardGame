<template>
    <div class="min-vh-100">
         <h3 class="font-weight-bold my-3">OVERVIEW</h3>
        <div class="row">
            <div class="col-md-4">
                <div class="bg-white overviewBg text-center text-nowrap mb-3 py-3">
                  <h4><i class="fas fa-hand-holding-usd mr-2"></i>總收入</h4>
                  <span class="text-success h3 font-weight-bold">54,540</span>
                </div>
            </div>
            <div class="col-md-4">
                <div class="bg-white overviewBg text-center text-nowrap mb-3 py-3">
                  <h4><i class="fas fa-boxes mr-2"></i>總成本</h4>
                  <span class="text-primary h3 font-weight-bold">12,660</span>
                </div>
            </div>
            <div class="col-md-4">
                <div class="bg-white overviewBg text-center text-nowrap mb-3 py-3">
                  <h4><i class="fas fa-money-bill mr-2"></i>淨收入</h4>
                  <span class="text-info h3 font-weight-bold">41,880</span>
                </div>
            </div>
        </div>
        <div>
            <Chart class="bg-white overviewBg py-3"></Chart>
        </div>
        <div class="row mt-3 pb-3">
            <div class="col-md-6">
                <div class="overviewBg bg-white p-4 h-100">
                    <p class="h3 font-weight-bold">未來活動</p>
                    <ul class="liststyleNone p-0 m-0">
                        <li class="border-bottom d-flex justify-content-between align-items-center mt-5"><span class="h4"><i class="fas fa-moon mr-2"></i>中秋節優惠</span><span class="h4">9/1~9/15</span></li>
                        <li class="border-bottom d-flex justify-content-between align-items-center mt-5"><span class="h4"><i class="fas fa-ghost mr-3"></i>萬聖節優惠</span><span class="h4">10/18~10/31</span></li>
                        <li class="border-bottom d-flex justify-content-between align-items-center mt-5"><span class="h4"><i class="fas fa-drumstick-bite mr-2"></i>感恩節優惠</span><span class="h4">11/18~11/28</span></li>
                        <li class="border-bottom d-flex justify-content-between align-items-center mt-5"><span class="h4"><i class="fas fa-snowflake mr-3"></i>聖誕節優惠</span><span class="h4">12/10~12/25</span></li>
                        <li class="border-bottom d-flex justify-content-between align-items-center mt-5"><span class="h4"><i class="fas fa-glass-cheers mr-2"></i>新年優惠</span><span class="h4">12/29~1/10</span></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-6">
                <div class="overviewBg bg-white p-4 h-100">
                    <p class="h3 font-weight-bold">熱銷商品</p>
                    <ul class="liststyleNone p-0 m-0">
                        <li v-for="item in hotProducts" :key="item.id" class="border-bottom mt-2">
                            <img :src="item.imageUrl" class="imgSize mt-2">
                            <span class="h4 font-weight-bold ml-3">{{item.title}}</span>
                            <div class="text-right mb-2">
                                <span class="h4">NT{{item.price | currency}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from '@/components/AdminChart'
export default {
  components: {
    Chart
  },
  data () {
    return {
      products: [],
      hotProducts: []
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      const vm = this
      vm.$bus.$emit('loading: push', 'start')
      this.$http.get(api).then((response) => {
        vm.products = response.data.products
        vm.hotProducts = vm.products.filter((item, i) => {
          return i < 3
        })
        vm.$bus.$emit('loading: push', 'stop')
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
    .overviewBg{
        box-shadow: 0 0 10px 5px #EBEBEB;
        border-radius: 3px
    }
    .liststyleNone{
        list-style: none;
    }
    .imgSize{
        width: 95px;
        height: 95px
    }
</style>
