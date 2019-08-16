<template>
   <div>
      <loading :active.sync="isLoading" :is-full-page="true">
        <template slot="before"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
        <template slot="default">
          <i class="fas fa-chess-knight fa-3x text-primary mb-3 mx-2"></i>
        </template>
        <template slot="after"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
      </loading>
       <div class="d-flex">
           <button class="btn btn-dark mt-2 ml-auto" @click.prevent="openModel">新增新產品<i class="fas fa-plus ml-2"></i></button>
       </div>
       <div class="table-responsive">
        <table class="table mt-3">
            <thead class="thead-light">
                <tr>
                <th>分類</th>
                <th>產品</th>
                <th>原價</th>
                <th>售價</th>
                <th>是否啟用</th>
                <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Mark</td>
                <td>Mark</td>
                <td>Mark</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
            </tbody>
        </table>
       </div>
        <!-- 新增產品Modal -->
        <div class="modal fade bd-example-modal-lg" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header bg-dark">
                <h5 class="modal-title text-white" id="productModalLabel">新增產品</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="text-white">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 mb-2">
                            <input type="file">
                        </div>
                        <div class="col-md-6">
                            <form>
                                <div class="form-group">
                                    <label for="productName">產品名稱</label>
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
                                    <label for="describe">產品敘述</label>
                                    <textarea name="describe" id="describe" type="text" class="form-control" placeholder="請輸入產品敘述" v-model="tempProduct.description"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">產品說明內容</label>
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
   </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      tempProduct: {},
      isLoading: false
    }
  },
  methods: {
    updateProduct () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
      const vm = this
      this.$http.post(api, {data: vm.tempProduct}).then((response) => {
        console.log(response.data)
        $('#productModal').modal('hide')
      })
    },
    openModel () {
      $('#productModal').modal('show')
    }
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
</style>
