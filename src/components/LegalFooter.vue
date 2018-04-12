<template>
  <div class="legal">
    <div class="copyright">
        <a href="javascript:void(0);">{{title}}</a> &copy; {{year}}
    </div>
    <div class="version">
        <b>Version: </b> {{version}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LegalFooter',
  props: {
    title: {
      default: 'SUTD STATNLP - Server Monitor'
    },
    year: {
      default: '2018'
    },
    version: {
      default: '2.0.0-beta'
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
