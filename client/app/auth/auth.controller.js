(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('AuthCtrl', function ($scope, $http, $stateParams) {
            console.log($stateParams);
            //$http.get('/api/auth/paypal-account');
        });
})();

