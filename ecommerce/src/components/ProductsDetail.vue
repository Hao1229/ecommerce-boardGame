<template>
    <div>
        <loading :active.sync="isLoading" :is-full-page="true">
        <template slot="before"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
        <template slot="default">
          <i class="fas fa-chess-knight fa-3x text-primary mb-3 mx-2"></i>
        </template>
        <template slot="after"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
       </loading>
        <div class="card" style="width: 18rem;">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      productId: '',
      productDetail: [],
      isLoading: false
    }
  },
  methods: {
    getDetail () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`
      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.isLoading = false
      })
    }
  },
  created () {
    this.productId = this.$route.params.Id
    this.getDetail()
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
</style>
