(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$ocLazyLoad', 'CpuService', 'MemoryService', 'DiskService', 'LoadService', '$interval', 'DataService'];

    function HomeController($scope, $state, $ocLazyLoad, CpuService, MemoryService, DiskService, LoadService, $interval, DataService) {
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
        vm.load = {
            average: 0,
            misc: {
                procsRunning: 0
            }
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

        loadDefault(false);

        DataService.subscribe($scope, function ipChange() {
            loadDefault(true);
        });

        function loadDefault(isAttempted) {
            vm.cpu = {
                percent: 0
            };
            vm.memory = {
                virtual: {
                    used: 0,
                    usedPercent: 0
                }
            };
            vm.load = {
                average: 0,
                misc: {
                    procsRunning: 0
                }
            };

            cpuChart = {
                plot: null,
                data: []
            };

            memoryChart = {
                plot: null,
                data: []
            };

            if (!loadAll() && isAttempted)
                $('#btn-noti-error').click();

            initCpuChart();
            initMemoryChart();
        }

        function refresh() {
            if (!loadAll())
                $('#btn-noti-error').click();
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
            if (DataService.getIpItem().status) {
                loadCpu();
                loadMemory();
                loadAverage();
                loadMisc();
                return true;
            }
            return false;
        }

        function loadCpu() {
            CpuService.getSumPercent().get(onSuccess, onError);

            function onSuccess(data) {
                vm.cpu.percent = data[0];
                updateChart(data[0], cpuChart);
            }
        }

        function loadMemory() {
            MemoryService.getVirtual().get(onSuccess, onError);

            function onSuccess(data) {
                vm.memory.virtual.used = data.used;
                vm.memory.virtual.usedPercent = data.usedPercent;
                updateChart(data.usedPercent, memoryChart);
            }
        }

        function loadAverage() {
            LoadService.getAverage().get(onSuccess, onError);

            function onSuccess(data) {
                vm.load.average = data.load1;
            }
        }

        function loadMisc() {
            LoadService.getMisc().get(onSuccess, onError);

            function onSuccess(data) {
                vm.load.misc.procsRunning = data.procsRunning;
            }
        }

        function onError(error) {
            console.log(error);
        }

        function updateChart(item, chart) {
            chart.data.push(item);
            var dataLength = chart.data.length;
            if (dataLength > 100) chart.data = chart.data.slice(1);
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