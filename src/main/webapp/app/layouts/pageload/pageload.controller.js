(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('PageLoadController', PageLoadController);

    PageLoadController.$inject = ['$scope', '$state','$ocLazyLoad'];

    function PageLoadController ($scope, $state,$ocLazyLoad) {
        var vm = this;
    }
})();
