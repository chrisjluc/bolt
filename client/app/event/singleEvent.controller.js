(function () {
	'use strict';

	angular
		.module('boltApp')
		.controller('SingleEventCtrl', function (eventData, userData, $http) {
			var vm = this;

			vm.event = eventData;
			vm.users = userData.users;
			vm.userEmails = _.map(vm.users, function (user) {
				return user.email;
			});
			vm.tags = [];

			vm.inviteUsers = inviteUsers;

			function inviteUsers() {
				var emails = _.map(vm.tags, function (tag) {
					return tag.text;
				});

				_.forEach(emails, function (email) {
					var link;
					var request = {
						email: email,
						link: link
					};
					$http
						.post('/api/sendgrid/send-email', request)
						.success(function(response) {

						})
						.error(function(error) {

						});
				})
			}
		})
})();

