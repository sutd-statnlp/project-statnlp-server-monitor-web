(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state','$ocLazyLoad'];

    function NavbarController ($scope, $state,$ocLazyLoad) {
        var vm = this;

        $ocLazyLoad.load("js/admin.js");
    }
})();
