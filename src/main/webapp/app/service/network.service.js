(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('NetworkService', NetworkService);

    NetworkService.$inject = ['$resource', 'DataService'];

    function NetworkService($resource, DataService) {

        var service = {
            getInterface: getInterface
        };
        return service;

        function getInterface() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    url: DataService.getEndpoint() + '/api/net/interface'
                }
            });
            return resource;
        }


    }
})();