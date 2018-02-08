(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('cpu', {
            parent: 'page',
            url: '/cpu',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/cpu/cpu.html',
                    controller: 'CpuController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
