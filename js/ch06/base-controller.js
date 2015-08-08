var App = angular.module('ThumbApp', []);

App.controller('ThumbCtrl', function($scope) {
  $scope.thumbnails = [
    { title: 'Page 1',  image: '1.png', active: true },
    { title: 'Page 2',  image: '2.png'  },
    { title: 'Page 3',  image: '3.png'  },
    { title: 'Page 4',  image: '4.png'  },
    { title: 'Page 5',  image: '5.png'  },
    { title: 'Page 6',  image: '6.png'  },
    { title: 'Page 7',  image: '7.png'  },
    { title: 'Page 8',  image: '8.png'  },
    { title: 'Page 9',  image: '9.png'  },
    { title: 'Page 10', image: '10.png' },
    { title: 'Page 11', image: '11.png' },
    { title: 'Page 12', image: '12.png' },
    { title: 'Page 13', image: '13.png' },
    { title: 'Page 14', image: '14.png' },
    { title: 'Page 15', image: '15.png' }
  ];
});

App.controller('ThumbViewerCtrl', function($scope) {
  this.thumbSize = $scope.thumbSize = $scope.size || 150;
  this.thumbGap  = $scope.thumbGap  = $scope.gap  || 10;
});

App.directive('thumbviewer', function() {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'thumbviewer.html',
    transclude: true,
    controller: 'ThumbViewerCtrl',
    scope: {
      size: '=?',
      gap : '=?'
    },
    link: function(scope, element, attrs) {
      scope.wrapperStyle = function() {
        var totalSize = scope.thumbSize * 15;
        var totalGap  = scope.thumbGap * (15 - 1);
        
        return {
          width   : totalSize + totalGap,
          display : 'inline-block'
        };
      };
    }
  };
});

App.directive('thumb', function() {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'thumb.html',
    transclude: true,
    scope: {
      active  : '=?'
    },
    compile: function(tElement, tAttrs) {
      return function postLink(scope, element, attrs) {
        scope.thumbnailStyle = function(thumb) {
          return {
            width       : 150,
            marginBottom: 0
          };
        };
      };
    }
  };
});