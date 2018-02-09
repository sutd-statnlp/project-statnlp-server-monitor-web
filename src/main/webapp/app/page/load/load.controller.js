(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('LoadController', LoadController);

    LoadController.$inject = ['$scope', '$state', '$ocLazyLoad', 'LoadService', '$interval', 'DataService', 'DateUtils'];

    function LoadController($scope, $state, $ocLazyLoad, LoadService, $interval, DataService, DateUtils) {

        var vm = this;
        vm.hasTable = false;
        vm.refresh = refresh;
        vm.load = {
            average: {
                "load1": 0,
                "load5": 0,
                "load15": 0
            },
            misc: {
                "procsRunning": 0,
                "procsBlocked": 0,
                "ctxt": 0
            }
        };

        vm.isAutoRefresh = false;
        vm.autoRefresh = autoRefresh;
        var refreshInterval = null;

        loadDefault(false);

        DataService.subscribe($scope, function ipChange() {
            loadDefault(true);
        });

        function loadDefault(isAttempted) {

            vm.load = {
                average: {
                    "load1": 0,
                    "load5": 0,
                    "load15": 0
                },
                misc: {
                    "procsRunning": 0,
                    "procsBlocked": 0,
                    "ctxt": 0
                }
            };
            if (!loadAll() && isAttempted)
                $('#btn-noti-error').click();
        }

        function loadAll() {
            if (DataService.getIpItem().status) {
                loadAverage();
                loadMisc();
                return true;
            } else
                vm.hasTable = false;
            return false;
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

        function loadAverage() {
            LoadService.getAverage().get(onSuccess, onError);

            function onSuccess(data) {
                vm.load.average = data;
            }
        }

        function loadMisc() {
            LoadService.getMisc().get(onSuccess, onError);

            function onSuccess(data) {
                vm.load.misc = data;
            }
        }

        function onError(error) {
            console.log(error);
        }
    }

})();