var App = angular.module('SEA', []);

App.constant('search_engine', 'google.com');

App.provider('LookupService', function(search_engine) {
  var currentSearchEngine = search_engine;

  return {
    $get: function() {
      return {
        find: function() {
          return 'Searching in http://' + currentSearchEngine + ' for the sake of knowing...';
        }
      };
    },

    setSearchEngine: function(se) {
      currentSearchEngine = se;
    },
  };
});

App.config(function(LookupServiceProvider) {
  LookupServiceProvider.setSearchEngine('bing.com');
});

App.run(function($rootScope, LookupService) {
  // You can not call it here but in config
  // LookupService.setSearchEngine('bing.com');
  $rootScope.message = LookupService.find();
});
