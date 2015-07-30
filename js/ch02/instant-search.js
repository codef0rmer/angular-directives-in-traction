var App = angular.module('InstantDemo', []);

App.controller('InstantCtrl', function($scope) {
  $scope.favorites = [
    'Christopher Nolan',
    'AR Rehman',
    'Amit Trivedi',
    'Nagraj Manjule'
  ];
});