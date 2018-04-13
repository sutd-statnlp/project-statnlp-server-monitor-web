<template>
  <div class="m-gpu">
    <div class="container-fluid">
        <div class="block-header row">
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                <RefreshButton :refresh="refresh" />
            </div>
        </div>
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2>
                            GPUs
                        </h2>
                    </div>
                    <div class="body table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Fan Speed</th>
                                    <th>Utilization</th>
                                    <th>Temperature</th>
                                    <th>Memory</th>
                                    <th>Power Readings</th>
                                    <th>Processes</th>
                                </tr>
                            </thead>
                          <tbody>
                              <tr v-for="(item, index) in getGpu.gpus" :key="index">
                                <td>{{index + 1}}</td>
                                <td>{{item.productName}}</td>
                                <td>{{item.fanSpeed}}</td>
                                <td>{{item.utilization}}</td>
                                <td>{{item.temperature}}</td>
                                <td>{{item.memory.used | mib(2)}} / {{item.memory.total | mib(2)}}</td>
                                <td>{{item.powerDraw}} / {{item.powerLimit}}</td>
                                <td class="text-center">
                                  <div class="btn-group" role="group" aria-label="First group">
                                        <button type="button" class="btn btn-primary waves-effect" @click="viewProcesses(item, index)" :disabled="item.processes.length == 0"> {{item.processes.length}}</button>
                                    </div>
                                </td>
                              </tr>
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
         <div class="row clearfix" v-if="chosenGpu">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2>
                            Running processes of GPU {{chosenGpu.index + 1}}
                        </h2>
                    </div>
                    <div class="body table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Memory Usage</th>
                                </tr>
                            </thead>
                          <tbody>
                              <tr v-for="(item, index) in chosenGpu.processes" :key="index">
                                <td>{{index + 1}}</td>
                                <td>{{item.pid}}</td>
                                <td>{{item.type}}</td>
                                <td>{{item.process_name}}</td>
                                <td>{{item.used_memory | mib(2)}}</td>
                              </tr>
                          </tbody>
                        </table>
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
  name: 'GpuPage',
  data () {
    return {
      chosenGpu: null
    }
  },
  methods: {
    refresh () {
      let server = this.$store.getters['getCurrentServer']
      if (server.status) {
        this.$store.dispatch('gpu/getAll')
      } else {
        AlterService.serverNotAvailable()
        this.$store.dispatch('gpu/loadDefaultData')
      }
    },
    viewProcesses (gpu, index) {
      this.chosenGpu = gpu
      this.chosenGpu['index'] = index
    }
  },
  computed: {
    getGpu () {
      return this.$store.getters['gpu/getGpu']
    }
  }
}
</script>

<style scoped>

</style>
