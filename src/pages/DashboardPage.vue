<template>
  <div class="m-home">
    <div class="container-fluid">
        <div class="block-header row">
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                <RefreshButton :refresh="refresh" :isAutoRefresh="isAutoRefresh" />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6 text-right">
                <div class="demo-switch-title">AUTO REFRESH</div>
                <div class="switch">
                    <label>
                        <input type="checkbox" v-model="isAutoRefresh" v-on:change="setAutoRefresh()">
                        <span class="lever switch-col-blue"></span>
                    </label>
                </div>
            </div>
        </div>

        <!-- Widgets -->
        <div class="row clearfix">
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <InfoBox icon="developer_board" title="cpu usage" :value="getCpu.percent | limit(4,' %')"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <InfoBox icon="memory" title="MEMORY USAGE" :value="getMemory.virtual.usedPercent | limit(6,'%')"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <InfoBox icon="power_input" title="LOAD ONE" :value="getLoad.average"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <InfoBox icon="graphic_eq" title="MISC RUNNING" :value="getLoad.misc.procsRunning"/>
            </div>
        </div>

    <!-- CPU Usage -->
        <div class="row clearfix">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <CardChart :id="cpuChart.id" title="CPU USAGE (%)" />
            </div>
        </div>
        <!-- Memory Usage -->
        <div class="row clearfix">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <CardChart :id="memoryChart.id" title="MEMORY USAGE (%)" />
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import InfoBox from '@/components/InfoBox'
import CardChart from '@/components/CardChart'
import RefreshButton from '@/components/RefreshButton'
import AlterService from '@/services/alter-service'

export default {
  components: {
    InfoBox,
    CardChart,
    RefreshButton
  },
  name: 'DashboardPage',
  data () {
    return {
      cpuChart: {
        id: 'cpu-chart',
        plot: null,
        data: []
      },
      memoryChart: {
        id: 'memory-chart',
        plot: null,
        data: []
      },
      isAutoRefresh: false
    }
  },
  methods: {
    refresh () {
      let server = this.$store.getters['getCurrentServer']
      if (server.status) {
        this.$store.dispatch('dashboard/getAll')
      } else {
        this.isAutoRefresh = false
        clearInterval(this.interval)
        AlterService.serverNotAvailable()
        this.$store.dispatch('dashboard/loadDefaultData')
      }
    },
    updateChart (item, chart) {
      if (chart.plot === null) {
        return
      }
      chart.data.push(item)
      var dataLength = chart.data.length
      if (dataLength > 100) chart.data = chart.data.slice(1)
      var res = []
      for (var i = 0; i < dataLength; ++i) {
        res.push([i, chart.data[i]])
      }
      chart.plot.setData([res])
      chart.plot.draw()
    },
    initChart (chart) {
      chart.plot = $.plot('#' + chart.id, [chart.data], {
        series: {
          shadowSize: 0,
          color: '#03A9F4'
        },
        grid: {
          borderColor: '#81D4FA',
          borderWidth: 1,
          tickColor: '#81D4FA'
        },
        lines: {
          fill: true
        },
        yaxis: {
          min: 0,
          max: 100
        },
        xaxis: {
          min: 0,
          max: 100
        }
      })
    },
    setAutoRefresh () {
      if (this.isAutoRefresh) {
        this.interval = setInterval(function () {
          this.refresh()
        }.bind(this), 800)
      } else {
        clearInterval(this.interval)
      }
    }
  },
  computed: {
    getCpu () {
      let cpu = this.$store.getters['dashboard/getCpu']
      this.updateChart(cpu.percent, this.cpuChart)
      return cpu
    },
    getMemory () {
      let memory = this.$store.getters['dashboard/getMemory']
      this.updateChart(memory.virtual.usedPercent, this.memoryChart)
      return memory
    },
    getLoad () {
      return this.$store.getters['dashboard/getLoad']
    }
  },
  mounted () {
    let cpuChartId = '#' + this.cpuChart.id
    let memoryChartId = '#' + this.memoryChart.id
    if (window.innerWidth <= 440) {
      $(cpuChartId).css('width', '260')
      $(memoryChartId).css('width', '260')
    }
    $(window).resize(function () {
      if (window.innerWidth > 440) {
        $(cpuChartId).css('width', '100%')
        $(memoryChartId).css('width', '100%')
      }
    })

    this.initChart(this.cpuChart)
    this.initChart(this.memoryChart)
  }
}
</script>

<style scoped>

</style>
