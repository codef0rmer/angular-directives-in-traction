var App = angular.module('MarqueeApp', []);

App.directive('superMarquee', function() {
  return {
    restrict: 'EACM',
    replace: true,
    templateUrl: 'templateUrl-partial.html'
  };
});