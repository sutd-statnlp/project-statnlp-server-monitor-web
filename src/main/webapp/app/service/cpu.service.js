(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('CpuService', CpuService);

    CpuService.$inject = ['$resource', 'DataService'];

    function CpuService($resource, DataService) {

        var service = {
            getSumPercent: getSumPercent,
            getSumTime: getSumTime
        };

        function getSumPercent() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    url: DataService.getEndpoint() + '/api/cpu/sum/percent'
                }
            });
            return resource;
        }

        function getSumTime(params) {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    url: DataService.getEndpoint() + '/api/cpu/sum/time'
                }
            });
            return resource;
        }

        return service;

    }
})();