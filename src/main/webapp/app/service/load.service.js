(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('LoadService', LoadService);

    LoadService.$inject = ['$resource', 'DataService'];

    function LoadService($resource, DataService) {

        var service = {
            getAverage: getAverage,
            getMisc: getMisc
        };
        return service;

        function getAverage() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    url: DataService.getEndpoint() + '/api/load/average'
                }
            });
            return resource;
        }

        function getMisc() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    url: DataService.getEndpoint() + '/api/load/misc'
                }
            });
            return resource;
        }

    }
})();