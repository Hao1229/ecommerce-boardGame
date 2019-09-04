<template>
  <div id="app" class="bg-light">
    <router-view/>
    <Loading></Loading>
  </div>
</template>

<script>
import Loading from './components/Loading'
export default {
  name: 'App',
  components: {
    Loading
  }
}
</script>

<style lang="scss">
@import './assets/all'
</style>
