(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('network', {
            parent: 'page',
            url: '/network',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/network/network.html',
                    controller: 'NetworkController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
