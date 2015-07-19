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
						})
						.error(function (error) {
							vm.buttonIdLoading = '';
						})
				}
			}

			function isButtonLoading(eventId) {
				return _.isEqual(vm.buttonIdLoading, eventId);
			}

			function toggleAsyncButton(button) {
				var button = vm.asyncButtons[button];

				button.disabled = !button.disabled;
				button.text = button.disabled ? button.disabledText : button.enabledText;
			}
		});
})();
