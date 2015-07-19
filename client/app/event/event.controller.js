(function () {
	'use strict';

	angular
		.module('boltApp')
		.controller('EventCtrl', function (events, $http) {
			var vm = this;

			vm.events = events;
			vm.buttonIdLoading = '';

			vm.checkIn = checkIn;
			vm.asyncButtons = {
				checkIn: {
					text: 'Check In',
					enabledText: 'Check In',
					disabledText: 'Checking In...',
					disabled: false
				}
			};

			vm.isButtonLoading = isButtonLoading;

			function checkIn(eventId) {
				vm.buttonIdLoading = eventId;
				navigator.geolocation.getCurrentPosition(successCallback);
				function successCallback(position) {
					var request = {
						coordinates: {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
						}
					};
					$http
						.patch('api/events/' + eventId + '/checkin', request)
						.success(function (response) {
							vm.buttonIdLoading = '';
							console.log(response);

							var modifiedEvent = _.find(vm.events, function(event) {
								return event._id === eventId;
							});

							modifiedEvent.checked = true;
							modifiedEvent.allowCheckIn = false;
							modifiedEvent.validCheckIn = true;
							modifiedEvent.distance = Math.round(response.distance/1000) + 'km';
						})
						.error(function (error) {
							vm.buttonIdLoading = '';
							console.log(error);

							var modifiedEvent = _.find(vm.events, function(event) {
								return event._id === eventId;
							});

							modifiedEvent.checked = true;
							modifiedEvent.allowCheckIn = false;
							modifiedEvent.validCheckIn = false;
							modifiedEvent.distance = Math.round(error.distance/1000) + 'km';
						});
				}
			}

			function isButtonLoading(eventId) {
				return _.isEqual(vm.buttonIdLoading, eventId);
			}
		});
})();
