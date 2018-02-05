(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state','$ocLazyLoad','CpuService','MemoryService'];

    function HomeController ($scope, $state,$ocLazyLoad,CpuService,MemoryService) {
        $ocLazyLoad.load("js/pages/index.js");
        var vm = this;
        vm.cpu = {
            percent: 0
        };
        vm.memory = {
            virtual: {
                used: 0
            }
        };


        loadCpu();
        loadMemory();

        function loadCpu() {
            CpuService.getSumPercent({},onSuccess,onError);
            function onSuccess(data) {
                vm.cpu.percent = data[0];
            }
        }

        function loadMemory() {
            MemoryService.getVirtual({},onSuccess,onError);
            function onSuccess(data) {
                vm.memory.virtual.used = data.used;
            }
        }

        function onError(error) {
            console.log(error);
        }
    }
})();
