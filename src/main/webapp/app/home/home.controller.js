(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$ocLazyLoad', 'CpuService', 'MemoryService', 'DiskService', 'LoadService', '$interval'];

    function HomeController($scope, $state, $ocLazyLoad, CpuService, MemoryService, DiskService, LoadService, $interval) {
        $ocLazyLoad.load("js/pages/index.js");
        var vm = this;
        vm.cpu = {
            percent: 0
        };
        vm.memory = {
            virtual: {
                used: 0,
                usedPercent: 0
            }
        };
        vm.disk = {
            used: 0
        };

        vm.load = {
            average: 0
        };

        vm.refresh = refresh;
        vm.isAutoRefresh = false;
        vm.autoRefresh = autoRefresh;
        var refreshInterval = null;
        var cpuChart = {
            plot: null,
            data: []
        };

        var memoryChart = {
            plot: null,
            data: []
        };

        loadAll();
        initCpuChart();
        initMemoryChart();

        function refresh() {
            loadAll();
        }

        function autoRefresh() {

            if (vm.isAutoRefresh) {
                refreshInterval = $interval(function () {
                    loadAll();
                }, 800);
            } else {
                $interval.cancel(refreshInterval);
            }

        }

        function loadAll() {
            loadCpu();
            loadMemory();
            loadDisk();
            loadAverage();
        }

        function loadCpu() {
            CpuService.getSumPercent({}, onSuccess, onError);

            function onSuccess(data) {
                vm.cpu.percent = data[0];
                updateChart(data[0],cpuChart);
            }
        }

        function loadMemory() {
            MemoryService.getVirtual({}, onSuccess, onError);

            function onSuccess(data) {
                vm.memory.virtual.used = data.used;
                vm.memory.virtual.usedPercent = data.usedPercent;
                updateChart(data.usedPercent,memoryChart);
            }
        }

        function loadDisk() {
            DiskService.getUsage({}, onSuccess, onError);

            function onSuccess(data) {
                vm.disk.used = data.used;
            }
        }

        function loadAverage() {
            LoadService.getAverage({}, onSuccess, onError);

            function onSuccess(data) {
                vm.load.average = data.load1;
            }
        }

        function onError(error) {
            console.log(error);
        }

        function updateChart(item,chart) {
            var dataLength = chart.data.length;
            if (dataLength > 100) chart.data = chart.data.slice(1);
            chart.data.push(item);
            var res = [];
            for (var i = 0; i < dataLength; ++i) {
                res.push([i, chart.data[i]]);
            }
            chart.plot.setData([res]);
            chart.plot.draw();
        }

        function initCpuChart() {
            cpuChart.plot = $.plot('#cpu-chart', [cpuChart.data], {
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
            });

        }

        function initMemoryChart() {
            memoryChart.plot = $.plot('#memory-chart', [memoryChart.data], {
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
            });

        }
    }

})();