'use strict';

angular.module('boltApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            })
            .state('group-creation', {
                url: '/create/group',
                templateUrl: '',
                controller: ''
            })
            .state('group-view', {
                url: '/groups/:groupId',
                templateUrl: '',
                controller: ''
            })
            .state('event-creation', {
                url: '/groups/:groupId/create/event',
                templateUrl: '',
                controller: ''
            })
            .state('event-view', {
                url: 'groups/:groupId/events/:eventId',
                templateUrl: '',
                controller: ''
            })
    });
