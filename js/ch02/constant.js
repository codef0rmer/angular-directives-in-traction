var App = angular.module('SEA', []);

App.constant('search_engine', 'google.com');

App.config(function(search_engine) {
  // can be decorated so perform few searches in the background
});

App.run(function($rootScope, search_engine) {
  $rootScope.message = 'Searching in http://' + search_engine + ' for the sake of knowing...';
});

