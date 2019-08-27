<template>
    <div>
        <Navbar></Navbar>
        <router-view></router-view>
        <i class="far fa-arrow-alt-circle-up fa-3x" @click="gotoTop"></i>
        <Footer></Footer>
    </div>
</template>

<script>
import $ from 'jquery'
import Navbar from './MainNavbar'
import Footer from './MainFooter'
$(window).scroll(() => {
  let scrollTop = $(window).scrollTop()
  let windowSize = $(window).height()
  if (scrollTop >= windowSize / 2) {
    $('.fa-arrow-alt-circle-up').addClass('totopShow')
  } else {
    $('.fa-arrow-alt-circle-up').removeClass('totopShow')
  }
})
export default {
  components: {
    Navbar,
    Footer
  },
  methods: {
    gotoTop () {
      $('html, body').animate({
        scrollTop: 0
      }, 800)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
    .fa-arrow-alt-circle-up{
      position: fixed;
      bottom: 20px;
      right: 20px;
      opacity: 0;
      transition: all .8s;
      @media(min-width: 769px){
        &:hover{
        cursor: pointer;
        opacity: 1;
        }
      }
    }
    .totopShow{
      opacity: 0.5
    }
</style>
