var App = angular.module('SEA', []);

App.value('search_engine', 'google.com');

App.config(function() {
  // can not be decorated during the configuration
});

App.run(function($rootScope, search_engine) {
  $rootScope.message = 'Searching in http://' + search_engine + ' for the sake of knowing...';
});