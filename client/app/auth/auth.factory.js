(function () {
    'use strict';

    angular
        .module('boltApp')
        .factory('auth', function ($auth) {
            var authentication = {
                isLoggedIn: isLoggedIn,
                logout: logout
            };

            function isLoggedIn() {
                return $auth.isAuthenticated();
            }

            function logout() {
                return $auth.logout();
            }

            return authentication;
        });
})();