'use strict';

angular.module('boltApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'satellizer',
    'ngTagsInput'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('bolt', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl as Main',
                resolve: {
                    userData: ['dataResolver', 'auth', function(dataResolver, auth) {
                        if (auth.isLoggedIn()) {
                             return dataResolver.resolve('/api/auth/user');
                        } else {
                            return {};
                        }
                    }]
                }
            })
            .state('bolt.signUp', {
                url: 'signup',
                templateUrl: 'app/signup/signup.html',
                controller: 'SignUpCtrl as SignUp'
            })
            .state('bolt.login', {
                url: 'login',
                templateUrl: 'app/auth/login.html',
                controller: 'LoginCtrl as Login'
            })
            .state('bolt.auth', {
                url: 'auth?code',
                templateUrl: 'app/auth/auth.html',
                controller: 'AuthCtrl as Auth'
            })
            .state('bolt.redirect', {
                url: 'redirect?code',
                templateUrl: 'app/auth/redirect.html',
                controller: 'RedirectCtrl as Redirect'
            })
            .state('bolt.createGroup', {
                url: 'create/group',
                templateUrl: 'app/group/create.group.html',
                controller: 'CreateGroupCtrl as CreateGroup'
            })
            .state('bolt.groupsView', {
                url: 'groups',
                templateUrl: 'app/group/view.group.html',
                controller: 'GroupCtrl as Group',
                resolve: {
                    groups: ['dataResolver', function(dataResolver) {
                        return dataResolver.resolve('/api/groups');
                    }]
                }
            })
            .state('bolt.groupView', {
                url: 'group/:groupId',
                templateUrl: 'app/group/single.group.html',
                controller: 'SingleGroupCtrl as SingleGroup',
                resolve: {
                    groupData: ['dataResolver', '$stateParams', function(dataResolver, $stateParams) {
                        return dataResolver.resolve('/api/groups/' + $stateParams.groupId);
                    }]
                }
            })
            .state('bolt.createEvent', {
                url: 'create/event',
                templateUrl: 'app/event/create.event.html',
                controller: 'CreateEventCtrl as CreateEvent'
            })
            .state('bolt.eventsView', {
                url: 'events',
                templateUrl: 'app/event/view.event.html',
                controller: 'EventCtrl as Event',
                resolve: {
                    events: ['dataResolver', function(dataResolver) {
                        return dataResolver.resolve('/api/events');
                    }]
                }
            })
            .state('bolt.eventView', {
                url: 'event/:eventId',
                templateUrl: 'app/event/single.event.html',
                controller: 'SingleEventCtrl as SingleEvent',
                resolve: {
                    eventData: ['dataResolver', '$stateParams', function(dataResolver, $stateParams) {
                        return dataResolver.resolve('/api/events/' + $stateParams.eventId);
                    }],
                    userData: ['dataResolver', function(dataResolver) {
                        return dataResolver.resolve('/api/users');
                    }]
                }
            })
            .state('bolt.joinEvent', {
                url: 'join/event/:token',
                templateUrl: 'app/event/join.event.html',
                controller: 'JoinEventCtrl as JoinEvent'
            })

    });
