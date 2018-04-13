
import axios from 'axios'
import ServerService from '@/services/server-service'
import async from 'async'
import DataUtil from '@/utils/data-util'

export default {
  namespaced: true,
  state: {
    gpu: {
      driverVersion: 0,
      attachedGpus: 0,
      gpus: []
    }
  },
  getters: {
    getGpu (state) {
      return state.gpu
    }
  },
  mutations: {
    getGpuInfo (state) {
      let url = ServerService.getGpuInfoEndpoint()
      axios.get(url, {
        timeout: 4000
      }).then(response => {
        let data = response.data.nvidia_smi_log
        state.gpu = {
          driverVersion: data.driver_version,
          attachedGpus: data.attached_gpus,
          gpus: DataUtil.optimizeGpuData(data.gpu)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    loadDefaultData (state) {
      state.gpu = {
        driverVersion: 0,
        attachedGpus: 0,
        gpus: []
      }
    }
  },
  actions: {
    loadDefaultData (context) {
      context.commit('loadDefaultData')
    },
    getGpuInfo (context) {
      context.commit('getGpuInfo')
    },
    getAll (context) {
      async.parallel([
        () => { context.commit('getGpuInfo') }
      ], (err, results) => {
        console.log(err)
      })
    }
  }
}
