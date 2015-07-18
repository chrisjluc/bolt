(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('RedirectCtrl', function ($scope, $http, $stateParams) {
              console.log($stateParams);
            //$http.get('/api/auth/paypal-account');

        });
})();

