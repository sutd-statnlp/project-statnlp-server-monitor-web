
import axios from 'axios'
import ServerService from '@/services/server-service'
import async from 'async'

export default {
  namespaced: true,
  state: {
    cpu: {
      percent: 0
    },
    memory: {
      virtual: {
        used: 0,
        usedPercent: 0
      }
    },
    load: {
      average: 0,
      misc: {
        procsRunning: 0
      }
    }
  },
  getters: {
    getCpu (state) {
      return state.cpu
    },
    getMemory (state) {
      return state.memory
    },
    getLoad (state) {
      return state.load
    }
  },
  mutations: {
    getCpuPercent (state) {
      let url = ServerService.getCpuSumPercentEndpoint()
      axios.get(url).then(response => {
        state.cpu.percent = response.data[0]
      }).catch(function (error) {
        console.error(error)
      })
    },
    getMemoryUsage (state) {
      let url = ServerService.getMemoryUsageEndpoint()
      axios.get(url).then(response => {
        state.memory.virtual.used = response.data.used
        state.memory.virtual.usedPercent = response.data.usedPercent
      }).catch(function (error) {
        console.error(error)
      })
    },
    getLoadAverage (state) {
      let url = ServerService.getLoadAverageEndpoint()
      axios.get(url).then(response => {
        state.load.average = response.data.load1
      }).catch(function (error) {
        console.error(error)
      })
    },
    getLoadMisc (state) {
      let url = ServerService.getLoadMiscEndpoint()
      axios.get(url).then(response => {
        state.load.misc.procsRunning = response.data.procsRunning
      }).catch(function (error) {
        console.error(error)
      })
    },
    loadDefaultData (state) {
      state.cpu = {
        percent: 0
      }
      state.memory = {
        virtual: {
          used: 0,
          usedPercent: 0
        }
      }
      state.load = {
        average: 0,
        misc: {
          procsRunning: 0
        }
      }
    }
  },
  actions: {
    getCpuPercent (context) {
      context.commit('getCpuPercent')
    },
    getMemoryUsage (context) {
      context.commit('getMemoryUsage')
    },
    getLoadAverage (context) {
      context.commit('getLoadAverage')
    },
    getLoadMisc (context) {
      context.commit('getLoadMisc')
    },
    getAll (context) {
      async.parallel([
        () => { context.commit('getCpuPercent') },
        () => { context.commit('getMemoryUsage') },
        () => { context.commit('getLoadAverage') },
        () => { context.commit('getLoadMisc') }
      ], (err, results) => {
        console.error(err)
      })
    },
    loadDefaultData (context) {
      context.commit('loadDefaultData')
    }
  }
}
