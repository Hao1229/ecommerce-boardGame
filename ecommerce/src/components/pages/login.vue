<template>
<div class=" bgSet vh-100">
     <loading :active.sync="isLoading" :is-full-page="true">
        <template slot="before"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
        <template slot="default">
          <i class="fas fa-chess-knight fa-3x text-primary mb-3 mx-2"></i>
        </template>
        <template slot="after"><i class="fas fa-cog fa-spin fa-3x text-primary"></i></template>
    </loading>
     <div class="text-center">
        <form class="form-signin" @submit.prevent="loginAdmin">
          <h1 class="h3 mb-3 font-weight-bold text-primary">後 台 登 入</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="user.username">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required  v-model="user.password">
          <button class="btn btn-lg btn-primary btn-block mt-4" type="submit">登入</button>
        </form>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    loginAdmin () {
      const api = `${process.env.APIPATH}/admin/signin`
      const vm = this
      vm.isLoading = true
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          this.$router.push('/admin')
        } else {
          alert('登入資料有誤')
        }
        vm.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("@fortawesome/fontawesome-free/css/all.css");
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  background-color: rgba($color: white, $alpha: 0.7)
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.bgSet{
    background-image: url('https://i.imgur.com/BvYpvmP.jpg');
    padding-top: 150px;
}
</style>
