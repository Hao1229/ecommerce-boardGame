<template>
  <div class="position-relative h-100">
    <swiper :options="swiperOption" class="h-100">
        <swiper-slide><div class="bgImg1 h-100"></div></swiper-slide>
        <swiper-slide><div class="bgImg2 h-100"></div></swiper-slide>
        <swiper-slide><div class="bgImg3 h-100"></div></swiper-slide>
    </swiper>
    <div class="jumbotron jumbotron-fluid position-absolute jumbotronSet">
      <div class="container">
        <h1 class="display-4 font-weight-bold">桌迷藏</h1>
        <p class="lead">在充滿電子產品的時代，我們渴望讓大家發現
          <span class="text-secondary font-weight-bold">桌遊</span>
          的美好，並為其深深
          <span class="text-secondary font-weight-bold">著迷</span>
          這是多麼難能可貴的
          <span class="text-secondary font-weight-bold">寶藏</span>
          。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        loop: true,
        effect: 'fade'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .bgImg1{
        background-image: url('https://i.imgur.com/Eo93EbF.jpg');
        background-position: center center;
        background-repeat: no-repeat
    }
    .bgImg2{
        background-image: url('https://i.imgur.com/V6gvgud.jpg');
        background-position: center center;
        background-repeat: no-repeat
    }
    .bgImg3{
        background-image: url('https://i.imgur.com/yLet0I9.jpg');
        background-position: center center;
        background-repeat: no-repeat
    }
    .jumbotronSet{
      background-color: rgba($color: #e9ecef, $alpha: 0.7);
      top:125px;
      left:3%;
      z-index: 999;
    }
</style>
