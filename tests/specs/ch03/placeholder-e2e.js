describe('Chapter 3:', function() {
  it('should replace the default image with placeholder If it fails to load', function() {
    browser.get('ch03/placeholder.html');

    // If loads
    expect(element.all(by.tagName('img')).first().getAttribute('src')).toEqual('http://lorempixel.com/100/100/people/1/');
    
    // If fails, use placeholder image
    var imgElement = element.all(by.tagName('img')).last();
    browser.wait(function() {
      return imgElement.getAttribute('src').then(function(src) {
        return src === 'http://lorempixel.com/100/100/cats/';
      });
    }, 60 * 1000);
    expect(imgElement.getAttribute('src')).toEqual('http://lorempixel.com/100/100/cats/');
  });
});