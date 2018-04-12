<template>
  <div class="m-footer">
      <div class="footer" hidden>
        <button id="btn-noti-error" type="button" class="btn btn-primary btn-block waves-effect notification-button" data-placement-from="top"
            data-placement-align="right" data-animate-enter="" data-text="Server is not available !" data-animate-exit="" data-color-name="alert-warning">
            TOP RIGHT
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
    }
  },
  mounted () {
    let js = document.createElement('script')
    js.setAttribute('src', './static/js/demo.js')
    document.body.appendChild(js)
  }
}
</script>

<style scoped>

</style>
