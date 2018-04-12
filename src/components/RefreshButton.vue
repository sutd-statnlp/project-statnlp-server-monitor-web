<template>
  <button v-on:click="refresh" :disabled="isAutoRefresh" type="button" class="btn btn-primary btn-circle-lg waves-effect waves-circle waves-float">
    <i class="material-icons">refresh</i>
  </button>
</template>

<script>
export default {
  name: 'RefreshButton',
  props: {
    refresh: {
      require: true
    },
    isAutoRefresh: {
      default: false
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
