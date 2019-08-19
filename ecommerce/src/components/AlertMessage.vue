<template>
    <div class="alertMessage">
      <div class="alert alert-dismissible" role="alert" :class="'alert-' + item.status" v-for="(item, i) in messages" :key="item.timestamp">
        {{item.message}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"  @click="removeAlert(i)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp
      })
      this.removeAlertAuto(timestamp)
    },
    removeAlert (i) {
      this.messages.splice(i, 1)
    },
    removeAlertAuto (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 5000)
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status)
    })
  }
}
</script>

<style lang="scss" scoped>
    .alertMessage{
        position: fixed;
        top: 60px;
        right: 30px;
        z-index: 2000
    }
</style>
