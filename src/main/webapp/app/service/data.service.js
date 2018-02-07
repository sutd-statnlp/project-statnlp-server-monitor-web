(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('DataService', DataService);

    DataService.$inject = ['$resource', '$rootScope','IpService'];

    function DataService($resource,$rootScope, IpService) {
        var httpSchema = IpService.httpSchema;
        var ipItem = IpService.getDefault();
        var port = IpService.port;

        var service = {
            getEndpoint: getEndpoint,
            setEndpointByIpOrDomain: setEndpointByIpOrDomain,
            subscribe: subscribe,
            notify: notify,
            getIpItem: getIpItem
        };
        return service;

        function getEndpoint() {
            var endpointUrl = httpSchema + ipItem.ip + port;
            return endpointUrl;
        }

        function setEndpointByIpOrDomain(item) {
            ipItem = item;
            notify();
        }

        function getIpItem() {
            return ipItem;
        }

        function subscribe(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        }

        function notify() {
            $rootScope.$emit('notifying-service-event');
        }
    }
})();