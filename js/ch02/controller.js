var App = angular.module('CtrlDemo', []);

App.controller('BODCtrl', function($scope) {
  $scope.person = {
    'role': 'Board of Directors',
    'aka' : 'Trustees',
    'job' : 'for everything good for the organization'
  };
});

App.controller('CEOCtrl', function($scope) {
  $scope.person = {
    'role': 'CEO',
    'job' : 'for total management of an organization'
  };
});