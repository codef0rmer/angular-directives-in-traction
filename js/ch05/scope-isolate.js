var App = angular.module('SpinnerApp', []);

App.controller('ScopeCtrl', function($scope) {
  $scope.getWeekday = function(objWeekday) {
    $scope.weekday = objWeekday;
  };

  $scope.getRating = function(objRating) {
    $scope.rating = objRating;
  };

  $scope.submit = function() {
    alert('You have rated ' + $scope.rating.value + '/5 and will be available on ' + $scope.weekday.text + '. Thank You..!');
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
    template: '\
      <div class="btn-group">\
        <button class="btn btn-success" ng-click="inc()" ng-disabled="opt.default >= opt.max">+</button>\
        <button class="btn" disabled>{{spinnerText()}}</button>\
        <button class="btn btn-danger" ng-click="dec()" ng-disabled="opt.default <= opt.min">-</button>\
      </div>',
    link: function(scope, element, attrs) {
      var isList = scope.type === 'list';

      scope.opt = {
        type    : scope.type || 'range',
        default : scope.default || 1,
        interval: scope.interval || 1,
        min     : scope.min || 1,
        max     : scope.max || Infinity,
        list    : scope.list || []
      };

      if (isList) {
        scope.opt.default = scope.default ? scope.opt.default : 0;
        scope.opt.min = 0;
        scope.opt.max = scope.opt.list.length - 1;
      }

      scope.inc = function() {
        scope.opt.default+= scope.opt.interval;
        scope.notify();
      };

      scope.dec = function() {
        scope.opt.default-= scope.opt.interval;
        scope.notify();
      };

      scope.spinnerText = function() {
        return isList && scope.list ? scope.opt.list[scope.opt.default] : scope.opt.default;
      };

      scope.notify = function() {
        if (typeof scope.onChange({param: {value: scope.opt.default, text: scope.spinnerText()}}) === 'function') {
          scope.onChange()({value: scope.opt.default, text: scope.spinnerText()});
        }
      };

      scope.notify();
    }
  };
});