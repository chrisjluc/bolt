(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('EventCtrl', function (events) {
            var vm = this;

            vm.events = events;

            vm.checkIn = checkIn;

            function checkIn(eventId) {
                console.log(eventId);
            }

        });
})();
