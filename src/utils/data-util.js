export default {
  optimizeGpuData (inputGPUs) {
    let gpus = []
    inputGPUs.forEach(item => {
      let processInfo = []
      let itemProcessInfo = item.processes.process_info
      if (!Array.isArray(itemProcessInfo) && (itemProcessInfo instanceof Object)) {
        processInfo.push(itemProcessInfo)
      }
      gpus.push({
        productName: item.product_name,
        productBrand: item.product_brand,
        performanceState: item.performance_state,
        utilization: item.utilization.gpu_util,
        fanSpeed: item.fan_speed,
        powerDraw: item.power_readings.power_draw,
        powerLimit: item.power_readings.power_limit,
        processes: processInfo,
        uuid: item.uuid,
        temperature: item.temperature.gpu_temp,
        memory: item.fb_memory_usage
      })
    })
    return gpus
  }
}
