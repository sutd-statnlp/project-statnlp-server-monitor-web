(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('memory', {
            parent: 'page',
            url: '/memory',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/memory/memory.html',
                    controller: 'MemoryController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
