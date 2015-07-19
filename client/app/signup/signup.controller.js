(function () {
	'use strict';

	angular
		.module('boltApp')
		.controller('SignUpCtrl', function ($scope, $http, $auth) {
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

				var fields = _.values(vm.user);
				var fieldsEmpty = !_.every(fields, function(value) {
					return !_.isEmpty(value);
				});

				if(fieldsEmpty) {
					alert('Some fields are empty. Please fix before submitting again!');
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
						$auth.setToken(response.token);
					})
					.error(function (error) {
						alert(error);
					})
			}
		});
})();


