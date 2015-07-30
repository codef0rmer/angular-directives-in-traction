var App = angular.module('SEA', []);

App.constant('search_engine', 'google.com');

App.service('LookupService', function(search_engine) {
  this.find = function() {
    return 'Searching in http://' + search_engine + ' for the sake of knowing...';
  };
});

App.run(function($rootScope, LookupService) {
  $rootScope.message = LookupService.find();
});
