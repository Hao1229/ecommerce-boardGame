import Vue from 'vue'

Vue.prototype.$bus = new Vue()

// vm.$bus.$on('message:push', (message, status = 'warning') => { 綁定在 AlertMessage 中監聽 message:push 若被觸發將 message 和 status 回傳給 updateMessage
//     vm.updateMessage(message, status)
//   })

// this.$bus.$emit('message:push', response.data.message, 'danger') 當 Products 裡的上傳圖片出現問題時，將 Ajax 回傳的訊息及 alert 顏色(danger)透過 emit 觸發
