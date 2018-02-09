(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('NetworkController', NetworkController);

    NetworkController.$inject = ['$scope', '$state', 'NetworkService', '$interval', 'DataService', 'DateUtils'];

    function NetworkController($scope, $state, NetworkService, $interval, DataService, DateUtils) {

        var vm = this;
        vm.hasTable = false;
        vm.refresh = refresh;
        vm.network = {
            interface: []
        };

        vm.isAutoRefresh = false;
        networkDefault(false);

        DataService.subscribe($scope, function ipChange() {
            networkDefault(true);
        });

        function networkDefault(isAttempted) {

            vm.network = {
                interface: []
            };
            if (!networkAll() && isAttempted)
                $('#btn-noti-error').click();
        }

        function networkAll() {
            if (DataService.getIpItem().status) {
                loadInterface();
                return true;
            } else
                vm.hasTable = false;
            return false;
        }

        function refresh() {
            if (!networkAll())
                $('#btn-noti-error').click();
        }

        function loadInterface() {
            NetworkService.getInterface().get(onSuccess, onError);

            function onSuccess(data) {
                vm.network.interface = data;
            }
        }

        function onError(error) {
            console.log(error);
        }
    }

})();