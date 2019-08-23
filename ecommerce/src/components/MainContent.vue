<template>
  <div>
    <div class="contentBg min-vh-100 d-flex justify-content-center align-items-center">
        <div>
          <img src="https://i.imgur.com/HXIW7B2.png" class="logo">
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mb-3 mb-md-0">
                <div class="adBg mt-3 p-4 h-100">
                    <router-link to="/" class="textNodecoration">
                      <div class="text-center d-flex flex-column adAnimation">
                        <i class="fas fa-birthday-cake fa-3x text-primary"></i>
                        <span class="display-3 mb-3 text-primary">週年慶大促銷</span>
                        <span class="h2 text-dark font-italic">全館商品特價</span>
                      </div>
                    </router-link>
                </div>
            </div>
            <div class="col-md-6">
                <div class="couponBg mt-3 p-4 h-100">
                    <router-link to="/" class="textNodecoration">
                      <div class="text-center d-flex flex-column couponAnimation">
                        <i class="fas fa-ticket-alt fa-3x text-success"></i>
                        <span class="display-3 mb-3 text-success"> 優惠卷加碼送 </span>
                        <span class="h2 text-dark font-italic">取得優惠卷 Go~</span>
                      </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="mt-5 text-center d-flex align-items-center">
            <div class="bg-dark flex-fill" style="height:2px"></div>
            <h3 class="border border-dark p-2">熱門商品</h3>
            <div class="bg-dark flex-fill" style="height:2px"></div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
     @import url("@fortawesome/fontawesome-free/css/all.css");
     .adBg{
        background: -webkit-linear-gradient(left top,#90EE90,#AFEEEE);
        background: -o-linear-gradient(bottom right,#90EE90,#AFEEEE);
        background: -moz-linear-gradient(bottom right,#90EE90,#AFEEEE);
        background: linear-gradient(to bottom right,#90EE90,#AFEEEE);
     }
     .couponBg{
        background: -webkit-linear-gradient(left top,#FFD700,#FA8072);
        background: -o-linear-gradient(bottom right,#FFD700,#FA8072);
        background: -moz-linear-gradient(bottom right,#FFD700,#FA8072);
        background: linear-gradient(to bottom right,#FFD700,#FA8072);
     }
     .textNodecoration{
        text-decoration: none
     }
     .contentBg{
        background-image: url('https://i.imgur.com/3eRcJNV.jpg');
        background-attachment: fixed ;
     }
     .logo{
         width: 320px;
         height: 320px;
         opacity: 0.9;
     }
     .adAnimation{
         &:hover{
            opacity: 0.5;
         }
     }
     .couponAnimation{
         &:hover{
            opacity: 0.5;
         }
     }
</style>
