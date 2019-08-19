<template>
   <div :class="{'vh-100':products.length<8}">
      <loading :active.sync="isLoading" :is-full-page="true">
        <template slot="before"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
        <template slot="default">
          <i class="fas fa-chess-knight fa-3x text-primary mb-3 mx-2"></i>
        </template>
        <template slot="after"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
      </loading>
       <div class="d-flex">
           <button class="btn btn-dark mt-2 ml-auto" @click.prevent="openModel(true)">新增新商品<i class="fas fa-plus ml-2"></i></button>
       </div>
       <div class="table-responsive">
        <table class="table mt-3">
            <thead class="thead-light">
                <tr>
                <th>分類</th>
                <th>商品</th>
                <th width="160">原價</th>
                <th width="160">售價</th>
                <th width="140">是否啟用</th>
                <th width="120">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in products" :key="item.id">
                <td>{{item.category}}</td>
                <td>{{item.title}}</td>
                <td class="text-right">{{item.origin_price | currency}}</td>
                <td class="text-right">{{item.price | currency}}</td>
                <td class="text-muted" v-if="!item.is_enabled">未啟用</td>
                <td class="text-success" v-if="item.is_enabled">已啟用</td>
                <td><button class="btn btn-dark btn-sm" @click="openModel(false, item)">編輯</button>
                <button class="btn btn-danger btn-sm" @click="opendelModel(item)">刪除</button>
                </td>
                </tr>
            </tbody>
        </table>
       </div>
        <!-- 新增商品Modal -->
        <div class="modal fade bd-example-modal-lg" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header bg-dark">
                <h5 class="modal-title text-white" id="productModalLabel">新增商品</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="text-white">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 mb-2">
                            <input type="file" class="mb-3" @change="uploadImg" ref="files">
                            <label for="imageRouter">圖片網址</label>
                            <input type="text" id="imageRouter" v-model="tempProduct.imageUrl">
                             <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.uploadingImg"></i>
                            <img :src="tempProduct.imageUrl" class="mt-3 img-fluid">
                        </div>
                        <div class="col-md-6">
                            <form>
                                <div class="form-group">
                                    <label for="productName">商品名稱</label>
                                    <input type="text" class="form-control" id="productName" placeholder="請輸入產品名稱" v-model="tempProduct.title">
                                </div>
                                <div class="form-group row">
                                    <div class="col-6">
                                        <label for="category">分類</label>
                                        <input type="text" class="form-control" id="category" placeholder="請輸入產品分類" v-model="tempProduct.category">
                                    </div>
                                    <div class="col-6">
                                        <label for="unit">單位</label>
                                        <input type="text" class="form-control" id="unit" placeholder="請輸入產品單位" v-model="tempProduct.unit">
                                    </div>
                                </div>
                               <div class="form-group row">
                                    <div class="col-6">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">原價</span>
                                            </div>
                                            <input type="number" class="form-control" v-model="tempProduct.origin_price">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">售價</span>
                                            </div>
                                            <input type="number" class="form-control" v-model="tempProduct.price">
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div class="form-group">
                                    <label for="describe">商品敘述</label>
                                    <textarea name="describe" id="describe" type="text" class="form-control" placeholder="請輸入產品敘述" v-model="tempProduct.description"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">商品說明內容</label>
                                    <textarea name="content" id="content" type="text" class="form-control" placeholder="請輸入產品內容" v-model="tempProduct.content"></textarea>
                                </div>
                            </form>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                                <label class="form-check-label" for="enabled">
                                    是否啟用
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-dark" @click="updateProduct">確定</button>
            </div>
            </div>
        </div>
        </div>
        <!-- 刪除商品Model -->
        <div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="delModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h5 class="modal-title text-white" id="delModalLabel">刪除商品</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <span class="text-danger">刪除的商品將無法復原，確定刪除？</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-dark" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="delProduct">確認</button>
                </div>
                </div>
            </div>
        </div>
        <!-- 頁碼標示 -->
        <Pagination :getPagination="pagination" @changePage = 'getProduct'></Pagination>
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
      tempProduct: {},
      products: [],
      isLoading: false,
      pagination: {},
      isNew: '',
      loadingStatus: {
        uploadingImg: false
      }
    }
  },
  methods: {
    updateProduct () {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
      let vm = this
      let apiMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        apiMethod = 'put'
      }
      this.$http[apiMethod](api, {data: vm.tempProduct}).then((response) => {
        $('#productModal').modal('hide')
        vm.getProduct()
      })
    },
    getProduct (page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        vm.products = response.data.products
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    },
    delProduct () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      this.$http.delete(api).then((response) => {
        $('#delModal').modal('hide')
      })
      vm.updateProduct()
    },
    uploadImg () {
      const uploadFile = this.$refs.files.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadFile)
      const vm = this
      vm.loadingStatus.uploadingImg = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
      this.$http.post(api, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then((response) => {
        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          vm.loadingStatus.uploadingImg = false
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
          vm.loadingStatus.uploadingImg = false
        }
      })
    },
    openModel (isNew, item) {
      const vm = this
      $('#productModal').modal('show')
      if (isNew) {
        vm.tempProduct = {}
        vm.isNew = true
      } else {
        vm.tempProduct = Object.assign({}, item)
        vm.isNew = false
      }
    },
    opendelModel (item) {
      $('#delModal').modal('show')
      const vm = this
      vm.tempProduct = Object.assign({}, item)
    }
  },
  created () {
    this.getProduct()
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
</style>
