<template>
  <div class="m-pageload">
    <div class="page-loader-wrapper">
        <div class="loader">
            <div class="preloader">
                <div class="spinner-layer pl-blue">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
            <p>Please wait...</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLoad',
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
