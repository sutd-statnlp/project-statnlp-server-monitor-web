<template>
  <div class="m-memory">
    <div class="container-fluid">
        <div class="block-header row">
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                <RefreshButton :refresh="refresh" />
            </div>
        </div>
        <!-- Summary info -->
        <div class="row clearfix">
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="memory" title="MEMORY TOTA" :value="getMemory.virtual.total | byte(0)"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="check_box_outline_blank" title="AVAILABE" :value="getMemory.virtual.available | byte(0)"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="indeterminate_check_box" title="USAGE" :value="getMemory.virtual.used | byte(0)"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="memory" title="USAGE PERCENT" :value="getMemory.virtual.usedPercent | limit(4,' %')"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="done_all" title="FREE & ACTIVE" :value="getMemory.virtual.free | byte(0)"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="view_agenda" title="BUFFERS" :value="getMemory.virtual.buffers | byte(0)"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="cached" title="cached" :value="getMemory.virtual.cached | byte(0)"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="stop" title="INACTIVE" :value="getMemory.virtual.inactive | byte(0)"/>
            </div>
        </div>
        <!-- Info detail -->
        <div class="row clearfix">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div class="card">
                    <div class="body">
                        <div class="font-bold m-b--35">MEMORY DETAILS</div>
                        <ul class="dashboard-stat-list">
                            <li>
                                Dirty
                                <span class="pull-right"><b>{{getMemory.virtual.dirty | byte(0)}}</b></span>
                            </li>
                            <li>
                                Writebacktmp
                                <span class="pull-right"><b>{{getMemory.virtual.writebacktmp| byte(0)}}</b></span>
                            </li>
                            <li>
                                Shared
                                <span class="pull-right"><b>{{getMemory.virtual.shared | byte(0)}}</b></span>
                            </li>
                            <li>
                                Slab
                                <span class="pull-right"><b>{{getMemory.virtual.slab | byte(0)}}</b></span>
                            </li>
                            <li>
                                Pagetables
                                <span class="pull-right"><b>{{getMemory.virtual.pagetables | byte(0)}}</b></span>
                            </li>
                            <li>
                                Swapcached
                                <span class="pull-right"><b>{{getMemory.virtual.swapcached | byte(0)}}</b></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div class="card">
                    <div class="body">
                        <div class="font-bold m-b--35">SWAP MEMORY</div>
                        <ul class="dashboard-stat-list">
                            <li>
                                Total
                                <span class="pull-right"><b>{{getMemory.swap.total | byte(0)}}</b></span>
                            </li>
                            <li>
                                Usage
                                <span class="pull-right"><b>{{getMemory.swap.used| byte(0)}}</b></span>
                            </li>
                            <li>
                                Free
                                <span class="pull-right"><b>{{getMemory.swap.free | byte(0)}}</b></span>
                            </li>
                            <li>
                                Usage percent
                                <span class="pull-right"><b>{{getMemory.swap.usedPercent | limit(4,' %') }}</b></span>
                            </li>
                            <li>
                                SIN
                                <span class="pull-right"><b>{{getMemory.swap.sin | byte(0)}}</b></span>
                            </li>
                            <li>
                                SOUT
                                <span class="pull-right"><b>{{getMemory.swap.sout | byte(0)}}</b></span>
                            </li>
                        </ul>
                    </div>
                </div>
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
  name: 'MemoryPage',
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      let server = this.$store.getters['getCurrentServer']
      if (server.status) {
        this.$store.dispatch('memory/getAll')
      } else {
        AlterService.serverNotAvailable()
        this.$store.dispatch('memory/loadDefaultData')
      }
    }
  },
  computed: {
    getMemory () {
      return this.$store.getters['memory/getMemory']
    }
  }
}
</script>

<style scoped>

</style>
