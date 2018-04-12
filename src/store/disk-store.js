
import axios from 'axios'
import ServerService from '@/services/server-service'
import async from 'async'

export default {
  namespaced: true,
  state: {
    disk: {
      usage: {
        'total': 0,
        'free': 0,
        'used': 0,
        'usedPercent': 0,
        'inodesTotal': 0,
        'inodesUsed': 0,
        'inodesFree': 0,
        'inodesUsedPercent': 0
      }
    }
  },
  getters: {
    getDisk (state) {
      return state.disk
    }
  },
  mutations: {
    getDiskUsage (state) {
      let url = ServerService.getDiskUsageEndpoint()
      axios.get(url).then(response => {
        state.disk.usage = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    loadDefaultData (state) {
      state.disk = {
        usage: {
          'total': 0,
          'free': 0,
          'used': 0,
          'usedPercent': 0,
          'inodesTotal': 0,
          'inodesUsed': 0,
          'inodesFree': 0,
          'inodesUsedPercent': 0
        }
      }
    }
  },
  actions: {
    loadDefaultData (context) {
      context.commit('loadDefaultData')
    },
    getDiskUsage (context) {
      context.commit('getDiskUsage')
    },
    getAll (context) {
      async.parallel([
        () => { context.commit('getDiskUsage') }
      ], (err, results) => {
        console.log(err)
      })
    }
  }
}
