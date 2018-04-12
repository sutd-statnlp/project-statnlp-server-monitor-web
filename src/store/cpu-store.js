
import axios from 'axios'
import ServerService from '@/services/server-service'
import async from 'async'

export default {
  namespaced: true,
  state: {
    cpu: {
      sumPercent: 0,
      sumTime: {
        user: 0,
        system: 0,
        idle: 0,
        nice: 0,
        iowait: 0,
        softirq: 0
      },
      count: 0,
      info: [],
      percent: [],
      time: []
    }
  },
  getters: {
    getCpu (state) {
      return state.cpu
    }
  },
  mutations: {
    getCpuSumPercent (state) {
      let url = ServerService.getCpuSumPercentEndpoint()
      axios.get(url).then(response => {
        state.cpu.sumPercent = response.data[0]
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCpuCount (state) {
      let url = ServerService.getCpuCountEndpoint()
      axios.get(url).then(response => {
        state.cpu.count = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCpuSumTime (state) {
      let url = ServerService.getCpuSumTimeEndpoint()
      axios.get(url).then(response => {
        state.cpu.sumTime = response.data[0]
        let jiffyToHour = 100 * 60 * 60
        let jiffyToSecond = 100

        state.cpu.sumTime.user = response.data[0].user / jiffyToHour
        state.cpu.sumTime.system = response.data[0].system / jiffyToHour
        state.cpu.sumTime.idle = response.data[0].idle / jiffyToHour
        state.cpu.sumTime.nice = response.data[0].nice / jiffyToSecond
        state.cpu.sumTime.iowait = response.data[0].iowait / jiffyToSecond
        state.cpu.sumTime.softirq = response.data[0].softirq / jiffyToSecond
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCpuInfo (state) {
      let url = ServerService.getCpuInfoEndpoint()
      axios.get(url).then(response => {
        state.cpu.info = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCpuPercent (state) {
      let url = ServerService.getCpuPercentEndpoint()
      axios.get(url).then(response => {
        state.cpu.percent = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    loadDefaultData (state) {
      state.cpu = {
        sumPercent: 0,
        sumTime: {
          user: 0,
          system: 0,
          idle: 0,
          nice: 0,
          iowait: 0,
          softirq: 0
        },
        count: 0,
        info: [],
        percent: [],
        time: []
      }
    }
  },
  actions: {
    loadDefaultData (context) {
      context.commit('loadDefaultData')
    },
    getCpuSumPercent (context) {
      context.commit('getCpuSumPercent')
    },
    getCpuCount (context) {
      context.commit('getCpuCount')
    },
    getCpuSumTime (context) {
      context.commit('getCpuSumTime')
    },
    getCpuInfo (context) {
      context.commit('getCpuInfo')
    },
    getCpuPercent (context) {
      context.commit('getCpuPercent')
    },
    getCpuInfoAndPercent (context) {
      axios.all([
        context.commit('getCpuInfo'),
        context.commit('getCpuPercent')
      ])
    },
    getAll (context) {
      async.parallel([
        () => { context.commit('getCpuSumPercent') },
        () => { context.commit('getCpuCount') },
        () => { context.commit('getCpuSumTime') },
        () => { context.commit('getCpuInfo') },
        () => { context.commit('getCpuPercent') }
      ], (err, results) => {
        console.log(err)
      })
    }
  }
}
