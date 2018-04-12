<template>
  <div class="m-host">
    <div class="container-fluid">
        <div class="block-header row">
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                <RefreshButton :refresh="refresh" />
            </div>
        </div>

        <!-- Summary info -->
        <div class="row clearfix">
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="trending_up" title="UPTIME" :value="getHost.info.uptime"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="launch" title="BOOT TIME" :value="getHost.info.bootTime"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="graphic_eq" title="PROCESSES" :value="getHost.info.procs"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="select_all" title="OS" :value="getHost.info.os"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="subtitles" title="PLATFORM" :value="getHost.info.platform"/>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="featured_play_list" title="PLAT FAMILY" :value="getHost.info.platformFamily"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="filter_none" title="PLAT VERSION" :value="getHost.info.platformVersion"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="fiber_smart_record" title="KERNEL VERSION" :value="getHost.info.kernelVersion | limit(5)"/>
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
  name: 'HostPage',
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      let server = this.$store.getters['getCurrentServer']
      if (server.status) {
        this.$store.dispatch('host/getAll')
      } else {
        AlterService.serverNotAvailable()
        this.$store.dispatch('host/loadDefaultData')
      }
    }
  },
  computed: {
    getHost () {
      return this.$store.getters['host/getHost']
    }
  }
}
</script>

<style scoped>

</style>
