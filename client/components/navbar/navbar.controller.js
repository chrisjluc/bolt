(function() {
    'use strict';

    angular
        .module('boltApp')
        .controller('NavbarCtrl', function ($scope, $location, auth, $http, $state) {
            var vm = this;

            vm.loginText = 'Login';
            vm.signUpText = 'Sign Up';

            vm.login = login;
            vm.signUp = signUp;
            vm.isLoggedIn = isLoggedIn;
            vm.logout = logout;

            $scope.isActive = function (route) {
                return route === $location.path();
            };

            function login() {
                $state.go('bolt.login');
            }

            function signUp() {
                $state.go('bolt.signUp');
            }

            function isLoggedIn() {
                return auth.isLoggedIn();
            }

            function logout() {
                return auth.logout();
            }
        });
})();