<template>
  <div class="card">
    <div class="header">
        <div class="row clearfix">
            <div class="col-xs-12 col-sm-6">
            <h2>{{title}}</h2>
            </div>
        </div>
    </div>
    <div class="body">
        <div :id="id" class="dashboard-flot-chart"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardChart',
  props: {
    id: {
      required: true
    },
    title: {
      required: true
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
