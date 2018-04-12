<template>
  <div class="m-cpu">
    <div class="container-fluid">
        <div class="block-header row">
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                <RefreshButton :refresh="refresh" />
            </div>
        </div>
        <!-- Summary info -->
        <div class="row clearfix">
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <InfoBox icon="view_module" title="cpu count" :value="getCpu.count"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <InfoBox icon="developer_board" title="cpu usage" :value="getCpu.sumPercent | limit(4,' %')"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="account_box" title="cpu user" :value="getCpu.sumTime.user | limit(6)"/>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="brightness_high" title="cpu system" :value="getCpu.sumTime.system | limit(4)"/>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="view_column" title="cpu idle" :value="getCpu.sumTime.idle | limit(6)"/>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="vertical_align_top" title="cpu nice" :value="getCpu.sumTime.nice | limit(4)"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="hourglass_empty" title="cpu iowait" :value="getCpu.sumTime.iowait | limit(6)"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <InfoBox icon="shuffle" title="cpu SOFTIRQ" :value="getCpu.sumTime.softirq | limit(6)"/>
            </div>
        </div>

        <!-- Info detail -->
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2>
                            CPU DETAILS
                        </h2>
                    </div>
                    <div class="body" ng-show="vm.hasTable">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Model Name</th>
                                        <th>Vendor</th>
                                        <th>MHZ</th>
                                        <th>Cache Size</th>
                                        <th>Percent Usage</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(item, index) in getCpu.info" :key="item.cpu">
                                        <td>{{item.cpu}}</td>
                                        <td>{{item.modelName}}</td>
                                        <td>{{item.vendorId}}</td>
                                        <td>{{item.mhz}}</td>
                                        <td>{{item.cacheSize}}</td>
                                        <td>{{getCpu.percent[index] | limit(4,' %')}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
  name: 'CpuPage',
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      let server = this.$store.getters['getCurrentServer']
      if (server.status) {
        this.$store.dispatch('cpu/getAll')
        this.createTable()
      } else {
        AlterService.serverNotAvailable()
        this.$store.dispatch('cpu/loadDefaultData')
      }
    },
    createTable () {
      $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        'bDestroy': true
      })
    }
  },
  computed: {
    getCpu () {
      return this.$store.getters['cpu/getCpu']
    }
  }
}
</script>

<style scoped>

</style>
