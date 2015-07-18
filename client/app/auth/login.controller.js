(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('LoginCtrl', function ($scope, $http) {

            $http
                .get('/api/auth')
                .success(function(response) {
                    console.log(response);
                });
        });
})();

