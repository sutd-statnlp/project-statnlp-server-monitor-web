(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('DiskController', DiskController);

    DiskController.$inject = ['$scope', '$state', 'DiskService', '$interval', 'DataService', 'DateUtils'];

    function DiskController($scope, $state, DiskService, $interval, DataService, DateUtils) {

        var vm = this;
        vm.hasTable = false;
        vm.refresh = refresh;
        vm.disk = {
            usage: {
                "total": 0,
                "free": 0,
                "used": 0,
                "usedPercent": 0,
                "inodesTotal": 0,
                "inodesUsed": 0,
                "inodesFree": 0,
                "inodesUsedPercent": 0
            }
        };

        vm.isAutoRefresh = false;
        diskDefault(false);

        DataService.subscribe($scope, function ipChange() {
            diskDefault(true);
        });

        function diskDefault(isAttempted) {

            vm.disk = {
                usage: {
                    "total": 0,
                    "free": 0,
                    "used": 0,
                    "usedPercent": 0,
                    "inodesTotal": 0,
                    "inodesUsed": 0,
                    "inodesFree": 0,
                    "inodesUsedPercent": 0
                }
            };
            if (!diskAll() && isAttempted)
                $('#btn-noti-error').click();
        }

        function diskAll() {
            if (DataService.getIpItem().status) {
                loadUsage();
                return true;
            } else
                vm.hasTable = false;
            return false;
        }

        function refresh() {
            if (!diskAll())
                $('#btn-noti-error').click();
        }

        function loadUsage() {
            DiskService.getUsage().get(onSuccess, onError);

            function onSuccess(data) {
                vm.disk.usage = data;
            }
        }

        function onError(error) {
            console.log(error);
        }
    }

})();