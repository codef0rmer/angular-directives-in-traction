var App = angular.module('SEA', []);

App.constant('search_engine', 'google.com');

App.factory('LookupFactory', function(search_engine) {
  return {
    find: function() {
      return 'Searching in http://' + search_engine + ' for the sake of knowing...';
    }
  };
});

App.run(function($rootScope, LookupFactory) {
  $rootScope.message = LookupFactory.find();
});