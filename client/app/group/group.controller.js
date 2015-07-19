(function() {
    'use strict';

    angular
        .module('boltApp')
        .controller('GroupCtrl', function ($scope, $http) {
        var vm = this;
        vm.nameValues = nameValues;

        function nameValues() {
           document.getElementId("listNames").value = "";
        }
        });
})();

