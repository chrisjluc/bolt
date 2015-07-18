'use strict';

angular.module('boltApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: '',
        controller: ''
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
