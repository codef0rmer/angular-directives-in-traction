var App = angular.module('MarqueeApp', []);

// Load from the cache
// App.run(function($templateCache) {
//   $templateCache.put('templateUrl-partial.html', 'Isolated but Cached');
// });

App.directive('superMarquee', function($sce) {
  return {
    restrict: 'EACM',
    templateUrl: 'templateUrl-partial.html'
    // Load cross-domain template
    // templateUrl: function() {
    //   return $sce.trustAsResourceUrl('http://localhost/side-projects/blog-posts/manning/Angular Directives in Action/source/ch03/templateUrl-partial.html');
    // }
  };
});