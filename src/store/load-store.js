
import axios from 'axios'
import ServerService from '@/services/server-service'
import async from 'async'

export default {
  namespaced: true,
  state: {
    load: {
      average: {
        'load1': 0,
        'load5': 0,
        'load15': 0
      },
      misc: {
        'procsRunning': 0,
        'procsBlocked': 0,
        'ctxt': 0
      }
    }
  },
  getters: {
    getLoad (state) {
      return state.load
    }
  },
  mutations: {
    getLoadAverage (state) {
      let url = ServerService.getLoadAverageEndpoint()
      axios.get(url).then(response => {
        state.load.average = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    getLoadMisc (state) {
      let url = ServerService.getLoadMiscEndpoint()
      axios.get(url).then(response => {
        state.load.misc = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    loadDefaultData (state) {
      state.load = {
        average: {
          'load1': 0,
          'load5': 0,
          'load15': 0
        },
        misc: {
          'procsRunning': 0,
          'procsBlocked': 0,
          'ctxt': 0
        }
      }
    }
  },
  actions: {
    loadDefaultData (context) {
      context.commit('loadDefaultData')
    },
    getLoadAverage (context) {
      context.commit('getLoadAverage')
    },
    getLoadMisc (context) {
      context.commit('getLoadMisc')
    },
    getAll (context) {
      async.parallel([
        () => { context.commit('getLoadAverage') },
        () => { context.commit('getLoadMisc') }
      ], (err, results) => {
        console.log(err)
      })
    }
  }
}
