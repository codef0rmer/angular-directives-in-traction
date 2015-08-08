var App = angular.module('ThumbApp', ['nmSpinnerApp']);

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

  $scope.loadPage = function(param) {
    console.log('Page ' + param.index + ' is loading... Please Wait.');
  };
});

App.controller('ThumbViewerCtrl', function($scope) {
  this.thumbs    = $scope.thumbs    = [];
  this.thumbSize = $scope.thumbSize = $scope.size || 150;
  this.thumbGap  = $scope.thumbGap  = $scope.gap  || 10;

  this.addThumb = function(thumb) {
    $scope.thumbs.push(thumb);
  };

  this.selectThumb = $scope.selectThumb = function(selectedThumb) {
    var selectedThumbIndex = $scope.thumbs.indexOf(selectedThumb);

    angular.forEach($scope.thumbs, function(thumb) {
      if (thumb.active) thumb.active = false;
    });
    selectedThumb.active = true;
    $scope.thumbTracker = selectedThumbIndex;

    if (typeof $scope.onselect({param: {thumb: selectedThumb, index: selectedThumbIndex}}) === 'function') {
      $scope.onselect()({thumb: selectedThumb, index: selectedThumbIndex});
    }
  };

  $scope.$watch(function() { return $scope.thumbs.length; }, function(newVal, oldVal) {
    // Once all thumbs loaded
    if (newVal || newVal !== oldVal) {
      $scope.thumbList = [];
      for (var i = 0; i < newVal; i++) {
        $scope.thumbList.push(i + 1);
      }
    }
  });
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
      gap : '=?',
      onselect: '&?'
    },
    link: function(scope, element, attrs) {
      scope.marginLeft = 0;

      scope.wrapperStyle = function() {
        var totalSize = scope.thumbSize * scope.thumbs.length;
        var totalGap  = scope.thumbGap * (scope.thumbs.length - 1);
        var scrollLeft = scope.thumbTracker * (scope.thumbSize + scope.thumbGap);
        var leftPos = (scrollLeft + scope.thumbSize + scope.thumbGap * 2 + scope.marginLeft);
        var isInViewport = leftPos !== scope.thumbGap && leftPos < window.innerWidth;

        if (!isInViewport && scrollLeft >= 0) {
          scope.marginLeft = -scrollLeft;
        }

        return {
          width   : totalSize + totalGap,
          display : 'inline-block',
          marginLeft: scope.marginLeft
        };
      };

      scope.updateThumb = function() {
        var selectedThumb = scope.thumbs[scope.thumbTracker];
        if (selectedThumb) {
          scope.selectThumb(selectedThumb);
        }
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
    require: '^thumbviewer',
    scope: {
      active  : '=?'
    },
    compile: function(tElement, tAttrs) {
      return function postLink(scope, element, attrs, thumbviewerCtrl) {
        thumbviewerCtrl.addThumb(scope);

        scope.isFirstThumb = function(thumb) {
          return thumbviewerCtrl.thumbs.indexOf(thumb);
        };
    
        scope.thumbnailStyle = function(thumb) {
          return {
            width       : thumbviewerCtrl.thumbSize,
            marginLeft  : scope.isFirstThumb(thumb) === 0 ? 0 : thumbviewerCtrl.thumbGap,
            marginBottom: 0
          };
        };

        scope.select = function(selectedThumb) {
          thumbviewerCtrl.selectThumb(selectedThumb);
        };
      };
    }
  };
});