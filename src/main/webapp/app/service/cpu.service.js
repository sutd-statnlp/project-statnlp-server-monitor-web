(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('CpuService', CpuService);

    CpuService.$inject = ['$resource','DataService'];

    function CpuService($resource,DataService) {

        var endPoint = DataService.getEndpoint();
        return $resource('', {}, {
            'getSumPercent': { method: 'GET', isArray: true, url: endPoint + '/api/cpu/sum/percent' },
            'getSumTime': { method: 'GET', isArray: true, url: endPoint + '/api/cpu/sum/time' }
        });

    }
})();
