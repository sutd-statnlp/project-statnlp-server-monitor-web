<template>
  <div class="m-network">
    <div class="container-fluid">
        <div class="block-header row">
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                <RefreshButton :refresh="refresh" />
            </div>
        </div>
        <div class="row clearfix animated fadeInUp">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2>
                            NETWORK INTERFACES
                        </h2>
                    </div>
                    <div class="body table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>MTU</th>
                                    <th>Name</th>
                                    <th>Hardware Address</th>
                                    <th>Flags</th>
                                    <th>Addresses</th>
                                </tr>
                            </thead>
                          <tbody>
                              <tr v-for="(item, index) in getNetwork.interface" :key="index">
                                <td>{{index + 1}}</td>
                                <td>{{item.mtu}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.hardwareaddr}}</td>
                                <td>
                                    <span class="label bg-blue" v-for="flag in item.flags" :key="flag">{{flag}}</span>
                                </td>
                                <td>
                                    <span class="label bg-blue" v-for="address in item.addrs" :key="address.addr">{{address.addr}}</span>
                                </td>
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
  name: 'NetworkPage',
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      let server = this.$store.getters['getCurrentServer']
      if (server.status) {
        this.$store.dispatch('network/getAll')
      } else {
        AlterService.serverNotAvailable()
        this.$store.dispatch('network/loadDefaultData')
      }
    }
  },
  computed: {
    getNetwork () {
      return this.$store.getters['network/getNetwork']
    }
  }
}
</script>

<style scoped>

</style>
