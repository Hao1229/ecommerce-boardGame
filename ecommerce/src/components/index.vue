<template>
  <div class="vh-100">
      <carousel></carousel>
      <indexfooter></indexfooter>
  </div>
</template>

<script>
import indexfooter from './indexFooter'
import carousel from './swiper'
export default {
  name: 'index',
  components: {
    carousel,
    indexfooter
  }
}
</script>
