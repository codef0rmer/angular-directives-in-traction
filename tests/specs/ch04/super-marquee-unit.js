describe('Chapter 4: ', function() {
  beforeEach(module('MarqueeApp'));
  
  var element;

  it('Should compile super-marquee directive as an Element', inject(function($rootScope, $compile) {
    element = angular.element('<super-marquee looper validate data-text="AngularJS Directives inAction, Yey..!!" data-scrolldelay="2" data-direction="up" data-wavedelay="0.015"></super-marquee>');
    element = $compile(element)($rootScope);    
    expect(element.text()).toBe('AngularJS Directives inAction, Yey..!!');
  }));

  it('Should compile super-marquee directive as an Attribute', inject(function($rootScope, $compile) {
    element = angular.element('<div super-marquee looper validate data-text="AngularJS Directives inAction, Yey..!!" data-scrolldelay="2" data-direction="up" data-wavedelay="0.015"></div>');
    element = $compile(element)($rootScope);
    
    expect(element.text()).toBe('AngularJS Directives inAction, Yey..!!');
  }));

  it('Should compile super-marquee directive as a Class', inject(function($rootScope, $compile) {
    element = angular.element('<div class="super-marquee looper validate" data-text="AngularJS Directives inAction, Yey..!!" data-scrolldelay="2" data-direction="up" data-wavedelay="0.015"></div>');
    element = $compile(element)($rootScope);
    
    expect(element.text()).toBe('AngularJS Directives inAction, Yey..!!');
  }));

  it('Should compile super-marquee directive as a Comment but will not work', inject(function($rootScope, $compile) {
    element = angular.element('<!-- directive: super-marquee data-text="AngularJS Directives inAction, Yey..!!" data-scrolldelay="2" data-direction="up" data-wavedelay="0.015" -->');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('undefined');
  }));

  it('Should validate marquee text If SPANs count do not match with number of chars', inject(function($rootScope, $compile) {
    // If not matched, remove SPANs
    element = angular.element('<div validate><span>A</span> B</div>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('A B');
    expect(element.find('span').length).toBe(0);

    // If matched, do not remove SPAN
    element = angular.element('<div validate><span>A </span><span>B</span></div>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('A B');
    expect(element.find('span').length).toBe(2);
  }));

  it('Should loop through characters to wrap them in SPANs If not available', inject(function($rootScope, $compile) {
    // If text only
    element = angular.element('<super-marquee looper validate data-text="A B" data-scrolldelay="2" data-direction="up" data-wavedelay="0.015"></super-marquee>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('A B');
    expect(element.find('span').length).toBe(2);

    // If empty char is wrapped in SPAN
    element = angular.element('<super-marquee looper validate data-text="<span>A</span><span> </span><span>B</span>" data-scrolldelay="2" data-direction="up" data-wavedelay="0.015"></super-marquee>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('A B');
    expect(element.find('span').length).toBe(2);

    // If SPANs count do not match chars count
    element = angular.element('<super-marquee looper validate data-text="<span>A</span> B" data-scrolldelay="2" data-direction="up" data-wavedelay="0.015"></super-marquee>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('A B');
    expect(element.find('span').length).toBe(2);    
  }));
});