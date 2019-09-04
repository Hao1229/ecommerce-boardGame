<template>
    <div class="container min-vh-100">
       <loading :active.sync="isLoading" :is-full-page="true">
        <template slot="before"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
        <template slot="default">
          <i class="fas fa-chess-knight fa-3x text-primary mb-3 mx-2"></i>
        </template>
        <template slot="after"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
       </loading>
      <div class="row">
          <div class="col-md-3">
            <div class="text-center mb-3 mb-md-0" style="position:sticky;top:80px;">
              <span class="h4 d-none d-md-inline">遊戲分類</span>
              <div class="list-group list-group-flush mt-md-3 mt-0">
                <a href="#" class="list-group-item list-group-item-action list-group-item-light" :class="{'active':activeItem.active === '全部遊戲'}" @click.prevent="changeCategory('全部遊戲')">全部遊戲</a>
                <a href="#" class="list-group-item list-group-item-action list-group-item-light" :class="{'active':activeItem.active === '派對遊戲'}" @click.prevent="changeCategory('派對遊戲')">派對遊戲</a>
                <a href="#" class="list-group-item list-group-item-action list-group-item-light" :class="{'active':activeItem.active === '策略遊戲'}" @click.prevent="changeCategory('策略遊戲')">策略遊戲</a>
                <a href="#" class="list-group-item list-group-item-action list-group-item-light" :class="{'active':activeItem.active === '家庭遊戲'}" @click.prevent="changeCategory('家庭遊戲')">家庭遊戲</a>
                <a href="#" class="list-group-item list-group-item-action list-group-item-light" :class="{'active':activeItem.active === '主題遊戲'}" @click.prevent="changeCategory('主題遊戲')">主題遊戲</a>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="text-center mb-3">
              <span class="h4 d-inline text-secondary">{{nowCategoryTilte}}</span>
            </div>
            <ProductList :getProducts="nowCategory"></ProductList>
          </div>
      </div>
    </div>
</template>

<script>
import ProductList from './MainProductsList'
export default {
  components: {
    ProductList
  },
  data () {
    return {
      allProducts: [],
      nowCategory: [],
      nowCategoryTilte: '',
      isLoading: false,
      activeItem: {
        active: ''
      }
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        vm.allProducts = response.data.products
        vm.nowCategory = vm.allProducts
        vm.nowCategoryTilte = '全部遊戲'
        vm.activeItem.active = '全部遊戲'
        vm.isLoading = false
      })
    },
    changeCategory (category) {
      const vm = this
      vm.nowCategoryTilte = category
      if (category === '全部遊戲') {
        vm.nowCategory = vm.allProducts
        vm.activeItem.active = '全部遊戲'
      } else if (category !== '全部遊戲') {
        vm.nowCategory = vm.allProducts.filter((item) => {
          return item.category === category
        })
        vm.activeItem.active = category
      }
    }
  },
  created () {
    const vm = this
    vm.getProducts()
  }
}
</script>

<style lang="scss" scoped>
     @import url("@fortawesome/fontawesome-free/css/all.css");
     .container{
         padding-top: 70px;
     }
     .pointer{
         &:hover{
             cursor: pointer;
         }
     }
</style>
