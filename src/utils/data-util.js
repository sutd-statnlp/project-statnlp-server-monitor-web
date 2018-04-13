class DataUtil {
  optimizeGpuData (inputGPUs) {
    let gpus = []
    inputGPUs.forEach(item => {
      gpus.push({
        productName: item.product_name,
        productBrand: item.product_brand,
        performanceState: item.performance_state,
        utilization: item.utilization.gpu_util,
        fanSpeed: item.fan_speed,
        powerDraw: item.power_readings.power_draw,
        powerLimit: item.power_readings.power_limit,
        processes: this.getProcessInfo(item),
        uuid: item.uuid,
        temperature: item.temperature.gpu_temp,
        memory: item.fb_memory_usage
      })
    })
    return gpus
  }
  getProcessInfo (item) {
    let processInfo = []
    let itemProcessInfo = item.processes.process_info
    if (!Array.isArray(itemProcessInfo) && (itemProcessInfo instanceof Object)) {
      processInfo.push(itemProcessInfo)
    }
    return processInfo
  }
  convertByteToBiggerUnit (input, limit) {
    if (typeof input !== 'number' || isNaN(input)) {
      input = parseFloat(input)
    }
    if (typeof limit !== 'number' || isNaN(limit)) {
      limit = 2
    }
    var exponent
    var unit
    var neg = input < 0
    var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    if (neg) {
      input = -input
    }

    if (input < 1) {
      return (neg ? '-' : '') + input + ' B'
    }

    exponent = Math.min(Math.floor(Math.log(input) / Math.log(1000)), units.length - 1)
    input = (input / Math.pow(1000, exponent)).toFixed(limit) * 1
    unit = units[exponent]

    return (neg ? '-' : '') + input + ' ' + unit
  }
}

export default new DataUtil()
