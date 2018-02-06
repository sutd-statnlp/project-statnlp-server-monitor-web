(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('LoadService', LoadService);

    LoadService.$inject = ['$resource','DataService'];

    function LoadService($resource,DataService) {

        var endPoint = DataService.getEndpoint();
        return $resource('', {}, {
            'getAverage': { method: 'GET', url: endPoint + '/api/load/average' }
        });

    }
})();
