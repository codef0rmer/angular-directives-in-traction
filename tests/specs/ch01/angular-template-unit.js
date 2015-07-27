describe('Chapter 1: ', function() {
  beforeEach(module('App'));
  
  var element, scope;
  it('Testing AngularJS Template: Should update an element', inject(function($rootScope, $compile) {
    $rootScope.name = 'AngularJS';
    element = angular.element('<span>Hello, <span ng-bind="name"></span></span>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();

    expect(element.text()).toBe('Hello, AngularJS');
  }));
});