(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('CreateEventCtrl', function ($scope, $http) {
            var vm = this;

            vm.creatingEvent = creatingEvent;
            vm.event = {
                eventName: '',
                start_date: '',
                lateFee: 0,
                location: {
                  address: '',
                  longitude: 0,
                  latitude: 0
                },
                participants: [],
                recurring: ''
            };

            function creatingEvent() {
                var request = vm.event;
                $http
                    .post('/api/events', request)
                    .success(function (response) {
                        console.log(response);
                    })
                    .error(function (error) {

                    })
            }
        });
})();


