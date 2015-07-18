(function() {
    'use strict';

    angular
        .module('boltApp')
        .controller('NavbarCtrl', function ($scope, $location) {
            $scope.menu = [{
                'title': 'Dashboard',
                'link': '/'
            }];

            $scope.isCollapsed = true;

            $scope.isActive = function (route) {
                return route === $location.path();
            };
        });
})();