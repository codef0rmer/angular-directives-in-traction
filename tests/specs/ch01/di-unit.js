describe('Chapter 1:', function() {
  var SayHi, Hello;
  
  beforeEach(module('DI'));
  
  beforeEach(inject(function($controller) {
    Hello = {
      greet: function(who) {
        Hello.name = 'Hello ' + who;
      }
    };

    SayHi = $controller('SayHi', {Hello: Hello});
  }));
  
  it('Should resolve dependencies', inject(function() {
    expect(Hello.name).toBe('Hello AngularJS');
  }));
});