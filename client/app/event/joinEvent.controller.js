(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('JoinEventCtrl', function ($scope, $http, $stateParams, userData) {
            var vm = this;

            vm.loading = true;
            vm.confirmationText = '';

            joinEvent();

            function joinEvent() {
                var params = { params: { token: $stateParams.token } };
                $http
                    .get('/api/auth/parse-token', params)
                    .success(function(eventId) {
                        var url = '/api/events/' + eventId + '/users/' + userData._id;
                        $http.put(url).success(function(response) {
                            console.log(response);
                            vm.loading = false;
                            vm.confirmationText = 'You have joined the event.';
                        });
                    });
            }
        });
})();


