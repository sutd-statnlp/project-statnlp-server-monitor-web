(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('host', {
            parent: 'page',
            url: '/host',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/host/host.html',
                    controller: 'HostController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
