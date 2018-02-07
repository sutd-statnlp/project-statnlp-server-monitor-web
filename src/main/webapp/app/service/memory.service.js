(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('MemoryService', MemoryService);

    MemoryService.$inject = ['$resource', 'DataService'];

    function MemoryService($resource, DataService) {
      
        var service = {
            getVirtual: getVirtual,
            getSwap: getSwap
        };
        return service;

        function getVirtual() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    url: DataService.getEndpoint() + '/api/mem/virtual'
                }
            });
            return resource;
        }

        function getSwap() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    url: DataService.getEndpoint() + '/api/mem/swap'
                }
            });
            return resource;
        }

    }
})();