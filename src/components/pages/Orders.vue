<template>
    <div class="min-vh-100">
        <div class="d-flex">
           <div class="dropdown ml-auto mt-2">
                <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    條件篩選
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div class="form-check m-2">
                    <input class="form-check-input" type="radio" name="paidRadios" id="allRadios" value='all' checked v-model="selectOption">
                    <label class="form-check-label" for="allRadios">
                       全部
                    </label>
                  </div>
                  <div class="form-check m-2">
                    <input class="form-check-input" type="radio" name="paidRadios" id="paidRadios" value="paid" v-model="selectOption">
                    <label class="form-check-label text-success" for="paidRadios">
                        已付款
                    </label>
                  </div>
                  <div class="form-check m-2">
                    <input class="form-check-input" type="radio" name="paidRadios" id="unpaidRadios" value="nopaid" v-model="selectOption">
                    <label class="form-check-label text-muted" for="unpaidRadios">
                        未付款
                    </label>
                  </div>
                </div>
            </div>
       </div>
        <div class="table-responsive">
            <table class="table mt-3">
                <thead class="thead-light">
                    <tr>
                    <th width="120">顧客姓名</th>
                    <th>購買產品</th>
                    <th width="130">總金額</th>
                    <th width='110'>購買日期</th>
                    <th width="100">是否付款</th>
                    <th width="100">詳細資料</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in selectOrders" :key="item.id">
                    <td>{{item.user.name}}</td>
                    <td v-for="(product, i) in item.products" :key="i" class="d-flex flex-column">
                        {{product.product.title}} 數量：{{product.qty}} {{product.product.unit}}
                    </td>
                    <td class="text-right">{{item.total | currency}}</td>
                    <td v-if="item.is_paid">{{item.paid_date | date}}</td>
                    <td class="text-muted" v-if="!item.is_paid">未付款</td>
                    <td class="text-muted" v-if="!item.is_paid">未付款</td>
                    <td class="text-success" v-if="item.is_paid">已付款</td>
                    <td><button class="btn btn-dark btn-sm" @click="openModel(item)">資料確認</button></td>
                    </tr>
                </tbody>
            </table>
       </div>
       <!-- 詳細資料 Model -->
       <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="orderModalLabel">顧客詳細資料</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                     <div class="form-group">
                        <label for="buyer">購買人</label>
                        <input type="text" class="form-control" id="buyer" readonly v-model="tempUser.name">
                    </div>
                    <div class="form-group">
                        <label for="address">地址</label>
                        <input type="text" class="form-control" id="address" readonly v-model="tempUser.address">
                    </div>
                    <div class="form-group">
                        <label for="phone">連絡電話</label>
                        <input type="tel" class="form-control" id="phone" readonly v-model="tempUser.tel">
                    </div>
                    <div class="form-group">
                        <label for="mail">電子信箱</label>
                        <input type="email" class="form-control" id="mail" readonly v-model="tempUser.email">
                    </div>
                    <div class="form-group">
                      <label for="message">顧客備註</label>
                      <textarea class="form-control" id="message" rows="3" readonly v-model="tempMessage"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-dark" data-dismiss="modal">確認</button>
                </div>
                </div>
            </div>
        </div>
         <!-- 頁碼標示 -->
        <Pagination :getPagination="pagination" @changePage = 'getOrders'></Pagination>
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
      orders: [],
      tempUser: {},
      tempMessage: '',
      pagination: {},
      selectOption: 'all'
    }
  },
  methods: {
    getOrders (page = 1) {
      const vm = this
      vm.$bus.$emit('loading: push', 'start')
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`
      this.$http.get(api).then((response) => {
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
        vm.$bus.$emit('loading: push', 'stop')
      })
    },
    openModel (item) {
      $('#orderModal').modal('show')
      const vm = this
      vm.tempUser = Object.assign({}, item.user)
      vm.tempMessage = item.message
    }
  },
  created () {
    this.getOrders()
  },
  computed: {
    selectOrders () {
      const vm = this
      if (vm.selectOption === 'all') {
        return vm.orders
      } else if (vm.selectOption === 'paid') {
        return vm.orders.filter((item) => {
          return item.is_paid
        })
      } else if (vm.selectOption === 'nopaid') {
        return vm.orders.filter((item) => {
          return !item.is_paid
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("@fortawesome/fontawesome-free/css/all.css");
</style>
