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
            vm.tags = [];
            vm.totalOwing = getTotalOwing();

            console.log(vm.payments);

            vm.inviteUsers = inviteUsers;
            vm.leaveEvent = leaveEvent;
            vm.removeUser = removeUser;
            vm.userIsHost = userIsHost;
            vm.notSelf = notSelf;

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
                    link: link
                };

                _.forEach(emails, function (email) {
                    request.email = email;
                    $http
                        .post('/api/sendgrid/send-email', request)
                        .success(function (response) {

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
        })
})();

