(function () {
    'use strict';

    angular
        .module('boltApp')
        .service('dataResolver', dataResolver);

    function dataResolver($http, $q) {
        var vm = this;

        vm.resolve = resolve;

        function resolve(url) {
            var deferredPromise = $q.defer();

            $http.get(url)
                .success(function (response) {
                    deferredPromise.resolve(response);
                });

            return deferredPromise.promise;
        }
    }
})();