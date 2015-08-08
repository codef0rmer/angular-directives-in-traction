var App = angular.module('TranscludeApp', []);

App.directive('alert', function() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    // transclude: 'element',
    scope: {},
    template: function(element, attrs) {
      return '<div class="alert alert-' + ( attrs.state || 'info' ) + '" ng-hide="hidden">\
                <button type="button" class="close" ng-click="hidden = true">\
                  <span aria-hidden="true">&times;</span>\
                </button>\
                <p ng-transclude></p>\
              </div>';
    },
    // To try transcludeFn, uncomment the following and remove line no. 14
    // 
    // link: function(scope, element, attrs, NullController, transcludeFn) {
    //   transcludeFn(scope, function(tContent) {
    //     element.append(tContent);
    //   });
    // }
  }
});