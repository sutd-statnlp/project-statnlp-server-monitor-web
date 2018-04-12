<template>
  <div class="m-load">
    <div class="container-fluid">
        <div class="block-header row">
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                <RefreshButton :refresh="refresh" />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6 text-right">
                    <div class="demo-switch-title">AUTO REFRESH</div>
                    <div class="switch">
                        <label>
                            <input type="checkbox" v-model="isAutoRefresh" v-on:change="setAutoRefresh()">
                            <span class="lever switch-col-blue"></span>
                        </label>
                    </div>
                </div>
        </div>

        <!-- Summary info -->
        <div class="row clearfix">
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="power_input" title="Load 1" :value="getLoad.average.load1"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="view_carousel" title="Load 5" :value="getLoad.average.load5"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="view_module" title="Load 15" :value="getLoad.average.load15"/>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="brightness_high" title="MISC RUNNING" :value="getLoad.misc.procsRunning"/>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="block" title="MISC BLOCKED" :value="getLoad.misc.procsBlocked"/>
            </div>

            <div class="col-lg-5 col-md-5 col-sm-6 col-xs-12">
              <InfoBox icon="swap_horiz" title="MISC CTXT Context Switches" :value="getLoad.misc.ctxt"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import InfoBox from '@/components/InfoBox'
import RefreshButton from '@/components/RefreshButton'
import AlterService from '@/services/alter-service'

export default {
  components: {
    InfoBox,
    RefreshButton
  },
  name: 'LoadPage',
  data () {
    return {
      isAutoRefresh: false
    }
  },
  methods: {
    refresh () {
      let server = this.$store.getters['getCurrentServer']
      if (server.status) {
        this.$store.dispatch('load/getAll')
      } else {
        this.isAutoRefresh = false
        clearInterval(this.interval)
        AlterService.serverNotAvailable()
        this.$store.dispatch('load/loadDefaultData')
      }
    },
    setAutoRefresh () {
      if (this.isAutoRefresh) {
        this.interval = setInterval(function () {
          this.refresh()
        }.bind(this), 800)
      } else {
        clearInterval(this.interval)
      }
    }
  },
  computed: {
    getLoad () {
      return this.$store.getters['load/getLoad']
    }
  }
}
</script>

<style scoped>

</style>
