<template>
    <div>
         <h3 class="font-weight-bold my-3">OVERVIEW</h3>
        <div class="row">
            <div class="col-md-4">
                <div class="bg-white overviewBg text-center text-nowrap mb-3 py-3">
                  <h4><i class="fas fa-hand-holding-usd mr-2"></i>總收入</h4>
                  <span class="text-success h3 font-weight-bold">54,540</span>
                </div>
            </div>
            <div class="col-md-4">
                <div class="bg-white overviewBg text-center text-nowrap mb-3 py-3">
                  <h4><i class="fas fa-boxes mr-2"></i>總成本</h4>
                  <span class="text-primary h3 font-weight-bold">12,660</span>
                </div>
            </div>
            <div class="col-md-4">
                <div class="bg-white overviewBg text-center text-nowrap mb-3 py-3">
                  <h4><i class="fas fa-money-bill mr-2"></i>淨收入</h4>
                  <span class="text-info h3 font-weight-bold">41,880</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url("@fortawesome/fontawesome-free/css/all.css");
    .overviewBg{
        box-shadow: 0 0 10px 5px #EBEBEB;
        border-radius: 3px
    }
</style>
