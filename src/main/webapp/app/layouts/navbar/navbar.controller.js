(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state','$ocLazyLoad','DataService','IpService'];

    function NavbarController ($scope, $state,$ocLazyLoad,DataService,IpService) {

        $ocLazyLoad.load("js/admin.js");
        var vm = this;
        vm.pickServer = pickServer;

        vm.ips = IpService.getAll();


        function pickServer($event,ipItem) {
            $('.m-menu-item').removeClass('m-item-active');
            var item = angular.element($event.currentTarget);
            item.addClass('m-item-active');
            DataService.setEndpointByIpOrDomain(ipItem);
        }
    }
})();
