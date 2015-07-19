(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('LoginCtrl', function ($scope, $http, $auth) {

            var vm = this;

            vm.user = {
                email: '',
                password: ''
            };

            vm.login = login;

            function login() {
                var request = {
                    email: vm.user.email,
                    password: vm.user.password
                };

                $http
                    .post('/api/auth', request)
                    .success(function(response) {
                        $auth.setToken(response.token);
                    })
                    .error(function(error) {
                        console.log(error);
                    });
            }

        });
})();

