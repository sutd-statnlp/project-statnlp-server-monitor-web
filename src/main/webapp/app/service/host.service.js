(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('HostService', HostService);

    HostService.$inject = ['$resource', 'DataService'];

    function HostService($resource, DataService) {

        var service = {
            getInfo: getInfo,
            getTemperature: getTemperature
        };
        return service;

        function getInfo() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    url: DataService.getEndpoint() + '/api/host/info'
                }
            });
            return resource;
        }

        function getTemperature() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    url: DataService.getEndpoint() + '/api/host/temperature'
                }
            });
            return resource;
        }

    }
})();