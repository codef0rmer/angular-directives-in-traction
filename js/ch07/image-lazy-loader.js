var App = angular.module('App', []);

App.directive('imageLazyLoader', function() {
  return {
    restrict: 'A',
    scope: {},
    template: function(element) {
      element.css({position: 'relative'});

      return '\
        <a class="thumbnail">\
          <img ng-src="{{src}}" style="width: 100%; height: 100%; background: rgba(128, 128, 128, 0.3);">\
          <div ng-hide="src" class="progress" style="position: absolute;width: 50%;left: 25%;top: 48%;">\
            <div style="width:{{percentage}}%;" class="progress-bar">{{percentage}}%</div>\
          </div>\
        </a>';
    },
    link: function(scope, element, attrs) {
      $.ajax({
        type: 'GET',
        url: attrs.imageLazyLoader,
        xhr: function() {
          var xhr = new window.XMLHttpRequest();
          xhr.addEventListener("progress", function(evt) {
            scope.$apply(function() {
              scope.percentage = parseInt(evt.loaded / evt.total * 100, false);
            });
          }, false);

          return xhr;
        },
        success: function(data) {
          scope.$apply(function() {
            scope.src = attrs.imageLazyLoader;
          });
        }
      });

      scope.$watch(function() { console.log('digesting'); });
    }
  };
});