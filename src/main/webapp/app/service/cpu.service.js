(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('CpuService', CpuService);

    CpuService.$inject = ['$resource', '$http', 'DataService'];

    function CpuService($resource, $http, DataService) {

        var service = {
            getSumPercent: getSumPercent,
            getSumTime: getSumTime,
            getCount: getCount,
            getInfo: getInfo,
            getPercent: getPercent
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

        function getCount() {
            return $http.get(DataService.getEndpoint() + '/api/cpu/count');
        }

        function getSumTime() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    url: DataService.getEndpoint() + '/api/cpu/sum/time'
                }
            });
            return resource;
        }

        function getInfo() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    url: DataService.getEndpoint() + '/api/cpu/info'
                }
            });
            return resource;
        }

        function getPercent() {
            var resource = $resource('', {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    url: DataService.getEndpoint() + '/api/cpu/percent'
                }
            });
            return resource;
        }

        return service;

    }
})();