(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('CreateGroupCtrl', function ($scope, $http) {
            var vm = this;

            vm.creatingGroup = creatingGroup;

            function creatingGroup(name) {
                $http.post('/api/groups', {
                    groupName: name
                }).success(function(response) {
                    console.log(response);
                });
            }
        });
})();

