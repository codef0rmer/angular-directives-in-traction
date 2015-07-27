describe('Test AngularJS Template', function() {
  var str;

  it('should greet AngularJS', function() {
    browser.get('ch01/angular-template.html');
    str = element(by.binding('name')).getText();
    expect(str).toEqual('AngularJS');
  });
});