<template>
     <loading :active.sync="isLoading" :is-full-page="true">
        <template slot="before"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
        <template slot="default">
          <i class="fas fa-chess-knight fa-3x text-primary mb-3 mx-2"></i>
        </template>
        <template slot="after"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
      </loading>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    changeStatus (status) {
      const vm = this
      if (status === 'stop') {
        vm.isLoading = false
      } else if (status === 'start') {
        vm.isLoading = true
      }
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('loading: push', (status = 'stop') => {
      vm.changeStatus(status)
    })
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
</style>
