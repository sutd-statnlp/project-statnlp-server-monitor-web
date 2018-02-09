(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('disk', {
            parent: 'page',
            url: '/disk',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/disk/disk.html',
                    controller: 'DiskController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
