(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('DiskService', DiskService);

    DiskService.$inject = ['$resource', 'DataService'];

    function DiskService($resource, DataService) {

        var service = {
            getUsage: getUsage
        };
        return service;

        function getUsage() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    url: DataService.getEndpoint() + '/api/disk/usage'
                }
            });
            return resource;
        }


    }
})();