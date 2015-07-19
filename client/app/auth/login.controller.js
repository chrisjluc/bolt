(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('LoginCtrl', function ($scope, $http, $auth) {

            var vm = this;

            vm.payPalUrl = '';

            console.log($auth.isAuthenticated());

            $http
                .get('/api/auth')
                .success(function(response) {
                    vm.payPalUrl = response;
                });


            vm.authenticatePayPal = authenticatePayPal;

            function authenticatePayPal() {
                //var windowParams = 'height=500,width=500,outerWidth=500,outerHeight=500';
                var windowParams;
                window.open(vm.payPalUrl, 'PayPal Login', windowParams);
            }

        });
})();

