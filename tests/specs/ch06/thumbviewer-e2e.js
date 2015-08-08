describe('Chapter 6:', function() {
  it('should activate thumbViewer directive', function() {
    browser.get('ch06/thumbnail-viewer.html');

    var $thumbnailWrapper = element.all(by.css('.thumbnail-wrapper')).first();
    var $thumbnailContainer = element.all(by.css('.thumbnail-container')).first();
    var $thumbs = $thumbnailContainer.$$('.thumbnail');
    var $thumbTrackerButtons = $thumbnailContainer.$$('button');
    var $thumbTrackerNext;
    var $thumbTracker;
    var $thumbTrackerPrev;
    
    $thumbs.then(function(thumbs) { expect(thumbs.length).toBe(15); });

    describe('should able to navigate using spinner', function() {
      $thumbTrackerButtons.then(function(thumbTrackerButtons) {
        $thumbTrackerNext = thumbTrackerButtons[0];
        $thumbTracker     = thumbTrackerButtons[1];
        $thumbTrackerPrev = thumbTrackerButtons[2];      
        
        expect($thumbTracker.getText()).toBe('1');
        
        // Click next button twice to navigate to 3rd thumbnail
        $thumbTrackerNext.click();
        $thumbTrackerNext.click();
        expect($thumbnailWrapper.getCssValue('margin-left')).toBe('0px');
        expect($thumbTracker.getText()).toBe('3');

        // Navigate to 4th thumbnail and verify transition
        browser.sleep(0).then(function() {
          $thumbTrackerNext.click();
          browser.sleep(500).then(function() {
            expect($thumbnailWrapper.getCssValue('margin-left')).toBe('-480px');
            expect($thumbTracker.getText()).toBe('4');
          });
        });

        // Navigate back to the 3rd thumbnail and verify transition
        browser.sleep(0).then(function() {
          $thumbTrackerPrev.click();
          browser.sleep(500).then(function() {
            expect($thumbnailWrapper.getCssValue('margin-left')).toBe('-320px');
            expect($thumbTracker.getText()).toBe('3');
          });
        });
        
        // Navigate back to the 1st thumb and verify transition
        browser.sleep(0).then(function() {
          $thumbTrackerPrev.click();
          browser.sleep(500).then(function() {
            expect($thumbTracker.getText()).toBe('2');
            $thumbTrackerPrev.click();
            browser.sleep(500).then(function() {
              expect($thumbnailWrapper.getCssValue('margin-left')).toBe('0px');
              expect($thumbTracker.getText()).toBe('1');
            });
          });
        });
      });
    });

    describe('should able to navigate using thumbs', function() {
      $thumbTrackerButtons.then(function(thumbTrackerButtons) {
        $thumbTracker = thumbTrackerButtons[1];
        
        expect($thumbTracker.getText()).toBe('1');
        
        // Click 2nd and 3rd thumbs
        $thumbs.then(function(thumbs) {
          thumbs[1].click();
          expect($thumbTracker.getText()).toBe('2');
          expect($thumbnailWrapper.getCssValue('margin-left')).toBe('0px');
          thumbs[2].click();
          expect($thumbnailWrapper.getCssValue('margin-left')).toBe('0px');
          expect($thumbTracker.getText()).toBe('3');
        });
      });
    });
  });
});