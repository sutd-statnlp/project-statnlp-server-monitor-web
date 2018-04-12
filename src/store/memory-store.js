
import axios from 'axios'
import ServerService from '@/services/server-service'
import async from 'async'

export default {
  namespaced: true,
  state: {
    memory: {
      virtual: {
        'total': 0,
        'available': 0,
        'used': 0,
        'usedPercent': 0,
        'free': 0,
        'buffers': 0,
        'inactive': 0,
        'cached': 0,
        'dirty': 0,
        'writebacktmp': 0,
        'shared': 0,
        'slab': 0,
        'pagetables': 0,
        'swapcached': 0
      },
      swap: {
        'total': 0,
        'used': 0,
        'free': 0,
        'usedPercent': 0,
        'sin': 0,
        'sout': 0
      }
    }
  },
  getters: {
    getMemory (state) {
      return state.memory
    }
  },
  mutations: {
    getVirtualMemory (state) {
      let url = ServerService.getVirtualMemoryEndpoint()
      axios.get(url).then(response => {
        state.memory.virtual = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    getSwapMemory (state) {
      let url = ServerService.getSwapMemoryEndpoint()
      axios.get(url).then(response => {
        state.memory.swap = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    loadDefaultData (state) {
      state.memory = {
        virtual: {
          'total': 0,
          'available': 0,
          'used': 0,
          'usedPercent': 0,
          'free': 0,
          'buffers': 0,
          'inactive': 0,
          'cached': 0,
          'dirty': 0,
          'writebacktmp': 0,
          'shared': 0,
          'slab': 0,
          'pagetables': 0,
          'swapcached': 0
        },
        swap: {
          'total': 0,
          'used': 0,
          'free': 0,
          'usedPercent': 0,
          'sin': 0,
          'sout': 0
        }
      }
    }
  },
  actions: {
    loadDefaultData (context) {
      context.commit('loadDefaultData')
    },
    getVirtualMemory (context) {
      context.commit('getVirtualMemory')
    },
    getSwapMemory (context) {
      context.commit('getSwapMemory')
    },
    getAll (context) {
      async.parallel([
        () => { context.commit('getVirtualMemory') },
        () => { context.commit('getSwapMemory') }
      ], (err, results) => {
        console.log(err)
      })
    }
  }
}
