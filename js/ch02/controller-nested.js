var App = angular.module('CtrlDemo', []);

App.controller('BODCtrl', function($scope) {
  $scope.person = {
    'role': 'Board of Directors',
    'aka' : 'Trustees',
    'job' : 'for everything good for the organization'
  };

  // or as an HTML string
  $scope.statement = "We're the <b> Board of Directors</b> and responsible <b>for everything good for the organization.</b>";

  this.person = $scope.person;
});

App.controller('CEOCtrl', function($scope) {
  $scope.person = {
    'role': 'CEO',
    'job' : 'for total management of an organization'
  };
});