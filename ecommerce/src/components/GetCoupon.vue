<template>
  <div class="pageBg">
    <div class="container min-vh-100 d-flex justify-content-center align-items-center">
      <div class="questionBg p-3">
        <p class="h1 text-secondary text-center">回答問題拿優惠卷 ! !</p>
        <div class="d-flex justify-content-center">
            <form class="mt-4">
                <div class="form-group">
                  <p class="text-primary">Q1 是否喜歡思考？</p>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="question1Yes" name="customRadioInline1" class="custom-control-input" v-model="Q1" value="1">
                    <label class="custom-control-label" for="question1Yes">是</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="question1No" name="customRadioInline1" class="custom-control-input" v-model="Q1" value="0">
                    <label class="custom-control-label" for="question1No">否</label>
                  </div>
                </div>
                <div class="form-group">
                  <p class="text-primary">Q2 對故事有興趣？</p>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="question2Yes" name="customRadioInline2" class="custom-control-input" v-model="Q2" value="1">
                    <label class="custom-control-label" for="question2Yes">是</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="question2No" name="customRadioInline2" class="custom-control-input" v-model="Q2" value="0">
                    <label class="custom-control-label" for="question2No">否</label>
                  </div>
                </div>
                <div class="form-group">
                  <p class="text-primary">Q3 喜歡和朋友打嘴砲？</p>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="question3Yes" name="customRadioInline3" class="custom-control-input" v-model="Q3" value="1">
                    <label class="custom-control-label" for="question3Yes">是</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="question3No" name="customRadioInline3" class="custom-control-input" v-model="Q3" value="0">
                    <label class="custom-control-label" for="question3No">否</label>
                  </div>
                </div>
                <div class="form-group">
                  <p class="text-primary">Q4 玩桌遊目的是聯絡感情？</p>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="question4Yes" name="customRadioInline4" class="custom-control-input" v-model="Q4" value="1">
                    <label class="custom-control-label" for="question4Yes">是</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="question4No" name="customRadioInline4" class="custom-control-input" v-model="Q4" value="0">
                    <label class="custom-control-label" for="question4No">否</label>
                  </div>
                </div>
                <button class="btn btn-outline-primary" @click.prevent="customizedCoupon">確認送出</button>
            </form>
        </div>
      </div>
    </div>
    <!-- 獲得coupon視窗 -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="couponModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="couponModalLabel">恭喜獲得優惠卷!!!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body text-center">
               <h4 class="text-secondary">{{tempCoupon.title}}</h4>
               <p class="text-secondary">優惠卷代碼：{{tempCoupon.code}}</p>
               <p class="text-secondary">使用期限：{{tempCoupon.due_date}}</p>
               <p class="text-secondary">優惠卷折扣：{{tempCoupon.percent}} %</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">確認</button>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      Q1: '',
      Q2: '',
      Q3: '',
      Q4: '',
      coupons: [],
      tempCoupon: []
    }
  },
  methods: {
    getCoupons (page = 1) {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`
      this.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons
      })
    },
    customizedCoupon () {
      const vm = this
      if (parseInt(vm.Q1) + parseInt(vm.Q2) + parseInt(vm.Q3) + parseInt(vm.Q4) < 3) {
        vm.tempCoupon = vm.coupons.filter((item) => {
          return item.percent < 80
        })
        vm.tempCoupon = vm.tempCoupon.shift()
        $('#couponModal').modal('show')
        this.$bus.$emit('coupon:get', vm.tempCoupon.title, vm.tempCoupon.code)
      } else if (parseInt(vm.Q1) + parseInt(vm.Q2) + parseInt(vm.Q3) + parseInt(vm.Q4) >= 3) {
        vm.tempCoupon = vm.coupons.filter((item) => {
          return item.percent >= 80
        })
        vm.tempCoupon = vm.tempCoupon.shift()
        $('#couponModal').modal('show')
        this.$bus.$emit('coupon:get', vm.tempCoupon.title, vm.tempCoupon.code)
      } else if (vm.Q1 === '' || vm.Q2 === '' || vm.Q3 === '' || vm.Q4 === '') {
        alert('請填寫完整喔~')
      }
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
    .container{
        padding-top: 80px;
    }
    .pageBg{
        background-image: url('https://i.imgur.com/XERF5Pa.jpg');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover
    }
    .questionBg{
        background-color: rgba($color: #DCDCDC, $alpha: 0.8)
    }
</style>
