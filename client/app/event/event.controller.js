(function () {
	'use strict';

	angular
		.module('boltApp')
		.controller('EventCtrl', function (events, $http) {
			var vm = this;

			vm.events = events;

			vm.checkIn = checkIn;

			function checkIn(eventId) {
				var request = {
					coordinates: {
						latitude: '',
						longitude: ''
					}
				};
        navigator.geolocation.getCurrentPosition(successCallback);

        function successCallback(position) {
          vm.event.latitude = position.coords.latitude;
          vm.event.longitude = position.coords.longitude;
          $http
            .patch('api/events/' + eventId + '/checkin', request)
            .success(function (response) {
              console.log(response);
            })
            .error(function (error) {
            })
        }
			}
		});
})();
