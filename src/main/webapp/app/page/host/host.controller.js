(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('HostController', HostController);

    HostController.$inject = ['$scope', '$state', '$ocLazyLoad', 'HostService', '$interval', 'DataService','DateUtils'];

    function HostController($scope, $state, $ocLazyLoad, HostService, $interval, DataService,DateUtils) {

        var vm = this;
        vm.hasTable = false;
        vm.refresh = refresh;
        vm.host = {
            info: {
                "uptime": 0,
                "bootTime": 0,
                "procs": 0,
                "os": "",
                "platform": "",
                "platformFamily": "",
                "platformVersion": "",
                "kernelVersion": ""
            },
            temperature: []
        };

        loadDefault(false);

        DataService.subscribe($scope, function ipChange() {
            loadDefault(true);
        });

        function loadDefault(isAttempted) {

            vm.host = {
                info: {
                    "uptime": 0,
                    "bootTime": 0,
                    "procs": 0,
                    "os": "",
                    "platform": "",
                    "platformFamily": "",
                    "platformVersion": "",
                    "kernelVersion": ""
                },
                temperature: []
            };
            if (!loadAll() && isAttempted)
                $('#btn-noti-error').click();
        }

        function loadAll() {
            if (DataService.getIpItem().status) {
                loadHostInfo();
                loadHostTemperature();
                return true;
            } else
                vm.hasTable = false;
            return false;
        }

        function refresh() {
            if (!loadAll())
                $('#btn-noti-error').click();
        }

        function loadHostInfo() {
            HostService.getInfo().get(onSuccess, onError);

            function onSuccess(data) {
                vm.host.info = data;
                vm.host.info.uptime = DateUtils.secondsToTime(data.uptime);
                vm.host.info.bootTime = DateUtils.unixTimeToDateString(data.bootTime);
            }
        }

        function loadHostTemperature() {
            HostService.getTemperature().get(onSuccess, onError);

            function onSuccess(data) {
                vm.host.temperature = data;
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