var App = angular.module('MarqueeApp', []);


App.directive('superMarquee', function() {
  return {
    restrict: 'EACM',
    replace: true,
    priority: 3,
    template: '<marquee><div class="wave"><span>AngularJS </span><span>Directives </span><span>inAction, </span>Yey..!!</div></marquee>',
    compile: function(element) {

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
          totalWords = element.text().split(' ').length;

      if (totalSpans !== totalWords) {
        for (var i = 0; i < totalSpans; i++) {
          angular.element($span[i]).replaceWith($span[i].textContent + '&nbsp;');
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
    compile: function(element) {
      if (element.find('span').length) return;

      var DOM = '';

      element
        .text()
        .split(' ')
        .forEach(function(word) {
          if (word !== '') {
            DOM+= '<span>' + word + '</span>';
          }
        });

      element.children().html(DOM);
    }
  };
});

// Priority check with Linking functions
// 
// App.directive('superMarquee', function() {
//   return {
//     restrict: 'EACM',
//     replace: true,
//     priority: 1,
//     terminal: true,
//     template: '<marquee><div class="wave"><span>AngularJS </span><span>Directives </span><span>inAction, </span>Yey..!!</div></marquee>',
//     link: function() {
//       console.log('a');
//     }
//   };
// });

// App.directive('validate', function() {
//   return {
//     restrict: 'AC',
//     priority: 2,
//     link: function(scope, element) {
//       var $span = element.find('span'),
//           totalSpans = $span.length,
//           totalWords = element.text().split(' ').length;

//       if (totalSpans !== totalWords) {
//         for (var i = 0; i < totalSpans; i++) {
//           angular.element($span[i]).replaceWith($span[i].textContent + '&nbsp;');
//         }
//       }
//     }
//   };
// });

// App.directive('looper', function() {
//   return {
//     restrict: 'AC',
//     priority: 3,
//     link: function(scope, element) {
//       if (element.find('span').length) return;

//       var DOM = '';

//       element
//         .text()
//         .split(' ')
//         .forEach(function(word) {
//           if (word !== '') {
//             DOM+= '<span>' + word + '</span>';
//           }
//         });

//       element.children().html(DOM);
//     }
//   };
// });