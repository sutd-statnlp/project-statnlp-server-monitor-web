(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('DataService', DataService);

    DataService.$inject = ['$resource'];

    function DataService($resource) {

        var endpointUrl = 'http://localhost:8210';

        var service = {
            getEndpoint: getEndpoint
        };
        return service;

        function getEndpoint() {
            return endpointUrl;
        }
    }
})();
