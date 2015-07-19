(function() {
    'use strict';

    angular
        .module('boltApp')
        .controller('SingleGroupCtrl', function (groupData) {
            var vm = this;

            vm.group = groupData;


            //dataResolver.resolve('/api/groups');

        })
})();

