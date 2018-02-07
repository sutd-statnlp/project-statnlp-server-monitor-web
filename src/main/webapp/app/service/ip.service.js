(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('IpService', IpService);

    IpService.$inject = ['$resource', '$http'];

    function IpService($resource, $http) {
        var httpSchema = 'http://';
        var port = ':8210';
        var ips = [{
            name: 'StatNLP 0',
            ip: '172.18.240.110',
            status: false
        }, 
        {
            name: 'StatNLP 1',
            ip: '192.168.30.238',
            status: false
        }, 
        {
            name: 'StatNLP 3',
            ip: '192.168.30.231',
            status: false
        },{
            name: 'MLCluster 1',
            ip: '192.168.30.247',
            status: false
        }];

        loadDefault();

        var service = {
            httpSchema: httpSchema,
            port: port,
            getDefault: getDefault,
            getAll: getAll
        };
        return service;

        function getAll() {
            return ips;
        }

        function getDefault() {
            return ips[0];
        }

        function loadDefault() {
            for (var i = 0; i < ips.length; i++) {
                var item = ips[i];
                setServerStatus(item);
            }
        }

        function setServerStatus(item) {
            var url = httpSchema + item.ip + port + '/api/runtime/goos';
            $http.get(url, {})
                .then(
                    function (response) {
                        item['status'] = true;
                    },
                    function (response) {
                        item['status'] = false;
                    }
                );
        }
    }
})();