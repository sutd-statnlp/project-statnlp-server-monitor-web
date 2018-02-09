(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('MemoryController', MemoryController);

    MemoryController.$inject = ['$scope', '$state', '$ocLazyLoad', 'MemoryService', '$interval', 'DataService'];

    function MemoryController($scope, $state, $ocLazyLoad, MemoryService, $interval, DataService) {

        var vm = this;
        vm.refresh = refresh;
        vm.memory = {
            virtual: {
                "total": 0,
                "available": 0,
                "used": 0,
                "usedPercent": 0,
                "free": 0,
                "buffers": 0,
                "inactive": 0,
                "cached": 0,
                "dirty": 0,
                "writebacktmp": 0,
                "shared": 0,
                "slab": 0,
                "pagetables": 0,
                "swapcached": 0
            },
            swap: {
                "total": 0,
                "used": 0,
                "free": 0,
                "usedPercent": 0,
                "sin": 0,
                "sout": 0
            }
        };

        loadDefault(false);

        DataService.subscribe($scope, function ipChange() {
            loadDefault(true);
        });

        function loadDefault(isAttempted) {

            vm.memory = {
                virtual: {
                    "total": 0,
                    "available": 0,
                    "used": 0,
                    "usedPercent": 0,
                    "free": 0,
                    "buffers": 0,
                    "inactive": 0,
                    "cached": 0,
                    "dirty": 0,
                    "writebacktmp": 0,
                    "shared": 0,
                    "slab": 0,
                    "pagetables": 0,
                    "swapcached": 0
                },
                swap: {
                    "total": 0,
                    "used": 0,
                    "free": 0,
                    "usedPercent": 0,
                    "sin": 0,
                    "sout": 0
                }
            };

            if (!loadAll() && isAttempted)
                $('#btn-noti-error').click();
        }

        function loadAll() {
            if (DataService.getIpItem().status) {
                loadVirtualMemory();
                loadSwapMemory();
                return true;
            } else
                vm.hasTable = false;
            return false;
        }

        function refresh() {
            if (!loadAll())
                $('#btn-noti-error').click();
        }

        function loadVirtualMemory() {
            MemoryService.getVirtual().get(onSuccess, onError);

            function onSuccess(data) {
                vm.memory.virtual = data;
            }
        }
        function loadSwapMemory() {
            MemoryService.getSwap().get(onSuccess, onError);

            function onSuccess(data) {
                vm.memory.swap = data;
            }
        }

        function onError(error) {
            console.log(error);
        }
    }

})();