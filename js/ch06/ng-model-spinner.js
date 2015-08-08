var App = angular.module('nmSpinnerApp', []);

App.controller('ScopeCtrl', function($scope) {
  $scope.arrWeekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  $scope.getWeekday = function() {
    console.log('Weekday is ' + $scope.arrWeekday[$scope.weekday]);
  };

  $scope.getRating = function() {
    console.log('Rating changed to ' + $scope.rating);
  };

  $scope.submit = function() {
    alert('You have rated ' + $scope.rating + '/5 and will be available on ' + $scope.arrWeekday[$scope.weekday] + '. Thank You..!');
  };
});

App.directive('adiaSpinner', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      'type'      : '@',
      'default'   : '=?',
      'interval'  : '=?step',
      'min'       : '=?',
      'max'       : '=?',
      'list'      : '=?',
      'onChange'  : '&?'
    },
    require: 'ngModel',
    template: '\
      <div class="btn-group">\
        <button class="btn btn-success" ng-click="inc()" ng-disabled="opt.default >= opt.max">+</button>\
        <button class="btn" disabled>{{spinnerText()}}</button>\
        <button class="btn btn-danger" ng-click="dec()" ng-disabled="opt.default <= opt.min">-</button>\
      </div>',
    link: function(scope, element, attrs, ngModelCtrl) {
      var isList = scope.type === 'list';

      ngModelCtrl.$render = function() {
        scope.opt = {
          type    : scope.type || 'range',
          default : ngModelCtrl.$modelValue || 1,
          interval: scope.interval || 1,
          min     : scope.min || 1,
          max     : scope.max || Infinity,
          list    : scope.list || []
        };

        if (isList) {
          scope.opt.default = ngModelCtrl.$modelValue ? scope.opt.default : 0;
          scope.opt.min = 0;
          scope.opt.max = scope.opt.list.length - 1;
        }

        ngModelCtrl.$setViewValue(scope.opt.default);
      };

      scope.inc = function() {
        scope.opt.default+= scope.opt.interval;
        ngModelCtrl.$setViewValue(scope.opt.default);
      };

      scope.dec = function() {
        scope.opt.default-= scope.opt.interval;
        ngModelCtrl.$setViewValue(scope.opt.default);
      };

      scope.spinnerText = function() {
        return isList && scope.list ? scope.list[scope.opt.default] : scope.opt.default;
      };

      ngModelCtrl.$viewChangeListeners.push(function() {
        if (typeof scope.onChange() === 'function') {
          scope.onChange()();
        }
      });

      scope.$watch('list', function() {
        ngModelCtrl.$render();
      });
    }
  };
});