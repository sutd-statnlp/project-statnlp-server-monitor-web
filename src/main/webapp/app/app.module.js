(function() {
    'use strict';

    angular
        .module('statnlpApp', [
            'ngResource',
            'ngAria',
            'ui.router',
            'oc.lazyLoad',
            'angular.filter'
        ])
        .run(run);

    run.$inject = ['stateHandler'];

    function run(stateHandler) {
        stateHandler.initialize();
    }
})();
