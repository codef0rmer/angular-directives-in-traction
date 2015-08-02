var App = angular.module('SpinnerApp', []);

App.controller('ScopeCtrl', function($scope) {
  $scope.value = 1;
});

App.directive('adiaSpinner', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: false,
    template: '\
      <div class="btn-group">\
        <button class="btn btn-success" ng-click="inc()">+</button>\
        <button class="btn" disabled>{{spinnerText()}}</button>\
        <button class="btn btn-danger" ng-click="dec()">-</button>\
      </div>',
    link: function(scope) {
      scope.inc = function() {
        scope.value++;
      };

      scope.dec = function() {
        scope.value--;
      };

      scope.spinnerText = function() {
        return scope.value;
      };
    }
  };
});