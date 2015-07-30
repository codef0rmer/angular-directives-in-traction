var App = angular.module('PlaceholderApp', []);

App.controller('ProfileCtrl', function($scope) {
  $scope.userImage = 'http://lorempixel.com/100/100/people/1/';
  $scope.userImageFail = 'http://lorempixel.com/random';
});

App.directive('onImageLoad', function() {
  return {
    link: function(scope, element) {
      element[0].addEventListener('load', function() {
        this.style.display = '';
      }, false);

      element[0].addEventListener('error', function() {
        this.style.display = 'none';
        this.setAttribute('src', 'http://lorempixel.com/100/100/cats/');
      }, false);
    }
  }
});