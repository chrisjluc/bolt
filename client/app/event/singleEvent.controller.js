(function() {
    'use strict';

    angular
        .module('boltApp')
        .controller('SingleEventCtrl', function (eventData) {
            var vm = this;

            vm.event = eventData;
        })
})();

