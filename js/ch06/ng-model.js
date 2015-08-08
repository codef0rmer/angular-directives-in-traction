var App = angular.module('ngModelApp', []);

// EXPERIMENTAL!
// 
// App.run(function($rootScope) {
//   $rootScope.foobar = function() {
//     console.log($rootScope.MyForm);
//   }
// });
// App.directive('numeric', function() {
//   return {
//     restrict: 'A',
//     require: 'ngModel',
//     link: function(scope, element, attrs, ngModelCtrl) {
//       ngModelCtrl.$parsers.push(function(viewValue) {
//         var modelValue = viewValue && viewValue.replace(/[a-zA-Z]/ig, '');

//         if (modelValue !== viewValue) {
//           ngModelCtrl.$setViewValue(modelValue);
//           ngModelCtrl.$render();
//         }

//         return modelValue;
//       });
//     }
//   };
// });

App.directive('isUnique', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {console.log(ngModelCtrl);
      ngModelCtrl.$setValidity('uniqueEmail', true);

      ngModelCtrl.$parsers.push(function(viewValue) {
        ngModelCtrl.$setValidity('uniqueEmail', !(viewValue === 'foo@bar.com'));

        return viewValue;
      });

      ngModelCtrl.$formatters.push(function(modelValue) {
        ngModelCtrl.$setValidity('uniqueEmail', true);

        return modelValue;
      });
    }
  };
});

App.directive('willRelocate', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    priority: 1,
    link: function(scope, element, attrs, ngModelCtrl) {
      ngModelCtrl.$render = function() {
        ngModelCtrl.$modelValue = ngModelCtrl.$modelValue || false;
        ngModelCtrl.$viewValue  = ngModelCtrl.$modelValue ? 'Yippi..!' : 'Nope, not ready!';
      };

      ngModelCtrl.$formatters.push(function(modelValue) {
        var viewValue = (modelValue || ( !angular.isDefined(modelValue) && element.prop('checked') )) ? 'Yippi..!' : 'Nope, not ready!';
        ngModelCtrl.$modelValue = viewValue === 'Yippi..!';

        element.prop('checked', ngModelCtrl.$modelValue);
        
        return viewValue;
      });

      ngModelCtrl.$parsers.push(function(viewValue) {
        var modelValue = viewValue;
        ngModelCtrl.$viewValue = modelValue ? 'Yippi..!' : 'Nope, not ready!';

        return modelValue;
      });
    }
  };
});