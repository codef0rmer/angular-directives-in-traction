var App = angular.module('MarqueeApp', []);

App.directive('superMarquee', function() {
  return {
    restrict: 'EACM',
    replace: true,
    priority: 3,
    template: function(element, attrs) {
      return '<div class="wave-wrapper"><div class="wave">' + attrs.text + '</div></div>'
    },
    compile: function(element, attrs) {
      if (!attrs.direction || attrs.direction === 'up' || attrs.direction === 'down') {
        element.css('text-align', 'center');
      }

      element.children().css({
        '-webkit-animation': attrs.direction + ' ' + attrs.scrolldelay + 's linear infinite',
           '-moz-animation': attrs.direction + ' ' + attrs.scrolldelay + 's linear infinite',
            '-ms-animation': attrs.direction + ' ' + attrs.scrolldelay + 's linear infinite',
                'animation': attrs.direction + ' ' + attrs.scrolldelay + 's linear infinite'
      });
    }
  };
});

App.directive('validate', function() {
  return {
    restrict: 'AC',
    priority: 2,
    compile: function(element) {
      var $span = element.find('span'),
          totalSpans = $span.length,
          totalChars = element.text().replace(/\s/g, '').split('').length;

      if (totalSpans !== totalChars) {
        for (var i = 0; i < totalSpans; i++) {
          angular.element($span[i]).replaceWith($span[i].textContent);
        }
      }
    }
  };
});

App.directive('looper', function() {
  return {
    restrict: 'AC',
    priority: 1,
    terminal: true,
    compile: function(element, attrs) {
      var $target = element.children(),
          $span = element.find('span'),
          chars = element.text().split(''),
          totalSpans = $span.length,
          totalChars = chars.length,
          wavedelay = 0,
          DOM = '';

      if (totalSpans === totalChars) {
        angular.forEach($span, function(span) {
          wavedelay+= parseInt(attrs.wavedelay, false) || 0.015;
          angular.element(span).css({
            'display'           : 'inline-block',
            '-webkit-animation' : 'bump 0.3s ease-in ' + wavedelay + 's alternate infinite',
               '-moz-animation' : 'bump 0.3s ease-in ' + wavedelay + 's alternate infinite',
                '-ms-animation' : 'bump 0.3s ease-in ' + wavedelay + 's alternate infinite',
                    'animation' : 'bump 0.3s ease-in ' + wavedelay + 's alternate infinite'
          });
        });
      } else {
        $target.html('');

        chars.forEach(function(char, index) {
          if (char === ' ') {
            $target.append(' ');
          } else {
            wavedelay+= parseInt(attrs.wavedelay, false) || 0.015;
            $target.append(
              angular.element('<span/>').html(char).css({
                'display'           : 'inline-block',
                '-webkit-animation' : 'bump 0.3s ease-in ' + wavedelay + 's alternate infinite',
                   '-moz-animation' : 'bump 0.3s ease-in ' + wavedelay + 's alternate infinite',
                    '-ms-animation' : 'bump 0.3s ease-in ' + wavedelay + 's alternate infinite',
                        'animation' : 'bump 0.3s ease-in ' + wavedelay + 's alternate infinite'
              })
            );
          }
        });        
      }
    }
  };
});