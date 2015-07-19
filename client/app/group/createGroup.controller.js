(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('CreateGroupCtrl', function ($scope, $http) {
            var vm = this;

            vm.creatingGroup = creatingGroup;

            function creatingGroup(name) {
              console.log(name);
            }
        });
})();

