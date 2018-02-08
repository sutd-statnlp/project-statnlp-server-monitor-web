(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('CpuController', CpuController);

    CpuController.$inject = ['$scope', '$state', '$ocLazyLoad', 'CpuService', '$interval', 'DataService'];

    function CpuController($scope, $state, $ocLazyLoad, CpuService, $interval, DataService) {

        var vm = this;
        vm.hasTable = false;
        vm.refresh = refresh;
        vm.cpu = {
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
        };

        loadDefault(false);

        DataService.subscribe($scope, function ipChange() {
            loadDefault(true);
        });

        function loadDefault(isAttempted) {
            vm.cpu = {
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
            };
            vm.hasTable = false;
            if (!loadAll() && isAttempted)
                $('#btn-noti-error').click();
        }

        function loadAll() {
            if (DataService.getIpItem().status) {
                loadCpuSumPercent();
                loadCpuCount();
                loadCpuSumTime();
                loadCpuInfo();
                return true;
            } else
                vm.hasTable = false;
            return false;
        }

        function refresh() {
            if (!loadAll())
                $('#btn-noti-error').click();
        }

        function loadCpuSumPercent() {
            CpuService.getSumPercent().get(onSuccess, onError);

            function onSuccess(data) {
                vm.cpu.sumPercent = data[0];
            }
        }

        function loadCpuSumTime() {
            CpuService.getSumTime().get(onSuccess, onError);

            function onSuccess(data) {
                vm.cpu.sumTime = data[0];
                var jiffyToHour = 100 * 60 * 60;
                var jiffyToSecond = 100;

                vm.cpu.sumTime.user = data[0].user / jiffyToHour;
                vm.cpu.sumTime.system = data[0].system / jiffyToHour;
                vm.cpu.sumTime.idle = data[0].idle / jiffyToHour;
                vm.cpu.sumTime.nice = data[0].nice / jiffyToSecond;
                vm.cpu.sumTime.iowait = data[0].iowait / jiffyToSecond;
                vm.cpu.sumTime.softirq = data[0].softirq / jiffyToSecond;
            }
        }


        function loadCpuCount() {
            CpuService.getCount().then(onSuccess, onError);

            function onSuccess(response) {
                vm.cpu.count = response.data;
            }
        }

        function loadCpuInfo() {
            CpuService.getInfo().get(onSuccess, onError);

            function onSuccess(data) {
                vm.cpu.info = data;
                loadCpuPercent();

            }
        }

        function loadCpuPercent() {
            CpuService.getPercent().get(onSuccess, onError);

            function onSuccess(data) {
                vm.cpu.percent = data;

                createTable();
            }

        }

        function createTable() {
            //Exportable table
            $('.js-exportable').DataTable({
                dom: 'Bfrtip',
                responsive: true,
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],
                "bDestroy": true
            });
            vm.hasTable = true;
        }

        function onError(error) {
            console.log(error);
        }
    }

})();