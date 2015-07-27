var App = angular.module('App', []);

App.run(function($rootScope) {
  $rootScope.name = 'AngularJS';
});