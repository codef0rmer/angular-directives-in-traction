var App = angular.module('App', []);

App.directive('imageLazyLoader', function() {
  return {
    restrict: 'A',
    scope: {},
    template: function(element) {
      element.css({position: 'relative'});

      return '\
        <a class="thumbnail">\
          <img style="width: 100%; height: 100%; background: rgba(128, 128, 128, 0.3);">\
          <div class="progress" style="position: absolute;width: 50%;left: 25%;top: 48%;">\
            <div class="progress-bar"></div>\
          </div>\
        </a>';
    },
    link: function(scope, element, attrs) {
      var $img = element.find('img'),
          $progress = element.find('.progress'),
          $progressBar = element.find('.progress-bar');

      $.ajax({
        type: 'GET',
        url: attrs.imageLazyLoader,
        xhr: function() {
          var xhr = new window.XMLHttpRequest(),
              percentage;

          xhr.addEventListener("progress", function(evt) {
            percentage = parseInt(evt.loaded / evt.total * 100, false) + '%';
            $progressBar.css({width: percentage}).text(percentage);
          }, false);

          return xhr;
        },
        success: function(data) {
          $img.attr('src', attrs.imageLazyLoader);
          $progress.hide();
        }
      });

      scope.$watch(function() { console.log('digesting'); });
    }
  };
});