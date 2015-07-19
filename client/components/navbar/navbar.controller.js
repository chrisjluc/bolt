(function() {
    'use strict';

    angular
        .module('boltApp')
        .controller('NavbarCtrl', function ($scope, $location, auth, $http) {
            var vm = this;

            vm.loginText = 'Login';

            vm.login = login;
            vm.isLoggedIn = isLoggedIn;
            vm.logout = logout;

            $scope.isActive = function (route) {
                return route === $location.path();
            };

            function login() {
                vm.loginText = 'Loading...';

                $http
                    .get('/api/auth')
                    .success(function(response) {
                        window.open(response, 'PayPal Login');
                    });
            }

            function isLoggedIn() {
                return auth.isLoggedIn();
            }

            function logout() {
                return auth.logout();
            }
        });
})();