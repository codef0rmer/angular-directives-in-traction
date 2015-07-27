var App = angular.module('DI', []);
App.service('Hello', function() {
  var self = this;
  self.greet = function(who) { 
    self.name = 'Hello ' + who;
  }
});

App.controller('SayHi', function(Hello) {
  Hello.greet('AngularJS');
  console.log(Hello.name);
});