(function () {
	'use strict';

	angular
		.module('boltApp')
		.controller('SingleEventCtrl', function (eventData, userData, usersData, $http, $state, paymentsData) {
			var vm = this;
			var link = 'http://localhost:9000/join/event/' + eventData.joinToken;

            vm.event = eventData;
            vm.users = usersData.users;
            vm.payments = paymentsData;
            vm.userEmails = _.map(vm.users, function (user) {
                return user.email;
            });
			filterEmails();
            vm.tags = [];
            vm.totalOwing = getTotalOwing();

			vm.longLink = 'http://127.0.0.1:9000/join/event/' + vm.event.joinToken;

			vm.inviteUsers = inviteUsers;
			vm.leaveEvent = leaveEvent;
			vm.removeUser = removeUser;
			vm.userIsHost = userIsHost;
			vm.notSelf = notSelf;
			vm.getShortLink = getShortLink;
			vm.getGoogleStaticMapsUrl = getGoogleStaticMapsUrl;
			vm.getFormattedDate = getFormattedDate;

			function filterEmails() {
				var emailsInEvent = _.map(vm.event.users, function(user) {
					return user.account.email;
				});
				vm.userEmails = _.filter(vm.userEmails, function(email) {
					return !_.contains(emailsInEvent, email);
				})
			}

			var selfInEvent = findSelf();
			if (!selfInEvent) {
				$state.go('bolt');
			}

            function getTotalOwing() {
                var owingBalance = 0;
                _.forEach(vm.payments, function (payment) {
                    if (payment.status === 'unpaid') {
                        owingBalance += payment.amount;
                    }
                });
                return owingBalance;
            }

            function inviteUsers() {
                var emails = _.map(vm.tags, function (tag) {
                    return tag.text;
                });

				var request = {
					fromEmail: selfInEvent.account.email,
		            subject: 'Invitation: Join a Bolt!',
		            text: 'Hey, come join me in my initiative to be more proactive and efficient by using Bolt! ' +
	                      'Once you join, you are committing to be on time to the event you have been invited to. ' +
	                      "Here's the catch: If you don't make it on time, you have to donate " + vm.event.late_fee +
	                      " dollars to a charity of your choice! Here is the link to join the event: ",
					link: link
				};

				_.forEach(emails, function (email) {
					request.email = email;
					$http
						.post('/api/sendgrid/send-email', request)
						.success(function (response) {
							alert('Invites sent!');
							vm.tags = [];
							filterEmails();
						})
						.error(function (error) {

						});
				})
			}

            function leaveEvent() {
                var userId = userData._id;
                $http
                    .delete('/api/events/' + vm.event._id + '/users/' + userId)
                    .success(function (response) {
                        _.remove(vm.event.users, function (user) {
                            return user.account._id === userId;
                        });
                        $state.go('bolt');
                    })
                    .error(function (error) {

					});
			}

            function removeUser(user) {
                var userToRemove = user.account._id;
                $http
                    .delete('/api/events/' + vm.event._id + '/users/' + userToRemove)
                    .success(function (response) {
                        _.remove(vm.event.users, function (user) {
                            return user.account._id === userToRemove;
                        });
                    })
                    .error(function (error) {

					});
			}

			function userIsHost() {
				var self = findSelf();

				return self && self.role === 'host';
			}

            function findSelf() {
                return _.find(vm.event.users, function (user) {
                    return user.account._id === userData._id;
                });
            }

			function notSelf(user) {
				return user.account._id !== userData._id;
			}

			function getShortLink() {
				var request = {
					link: vm.longLink
				};
				$http
					.post('/api/events/get-short-link', request)
					.success(function (response) {
						return response.data.url;
					});
			}

			function getGoogleStaticMapsUrl(){
				var longitude = vm.event.location.longitude;
				var latitude = vm.event.location.latitude;
				return 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zooom=10&size=400x300&maptype=roadmap&markers=color:red%7Clabel:A%7C' + latitude + ',' + longitude;
			}

			function getFormattedDate() {
				return moment(vm.event.start_date).format('MMMM DD, YYYY @ hh:mmA');
			}
		})
})();

