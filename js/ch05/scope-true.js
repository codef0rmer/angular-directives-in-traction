var App = angular.module('SpinnerApp', []);

App.controller('ScopeCtrl', function($scope) {
  $scope.value = 1;
});

App.directive('adiaSpinner', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: true,
    template: '\
      <div class="btn-group">\
        <button class="btn btn-success" ng-click="inc()" ng-disabled="opt.default >= opt.max">+</button>\
        <button class="btn" disabled>{{spinnerText()}}</button>\
        <button class="btn btn-danger" ng-click="dec()" ng-disabled="opt.default <= opt.min">-</button>\
      </div>',
    link: function(scope, element, attrs) {
      var isList = attrs.type === 'list';

      scope.opt = {
        type    : attrs.type || 'range',
        default : parseInt(attrs.default, false) || 1,
        interval: parseInt(attrs.interval, false) || 1,
        min     : parseInt(attrs.min, false) || 1,
        max     : parseInt(attrs.max, false) || Infinity,
        list    : scope.$eval(attrs.list) || []
      };

      if (isList) {
        scope.opt.default = attrs.default ? scope.opt.default : 0;
        scope.opt.min = 0;
        scope.opt.max = scope.opt.list.length - 1;
      }

      scope.inc = function() {
        scope.opt.default+= scope.opt.interval;
      };

      scope.dec = function() {
        scope.opt.default-= scope.opt.interval;
      };

      scope.spinnerText = function() {
        return isList ? scope.opt.list[scope.opt.default] : scope.opt.default;
      };
    }
  };
});