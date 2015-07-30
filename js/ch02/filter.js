var App = angular.module('SEA', ['ngSanitize']);

App.constant('search_engine', 'google.com');

App.provider('LookupService', function(search_engine) {
  var currentSearchEngine = search_engine;

  return {
    $get: function() {
      return {
        defaultSearchEngine: search_engine,
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

App.filter('CamelCase', function() {
  return function(message) {
    return message.replace(/(?:^|\s)\w/g, function(match) {
      return match.toUpperCase();
    });
  };
});

App.config(function(LookupServiceProvider) {
  LookupServiceProvider.setSearchEngine('bing.com');
});

App.run(function($rootScope, LookupService, $filter) {
  // You can not call it here but in config
  // LookupService.setSearchEngine('bing.com');
  $rootScope.message = $filter('CamelCase')($filter('linky')(LookupService.find()));
});
