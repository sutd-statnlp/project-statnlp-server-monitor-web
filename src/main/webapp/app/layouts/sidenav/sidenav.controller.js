(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('SidenavController', SidenavController);

    SidenavController.$inject = ['$scope', '$state', '$ocLazyLoad'];

    function SidenavController($scope, $state, $ocLazyLoad) {
        var vm = this;

        var currentState = $state.current.name;

        $(document).ready(function () {
            var navEle = $('.m-sidenav ul li');
            navEle.each(function () {
                if (currentState === $(this).attr('data-state')) {
                    activateNavEle($(this));
                }
            });

            navEle.click(function () {
                activateNavEle($(this));
            });

            function activateNavEle(ele) {
                navEle.removeClass('active');
                ele.addClass('active');
            }
            $('.navbar-brand').click(function () {
                navEle.removeClass('active');
            });

           
        });
    }
})();