
import axios from 'axios'
import ServerService from '@/services/server-service'
import async from 'async'

export default {
  namespaced: true,
  state: {
    network: {
      interface: []
    }
  },
  getters: {
    getNetwork (state) {
      return state.network
    }
  },
  mutations: {
    getNetworkInterface (state) {
      let url = ServerService.getNetworkInterfaceEndpoint()
      axios.get(url).then(response => {
        state.network.interface = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    loadDefaultData (state) {
      state.network = {
        interface: []
      }
    }
  },
  actions: {
    loadDefaultData (context) {
      context.commit('loadDefaultData')
    },
    getNetworkInterface (context) {
      context.commit('getNetworkInterface')
    },
    getAll (context) {
      async.parallel([
        () => { context.commit('getNetworkInterface') }
      ], (err, results) => {
        console.log(err)
      })
    }
  }
}
