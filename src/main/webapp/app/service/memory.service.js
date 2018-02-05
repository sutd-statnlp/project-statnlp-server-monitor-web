(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('MemoryService', MemoryService);

    MemoryService.$inject = ['$resource','DataService'];

    function MemoryService($resource,DataService) {

        var endPoint = DataService.getEndpoint();
        return $resource('', {}, {
            'getVirtual': { method: 'GET', url: endPoint + '/api/mem/virtual' },
            'getSwap': { method: 'GET', url: endPoint + '/api/mem/swap' }
        });

    }
})();
