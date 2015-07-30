describe('Chapter 3: ', function() {
  beforeEach(module('PlaceholderApp'));
  
  var element;

  it('Should replace the default image with placeholder If it fails to load', inject(function($rootScope, $compile) {
    // If loads
    element = angular.element('<img src="http://lorempixel.com/100/100/people/1/" on-image-load />');
    element = $compile(element)($rootScope);
    expect(element[0].getAttribute('src')).toEqual('http://lorempixel.com/100/100/people/1/');

    // If fails, use placeholder image
    element = angular.element('<img src="http://lorempixel.com/random" on-image-load />');
    element = $compile(element)($rootScope);
    waitsFor(function() {
      return element[0].getAttribute('src') === 'http://lorempixel.com/100/100/cats/';
    });
    runs(function() {
      expect(element[0].getAttribute('src')).toEqual('http://lorempixel.com/100/100/cats/');
    });
  }));
});