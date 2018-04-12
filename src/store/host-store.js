
import axios from 'axios'
import ServerService from '@/services/server-service'
import async from 'async'
import dateUtil from '@/utils/date-util'

export default {
  namespaced: true,
  state: {
    host: {
      info: {
        'uptime': 0,
        'bootTime': 0,
        'procs': 0,
        'os': '',
        'platform': '',
        'platformFamily': '',
        'platformVersion': '',
        'kernelVersion': ''
      },
      temperature: []
    }
  },
  getters: {
    getHost (state) {
      return state.host
    }
  },
  mutations: {
    getHostInfo (state) {
      let url = ServerService.getHostInfoEndpoint()
      axios.get(url).then(response => {
        state.host.info = response.data
        state.host.info.uptime = dateUtil.secondsToTime(response.data.uptime)
        state.host.info.bootTime = dateUtil.unixTimeToDateString(response.data.bootTime)
      }).catch(function (error) {
        console.log(error)
      })
    },
    loadDefaultData (state) {
      state.host = {
        info: {
          'uptime': 0,
          'bootTime': 0,
          'procs': 0,
          'os': '',
          'platform': '',
          'platformFamily': '',
          'platformVersion': '',
          'kernelVersion': ''
        },
        temperature: []
      }
    }
  },
  actions: {
    loadDefaultData (context) {
      context.commit('loadDefaultData')
    },
    getHostInfo (context) {
      context.commit('getHostInfo')
    },
    getAll (context) {
      async.parallel([
        () => { context.commit('getHostInfo') }
      ], (err, results) => {
        console.log(err)
      })
    }
  }
}
