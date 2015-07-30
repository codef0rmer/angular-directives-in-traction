var App = angular.module('SEA', ['ngSanitize']);

App.config(function($provide, $filterProvider, $interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');

  $provide.value('search_engine_value', 'google.com');

  $provide.constant('search_engine_constant', 'google.com');

  $provide.factory('search_engine_factory', function(search_engine_constant) {
    return {
      find: function() {
        return 'Searching in http://' + search_engine_constant + ' for the sake of knowing...';
      }
    };
  });

  $provide.service('search_engine_service', function(search_engine_constant) {
    this.find = function() {
      return 'Searching in http://' + search_engine_constant + ' for the sake of knowing...';
    };
  });

  $provide.provider('search_engine_provider', function(search_engine_constant) {
    var currentSearchEngine = search_engine_constant;

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

  $filterProvider.register('CamelCase', function() {
    return function(message) {
      return message.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
      });
    };
  });
});

App.run(function($rootScope, search_engine_value, search_engine_constant, search_engine_factory, search_engine_service, search_engine_provider, $filter) {
  var arrMessage = [];
  arrMessage.push('Constant: Searching in http://' + search_engine_value + ' for the sake of knowing...');
  arrMessage.push('Value: Searching in http://' + search_engine_constant + ' for the sake of knowing...');
  arrMessage.push('Factory:' + search_engine_factory.find());
  arrMessage.push('Service:' + search_engine_service.find());
  arrMessage.push('Provider:' + search_engine_provider.find());
  arrMessage.push('Filter: ' + $filter('CamelCase')($filter('linky')(search_engine_provider.find())));
  $rootScope.message = arrMessage.join('<br/>');

  $rootScope.look = 'Look, It still works..!';
});

