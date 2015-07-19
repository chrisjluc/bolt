(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('EventCtrl', function (events) {
            var vm = this;

            vm.events = events;

            vm.checkIn = checkIn;

            function checkIn(eventId) {
              $http
                .patch('./eventID/checkin', request)
                .success(function (response) {
                  console.log(response);
                })
                .error(function (error) {
                })
            }
        });
})();
