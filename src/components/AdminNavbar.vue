<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <router-link class="navbar-brand" to="/main"><i class="fas fa-chess-knight mr-2"></i>桌迷藏</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link class="nav-link" active-class="active" to="/admin/home">後台首頁</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" active-class="active" to="/admin/products">產品</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" active-class="active" to="/admin/orders">訂單</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" to="/admin/coupons">優惠卷</router-link>
                </li>
                </ul>
                <button class="btn btn-light ml-auto" @click="signoutAdmin">登出</button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'AdminNavbar',
  data () {
    return {}
  },
  methods: {
    signoutAdmin () {
      const api = `${process.env.APIPATH}/logout`
      const vm = this
      vm.$bus.$emit('loading: push', 'start')
      this.$http.post(api).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          this.$router.push('/login')
          vm.$bus.$emit('loading: push', 'stop')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
</style>
