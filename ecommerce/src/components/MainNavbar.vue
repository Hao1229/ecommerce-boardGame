<template>
    <div>
      <div class="d-flex justify-content-between align-items-center navbarBg">
          <router-link to="/" class="text-primary navbarIcon ml-3 h3 my-2"><i class="fas fa-chess-knight mr-2"></i>桌迷藏</router-link>
          <div class="mr-4 h4 text-primary d-md-none my-2 hamburger" @click="showOffcanvas"><i class="fas fa-bars"></i></div>
          <ul class="mainNavbar d-md-flex flex-md-row-reverse mr-5 align-items-md-center liststyleNone mb-0">
              <li>
                  <router-link to="/login" class="mainNavbarBtn pt-2 h4"><i class="fas fa-user mr-2"></i>後台登入</router-link>
              </li>
               <li>
                  <a href="#" class="mainNavbarBtn mr-4 pt-2 h4"><i class="fas fa-ticket-alt mr-2"></i>優惠卷<i class="fas fa-angle-down ml-2"></i></a>
              </li>
              <li>
                  <a href="#" class="mainNavbarBtn mr-4 pt-2 h4"><i class="fas fa-shopping-cart mr-2"></i>購物車<i class="fas fa-angle-down ml-2"></i></a>
              </li>
              <li class="position-relative" @mouseleave="producttableHide">
                  <div class="bg-primary productTable d-none">
                      <table class="table table-borderless">
                        <tbody>
                            <tr>
                            <td><a href="#" class="btn btn-light text-nowrap">派對遊戲</a></td>
                            <td><a href="#" class="btn btn-light text-nowrap">策略遊戲</a></td>
                            </tr>
                            <tr>
                            <td><a href="#" class="btn btn-light text-nowrap">家庭遊戲</a></td>
                            <td><a href="#" class="btn btn-light text-nowrap">主題遊戲</a></td>
                            </tr>
                        </tbody>
                      </table>
                  </div>
                  <a href="#" class="mainNavbarBtn mr-4 pt-2 h4" @mouseenter="producttableShow"><i class="fas fa-shopping-bag mr-2"></i>全部商品<i class="fas fa-angle-down ml-2"></i></a>
              </li>
          </ul>
      </div>
      <aside class="side min-vh-100 min-vw-100">
           <i class="fas fa-times-circle cancel text-primary fa-2x" @click="closeOffcanvas"></i>
           <ul class="liststyleNone p-0 m-0 px-2 offcanvas">
              <li class="mt-5 d-flex justify-content-center p-0 m-0">
                  <router-link to="/login" class="mainNavbarBtn pt-2 h3"><i class="fas fa-user mr-2"></i>後台登入</router-link>
              </li>
               <li class="mt-5 d-flex justify-content-center p-0 m-0">
                  <a href="#" class="mainNavbarBtn pt-2 h3"><i class="fas fa-ticket-alt mr-2"></i>優惠卷<i class="fas fa-angle-down ml-2"></i></a>
              </li>
              <li class="mt-5 d-flex justify-content-center p-0 m-0">
                  <a href="#" class="mainNavbarBtn pt-2 h3"><i class="fas fa-shopping-cart mr-2"></i>購物車<i class="fas fa-angle-down ml-2"></i></a>
              </li>
              <li class="my-5 d-flex justify-content-center p-0 m-0">
                  <a href="#" class="mainNavbarBtn pt-2 h3"><i class="fas fa-shopping-bag mr-2"></i>全部商品<i class="fas fa-angle-down ml-2"></i></a>
              </li>
          </ul>
      </aside>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {}
  },
  methods: {
    showOffcanvas () {
      $('.side').addClass('offcanvasShow')
    },
    closeOffcanvas () {
      $('.side').removeClass('offcanvasShow')
    },
    producttableShow () {
      $('.productTable').addClass('d-block')
    },
    producttableHide () {
      $('.productTable').removeClass('d-block')
    }
  }
}
</script>

<style lang="scss" scoped>
    @import url("@fortawesome/fontawesome-free/css/all.css");
    .navbarBg{
        background-color: rgba($color: #DCDCDC, $alpha: 0.8)
    }
    .mainNavbarBtn{
        position: relative;
        color: rgba($color: #ae0000, $alpha: 0.8);
        &::before{
            position: absolute;
            content: '';
            top: 0;
            left: 50%;
            height: 3px;
            background: #ae0000;
            width: 0%;
            transform: translateX(-50%);
            transition: all .3s
        }
        &:hover{
            color: rgba($color: #ae0000, $alpha: 1.0);
            &::before{
            position: absolute;
            content: '';
            top: 0;
            left: 50%;
            height: 3px;
            background: #ae0000;
            width: 100%;
            transform: translateX(-50%);
            transition: all .3s
        }
            text-decoration: none;
        }
        &:active{
            color: rgba($color: #ae0000, $alpha: 1.0);
            &::before{
            position: absolute;
            content: '';
            top: 0;
            left: 50%;
            height: 3px;
            background: #ae0000;
            width: 100%;
            transform: translateX(-50%);
            transition: all .3s
        }
            text-decoration: none;
        }
    }
    .mainNavbar{
        padding: 20px 0 ;
        @media(max-width: 767px){
            display: none
        }
    }
    .offcanvas{
        min-width: 50vw;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba($color: #DCDCDC, $alpha: 0.8);
    }
    .side{
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: rgba($color:#696969, $alpha: 0.7);
        transition: all .3s;
        transform: translateX(-100vw);
        overflow: hidden;
    }
    .offcanvasShow{
        transform: translateX(0);
    }
    .cancel{
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 999;
        &:hover{
            cursor: pointer;
        }
    }
    .navbarIcon{
        text-decoration: none
    }
    .hamburger{
        cursor: pointer;
    }
    .liststyleNone{
        list-style-type: none
    }
    .productTable{
        position: absolute;
        top: 42px;
           &::before{
                content: '';
                position: absolute;
                top: -23px;
                left: 20%;
                background: white;
                height: 0;
                width:0;
                border: rgba($color: #DCDCDC, $alpha: 0.8) 12px solid;
                border-bottom: #ae0000 12px solid;
            }
    }
</style>
