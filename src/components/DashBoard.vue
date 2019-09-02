<template>
  <div class="bg-light">
    <Navbar/>
    <AlertMessage></AlertMessage>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './AdminNavbar'
import AlertMessage from './AlertMessage'
export default {
  name: 'DashBoard',
  components: {
    Navbar,
    AlertMessage
  }
}
</script>
