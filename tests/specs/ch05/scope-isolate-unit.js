describe('Chapter 5: ', function() {
  beforeEach(module('SpinnerApp'));
  
  var element, $plus, $minus;

  it('Should compile spinner directive with isolate scope', inject(function($rootScope, $compile) {
    // with default options
    element = angular.element('<adia-spinner></adia-spinner>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();
    expect(element.find('.btn:eq(1)').text()).toBe('1');

    // with default value as a string
    element = angular.element('<adia-spinner data-default="2"></adia-spinner>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();
    expect(element.find('.btn:eq(1)').text()).toBe('2');

    // with default value as an angular model and increment by 2
    $rootScope.default = 3;
    element = angular.element('<adia-spinner data-default="default" data-step="2"></adia-spinner>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();
    expect(element.find('.btn:eq(1)').text()).toBe('3');
    element.find('.btn:eq(0)').click();
    expect(element.find('.btn:eq(1)').text()).toBe('5');
  }));

  it('Should not increment/decrement the value when spinner limit is reached', inject(function($rootScope, $compile) {
    element = angular.element('<adia-spinner data-min="1" data-default="2" data-max="3"></adia-spinner>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();

    $plus = element.find('.btn:eq(0)');
    $minus = element.find('.btn:eq(2)');
    expect(element.find('.btn:eq(1)').text()).toBe('2');
    expect($plus.is(':disabled')).toBeFalsy();
    expect($minus.is(':disabled')).toBeFalsy();
    $minus.click();         // disable $minus
    expect($minus.is(':disabled')).toBeTruthy();
    $plus.click().click();  // disable $plus
    expect($plus.is(':disabled')).toBeTruthy();
  }));

  it('Should work with type: list', inject(function($rootScope, $compile) {
    $rootScope.availability = ['Friday', 'Saturday', 'Sunday'];
    element = angular.element('<adia-spinner data-type="list" data-default="2" data-list="availability" on-change="whichDay"></adia-spinner>');
    element = $compile(element)($rootScope);
    $rootScope.whichDay = function(day) {
      $rootScope.day = day;
    };
    spyOn($rootScope, 'whichDay').andCallThrough();
    $rootScope.$digest();

    $plus = element.find('.btn:eq(0)');
    $minus = element.find('.btn:eq(2)');

    expect(element.find('.btn:eq(1)').text()).toBe('Sunday');
    expect($plus.is(':disabled')).toBeTruthy();
    $minus.click().click(); // disable minus
    expect(element.find('.btn:eq(1)').text()).toBe('Friday');
    expect($minus.is(':disabled')).toBeTruthy();
    
    expect($rootScope.whichDay).toHaveBeenCalled();
    expect($rootScope.day).toEqual({text: 'Friday', value: 0});
  }));
});