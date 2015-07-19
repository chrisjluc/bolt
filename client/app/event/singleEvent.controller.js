(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('SingleEventCtrl', function (eventData, userData, usersData, $http) {
            var vm = this;
            var link = 'http://localhost:9000/join/event/' + eventData.joinToken;

            vm.event = eventData;
            vm.users = usersData.users;
            vm.userEmails = _.map(vm.users, function (user) {
                return user.email;
            });
            vm.tags = [];

            vm.inviteUsers = inviteUsers;
            vm.leaveEvent = leaveEvent;
            vm.removeUser = removeUser;
            vm.userIsHost = userIsHost;
            vm.notSelf = notSelf;

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
                    .success(function(response){
                        _.remove(vm.event.users, function(user) {
                            return user.account._id === userId;
                        });
                    })
                    .error(function(error){

                    });
            }

            function removeUser(user) {
                var userToRemove = user.account._id;
                $http
                    .delete('/api/events/' + vm.event._id + '/users/' + userToRemove)
                    .success(function(response){
                        _.remove(vm.event.users, function(user) {
                            return user.account._id === userToRemove;
                        });
                    })
                    .error(function(error){

                    });
            }

            function userIsHost() {
                var self = _.find(vm.event.users, function(user) {
                    return user.account._id === userData._id;
                });

                return self && self.role === 'host';
            }

            function notSelf(user) {
                return user.account._id !== userData._id;
            }
        })
})();

