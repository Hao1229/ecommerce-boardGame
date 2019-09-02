<template>
  <div class="vh-100">
      <carousel></carousel>
      <IndexFooter></IndexFooter>
  </div>
</template>

<script>
import IndexFooter from './IndexFooter'
import carousel from './Swiper'
export default {
  name: 'index',
  components: {
    carousel,
    IndexFooter
  }
}
</script>
