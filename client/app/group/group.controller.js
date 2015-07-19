(function() {
    'use strict';

    angular
        .module('boltApp')
        .controller('GroupCtrl', function ($scope, $http, groups) {
            var vm = this;

            vm.groups = groups;

            //dataResolver.resolve('/api/groups');

        })
})();

