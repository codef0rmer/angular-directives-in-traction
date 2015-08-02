describe('Chapter 4:', function() {
  it('should activate super-marquee directive', function() {
    browser.get('ch04/super-marquee.html');

    element.all(by.tagName('div')).each(function(element) {
      expect(element.getText()).toEqual('AngularJS Directives inAction, Yey..!!');
    });
  });
});