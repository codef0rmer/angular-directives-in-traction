var App = angular.module('Modeling', []);

App.run(function($rootScope) {
  $rootScope.book = {
    name: 'Angular Directives in Action',
    status: 'reading'
  };

  $rootScope.$watch('book', function(newVal, oldVal) {
    if (newVal.status === 'read') {
      console.log('Well Done..!');
    }
  });

  $rootScope.book.status = 'read';
});