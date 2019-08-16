<template>
  <div class="bg-light">
    <Navbar/>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './AdminNavbar'
export default {
  name: 'DashBoard',
  components: {
    Navbar
  }
}
</script>
