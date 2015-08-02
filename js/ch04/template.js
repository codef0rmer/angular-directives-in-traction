var App = angular.module('MarqueeApp', []);

App.directive('superMarquee', function() {
  return {
    restrict: 'EACM',
    template: function(element, attrs) {
      return '<marquee><div class="wave">' + attrs.text + '</div></marquee>';
    }
  };
});