var App = angular.module('MarqueeApp', []);

App.directive('superMarquee', function() {
  return {
    restrict: 'EACM',
    compile: function(element) {
      var scrollingText = '<marquee>\
        <div class="wave">\
          <span>AngularJS </span>\
          <span>Directives </span>\
          <span>inAction, </span>\
          <span>Yey..!!</span>\
        </div>\
      </marquee>';

      if (element[0].nodeType === 8) {
        element.replaceWith('<tr><td>' + scrollingText + '</td></tr>');
      } else {
        element.html(scrollingText);
      }
    }
  };
});