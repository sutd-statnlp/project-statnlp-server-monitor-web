<template>
  <div class="m-disk">
    <div class="container-fluid">
        <div class="block-header row">
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                <RefreshButton :refresh="refresh" />
            </div>
        </div>
        <!-- Summary info -->
        <div class="row clearfix">
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="blur_circular" title="TOTAL" :value="getDisk.usage.total | byte(0)"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="crop_din" title="FREE" :value="getDisk.usage.free | byte(0)"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="gradient" title="USED" :value="getDisk.usage.used | byte(0)"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="brightness_high" title="USED PERCENT" :value="getDisk.usage.usedPercent | limit(6,'%')"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="blur_circular" title="INODES TOTAL" :value="getDisk.usage.inodesTotal"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="crop_din" title="INODES FREE" :value="getDisk.usage.inodesFree"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="gradient" title="INODES USED" :value="getDisk.usage.inodesUsed"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="gradient" title="INODES USED" :value="getDisk.usage.inodesUsedPercent | limit(4,' %')"/>
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
  name: 'DiskPage',
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      let server = this.$store.getters['getCurrentServer']
      if (server.status) {
        this.$store.dispatch('disk/getAll')
      } else {
        AlterService.serverNotAvailable()
        this.$store.dispatch('disk/loadDefaultData')
      }
    }
  },
  computed: {
    getDisk () {
      return this.$store.getters['disk/getDisk']
    }
  }
}
</script>

<style scoped>

</style>
