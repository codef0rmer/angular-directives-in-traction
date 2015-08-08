var App = angular.module('CVLApp', []);

App.run(function($rootScope) {
  $rootScope.speak = function($index) {
    console.log($index);
  };
});

App.directive('compileCheck', function($parse) {
  return {
    restrict: 'EA',
    template: '<div>Compiling {{$index}} for Fun..! </div>',
    compile: function(cElement, cAttr) {
      console.log('how many times I am called');
      var compiledCallback = $parse(cAttr.callback);
      cElement.find('div').append('#perfmatters');
      
      return {
        pre: function(scope, element, attrs) {
          scope.$index = scope.$index + 1;
        },
        post: function(scope, element, attrs) {
          compiledCallback(scope);

          element.find('div').on('click', function(event) {
            alert('You tapped ' + scope.$index);
          });
        }
      }
    }
    // OR
    // 
    // link: {
    //   pre: function(scope, element, attrs) {
    //     scope.$index = scope.$index + 1;
    //   },
    //   post: function(scope, element, attrs) {
    //     // compiledCallback(scope);

    //     element.find('div').on('click', function(event) {
    //       alert('You tapped ' + scope.$index);
    //     });
    //   }
    // }
  };
});