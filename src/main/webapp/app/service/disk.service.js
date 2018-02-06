(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('DiskService', DiskService);

    DiskService.$inject = ['$resource','DataService'];

    function DiskService($resource,DataService) {

        var endPoint = DataService.getEndpoint();
        return $resource('', {}, {
            'getUsage': { method: 'GET', url: endPoint + '/api/disk/usage' }
        });

    }
})();
