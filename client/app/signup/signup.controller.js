(function () {
	'use strict';

	angular
		.module('boltApp')
		.controller('SignUpCtrl', function ($scope, $http) {
			var vm = this;

			vm.signUp = signUp;
			vm.user = {
				first_name: '',
				last_name: '',
				email: '',
				password: '',
				confirmPassword: ''
			};

			function signUp() {
				if (!_.isEqual(vm.user.password, vm.user.confirmPassword)) {
					alert('Passwords do not match!');
					return;
				}

				var request = {
					first_name: vm.user.first_name,
					last_name: vm.user.last_name,
					email: vm.user.email,
					password: vm.user.password
				};
				$http
					.post('/api/users', request)
					.success(function (response) {
						console.log(response);
					})
					.error(function (error) {

					})
			}
		});
})();


