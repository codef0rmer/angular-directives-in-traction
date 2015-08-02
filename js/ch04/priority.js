var App = angular.module('MarqueeApp', []);

App.directive('superMarquee', function() {
  return {
    restrict: 'EACM',
    replace: true,
    priority: 2,
    template: '<marquee><div class="wave">AngularJS Directives inAction, Yey..!!</div></marquee>', 
    compile: function() {

    }
  };
});

App.directive('looper', function() {
  return {
    restrict: 'AC',
    priority: 1,
    compile: function(tElement) {
      if (tElement.find('span').length) return;

      var DOM = '';

      tElement
        .text()
        .split(' ')
        .forEach(function(word) {
          if (word !== '') {
            DOM+= '<span>' + word + '</span>';
          }
        });

      tElement.children().html(DOM);
    }
  };
});

// App.directive('superMarquee', function() {
//   return {
//     restrict: 'EACM',
//     replace: true,
//     priority: 1,
//     template: '<marquee><div class="wave">AngularJS Directives inAction, Yey..!!</div></marquee>',
//     link: function() {
// 
//     }
//   };
// });

// App.directive('looper', function() {
//   return {
//     restrict: 'AC',
//     priority: 2,
//     link: function(scope, element) {
//       if (element.find('span').length) return;
// 
//       var DOM = '';
// 
//       element
//         .text()
//         .split(' ')
//         .forEach(function(word) {
//           if (word !== '') {
//             DOM+= '<span>' + word + '</span>';
//           }
//         });
// 
//       element.children().html(DOM);
//     }
//   };
// });