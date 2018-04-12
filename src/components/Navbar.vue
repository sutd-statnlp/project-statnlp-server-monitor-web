<template>
  <div class="m-navbar">
    <nav class="navbar m-navbar">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
            <a href="javascript:void(0);" class="bars"></a>
            <a class="navbar-brand" href="/">
                <strong>STATNLP MONITOR</strong>
            </a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
                <!-- Call Search -->
                <li>
                    <router-link to="/apps">
                        <i class="material-icons">get_app</i>
                    </router-link>
                </li>
                <!-- #END# Call Search -->
                <!-- Notifications -->
                <li class="dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button">
                        <i class="material-icons">poll</i>
                        <span class="label-count">{{getServers.length}}</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">STATNLP SERVERS</li>
                        <li class="body">
                            <ul class="menu">
                                <li v-for="(item, index) in getServers" :key="index" class="m-menu-item" v-on:click="chooseServer(item)">
                                    <a href="javascript:void(0);">
                                        <div :class="item.status ? 'icon-circle bg-light-green' : 'icon-circle bg-danger'">
                                            <i class="material-icons">dns</i>
                                        </div>
                                        <div class="menu-info">
                                            <h4>{{item.name}} - {{item.ip}}</h4>
                                            <p>
                                               <i class="material-icons">{{item.status ? 'done' : 'close'}}</i> {{item.status ? 'Available' : 'Not Available'}}
                                            </p>
                                        </div>
                                    </a>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
import AlterService from '@/services/alter-service'
import StoreService from '@/services/store-service'

export default {
  name: 'Navbar',
  data () {
    return {
    }
  },
  created () {
    return this.$store.dispatch('getServers')
  },
  computed: {
    getServers () {
      return this.$store.getters['getServers']
    }
  },
  methods: {
    chooseServer (server) {
      this.$store.dispatch('chooseServer', { server: server })
      if (server.status) {
        StoreService.loadAllData(this.$store)
      } else {
        AlterService.serverNotAvailable()
        StoreService.loadAllDefaultData(this.$store)
      }
    }
  },
  mounted () {
    $('.m-menu-item').first().addClass('m-item-active')
    $('.m-menu-item').click(function () {
      $('.m-menu-item').removeClass('m-item-active')
      $(this).addClass('m-item-active')
    })
  }
}
</script>

<style scoped>

</style>
