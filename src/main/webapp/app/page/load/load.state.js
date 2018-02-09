(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('load', {
            parent: 'page',
            url: '/load',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/load/load.html',
                    controller: 'LoadController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
