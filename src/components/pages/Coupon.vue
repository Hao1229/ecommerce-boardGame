<template>
   <div class="min-vh-100">
       <div class="d-flex">
           <button class="btn btn-dark mt-2 ml-auto" @click="openModal(true)">新增優惠卷<i class="fas fa-plus ml-2"></i></button>
       </div>
       <div class="table-responsive">
        <table class="table mt-3">
            <thead class="thead-light">
                <tr>
                <th>優惠卷名稱</th>
                <th>折扣百分比</th>
                <th>到期日</th>
                <th>是否啟用</th>
                <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in coupons" :key="item.id">
                <td>{{item.title}}</td>
                <td>{{item.percent}} %</td>
                <td v-if="item.is_enabled">{{item.due_date}}</td>
                <td v-if="!item.is_enabled">{{item.due_date = '2019-01-01'}}</td>
                <td class="text-muted" v-if="!item.is_enabled">未啟用</td>
                <td class="text-success" v-if="item.is_enabled">已啟用</td>
                <td><button class="btn btn-dark btn-sm" @click="openModal(false, item)">編輯</button>
                <button class="btn btn-danger btn-sm" @click="opendelModal(item)">刪除</button>
                </td>
                </tr>
            </tbody>
        </table>
       </div>
       <!-- 新增優惠卷modal -->
       <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="couponModalTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="couponModalTitle">新增優惠卷</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="from-group">
                  <label for="couponTitle">優惠卷名稱</label>
                  <input type="text" id="couponTitle" class="form-control" v-model="tempCoupon.title">
                </div>
                <div class="from-group mt-2">
                  <label for="couponDiscount">折扣百分比</label>
                  <input type="number" id="couponDiscount" class="form-control" v-model="tempCoupon.percent">
                </div>
                 <div class="from-group mt-2">
                  <label for="couponDeadline">到期日</label>
                  <input type="date" id="couponDeadline" class="form-control" v-model="tempCoupon.due_date" :disabled='!tempCoupon.is_enabled'>
                </div>
                <div class="from-group mt-2">
                  <label for="couponCode">優惠卷代碼</label>
                  <input type="text" id="couponCode" class="form-control" v-model="tempCoupon.code">
                </div>
                <div class="form-check mt-3">
                  <input class="form-check-input" type="checkbox" value="" id="enabled" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0">
                  <label class="form-check-label" for="enabled">是否啟用</label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-dark" @click="createCoupons">確定</button>
            </div>
            </div>
        </div>
        </div>
          <!-- 刪除優惠卷Model -->
        <div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="delModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h5 class="modal-title text-white" id="delModalLabel">刪除優惠卷</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <span class="text-danger">刪除的優惠卷將無法復原，確定刪除？</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-dark" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="removeCoupons">確認</button>
                </div>
                </div>
            </div>
        </div>
        <!-- 頁碼標示 -->
        <Pagination :getPagination="pagination" @changePage = 'getCoupons'></Pagination>
      </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      coupons: [],
      isNew: '',
      tempCoupon: {},
      pagination: {}
    }
  },
  methods: {
    openModal (isNew, item) {
      const vm = this
      $('#couponModal').modal('show')
      if (isNew) {
        vm.isNew = true
        vm.tempCoupon = {}
      } else {
        vm.isNew = false
        vm.tempCoupon = Object.assign({}, item)
      }
    },
    getCoupons (page = 1) {
      const vm = this
      vm.$bus.$emit('loading: push', 'start')
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`
      this.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
        vm.$bus.$emit('loading: push', 'stop')
      })
    },
    createCoupons () {
      const vm = this
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`
      let apiMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        apiMethod = 'put'
      }
      this.$http[apiMethod](api, {data: vm.tempCoupon}).then((response) => {
        vm.getCoupons()
        $('#couponModal').modal('hide')
      })
    },
    removeCoupons () {
      const vm = this
      vm.$bus.$emit('loading: push', 'start')
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      this.$http.delete(api).then((response) => {
        vm.getCoupons()
        $('#delModal').modal('hide')
      })
    },
    opendelModal (item) {
      const vm = this
      vm.tempCoupon = Object.assign({}, item)
      $('#delModal').modal('show')
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>

<style lang="scss" scoped>
@import url("@fortawesome/fontawesome-free/css/all.css");
</style>
