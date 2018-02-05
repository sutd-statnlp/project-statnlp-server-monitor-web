(function() {
    'use strict';

    angular
        .module('statnlpApp', [
            'ngResource',
            'ngAria',
            'ui.router',
            'angular-loading-bar',
            'oc.lazyLoad',
            'angular-filters'
        ])
        .run(run);

    run.$inject = ['stateHandler'];

    function run(stateHandler) {
        stateHandler.initialize();
    }
})();
