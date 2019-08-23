<template>
    <div>
        <Navbar></Navbar>
        <Content></Content>
    </div>
</template>

<script>
import Navbar from './MainNavbar'
import Content from './MainContent'
export default {
  components: {
    Navbar,
    Content
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
</style>
