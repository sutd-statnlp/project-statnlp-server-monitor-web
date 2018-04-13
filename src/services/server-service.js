import axios from 'axios'

class ServerService {
  constructor () {
    axios.defaults.timeout = 2000

    this.httpSchema = 'http://'
    this.port = ':8210'

    this.servers = [{
      name: 'StatNLP 0',
      ip: '172.18.240.110',
      status: false
    }, {
      name: 'StatNLP 1',
      ip: '192.168.30.238',
      status: false
    }, {
      name: 'StatNLP 3',
      ip: '192.168.30.231',
      status: false
    }, {
      name: 'MLCluster 1',
      ip: '192.168.30.247',
      status: false
    }]
    this.server = this.servers[0]
    this.loadDefault()
  }
  getServers () {
    return this.servers
  }
  getCurrentServer () {
    return this.server
  }
  loadDefault () {
    this.servers.forEach((item) => {
      this.setServerStatus(item)
    })
  }
  setServerStatus (item) {
    var url = this.httpSchema + item.ip + this.port + '/api/runtime/goos'
    axios.get(url).then(response => {
      item['status'] = true
    }).catch(function (error) {
      console.log(error)
    })
  }
  setServer (server) {
    this.server = server
  }
  getCpuSumPercentEndpoint () {
    return this.getEndpoint() + '/api/cpu/sum/percent'
  }
  getEndpoint () {
    return this.httpSchema + this.server.ip + this.port
  }
  getMemoryUsageEndpoint () {
    return this.getEndpoint() + '/api/mem/virtual'
  }
  getLoadAverageEndpoint () {
    return this.getEndpoint() + '/api/load/average'
  }
  getLoadMiscEndpoint () {
    return this.getEndpoint() + '/api/load/misc'
  }
  getCpuCountEndpoint () {
    return this.getEndpoint() + '/api/cpu/count'
  }
  getCpuSumTimeEndpoint () {
    return this.getEndpoint() + '/api/cpu/sum/time'
  }
  getCpuInfoEndpoint () {
    return this.getEndpoint() + '/api/cpu/info'
  }
  getCpuPercentEndpoint () {
    return this.getEndpoint() + '/api/cpu/percent'
  }
  getVirtualMemoryEndpoint () {
    return this.getEndpoint() + '/api/mem/virtual'
  }
  getSwapMemoryEndpoint () {
    return this.getEndpoint() + '/api/mem/swap'
  }
  getHostInfoEndpoint () {
    return this.getEndpoint() + '/api/host/info'
  }
  getDiskUsageEndpoint () {
    return this.getEndpoint() + '/api/disk/usage'
  }
  getNetworkInterfaceEndpoint () {
    return this.getEndpoint() + '/api/net/interface'
  }
  getGpuInfoEndpoint () {
    return this.getEndpoint() + '/api/gpu/info'
  }
}

export default new ServerService()
