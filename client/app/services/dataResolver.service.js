(function () {
    'use strict';

    angular
        .module('boltApp')
        .service('dataResolver', dataResolver);

    dataResolver.$inject = [
        '$http',
        '$q',
        'user'
    ];

    function dataResolver($http, $q) {
        var deferredPromise = $q.defer();

        $http.get('')
            .success(function (response) {

            });

        return deferredPromise.promise;
    }
})();