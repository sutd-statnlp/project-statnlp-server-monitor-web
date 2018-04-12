import Vue from 'vue'
import Vuex from 'vuex'
import DashboardStore from './dashboard-store'
import CpuStore from './cpu-store'
import MemoryStore from './memory-store'
import HostStore from './host-store'
import LoadStore from './load-store'
import DiskStore from './disk-store'
import NetworkStore from './network-store'
import GpuStore from './gpu-store'
import ServerService from '@/services/server-service'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dashboard: DashboardStore,
    cpu: CpuStore,
    memory: MemoryStore,
    host: HostStore,
    load: LoadStore,
    disk: DiskStore,
    network: NetworkStore,
    gpu: GpuStore
  },
  state: {
    servers: [],
    currentServer: {
      name: null,
      ip: null,
      status: false
    }
  },
  getters: {
    getServers (state) {
      return state.servers
    },
    getCurrentServer (state) {
      return state.currentServer
    }
  },
  mutations: {
    getServers (state) {
      state.servers = ServerService.getServers()
      state.currentServer = ServerService.getCurrentServer()
    },
    chooseServer (state, payload) {
      ServerService.setServer(payload.server)
      state.currentServer = payload.server
    }
  },
  actions: {
    getServers (context) {
      context.commit('getServers')
    },
    chooseServer (context, payload) {
      context.commit('chooseServer', payload)
    }
  }
})
