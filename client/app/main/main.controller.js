(function() {
    'use strict';

    angular
        .module('boltApp')
        .controller('MainCtrl', function (auth) {
            var vm = this;
            
            vm.isLoggedIn = auth.isLoggedIn;

        });
})();

