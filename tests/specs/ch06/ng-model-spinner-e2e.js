describe('Chapter 6:', function() {
  it('should activate spinner directive', function() {
    browser.get('ch06/ng-model-spinner.html');

    element.all(by.tagName('button')).then(function(btn) {
      var $ratingPlus = btn[0];
      var $rating = btn[1];
      var $ratingMinus = btn[2];      
      // increment rating
      expect($rating.getText()).toBe('1');
      $ratingPlus.click();
      $ratingPlus.click();
      $ratingPlus.click();
      expect($ratingPlus.isEnabled()).toBeTruthy();
      $ratingPlus.click();
      expect($rating.getText()).toBe('5');
      expect($ratingPlus.isEnabled()).toBeFalsy();
      // decrement rating
      $ratingMinus.click();
      $ratingMinus.click();
      $ratingMinus.click();
      expect($ratingMinus.isEnabled()).toBeTruthy();
      $ratingMinus.click();
      expect($rating.getText()).toBe('1');
      expect($ratingMinus.isEnabled()).toBeFalsy();

      var $availPlus = btn[3];
      var $avail = btn[4];
      var $availMinus = btn[5];
      // increment availability
      expect($avail.getText()).toBe('Sun');
      $availPlus.click();
      $availPlus.click();
      $availPlus.click();
      $availPlus.click();
      $availPlus.click();
      expect($availPlus.isEnabled()).toBeTruthy();
      $availPlus.click();
      expect($avail.getText()).toBe('Sat');
      expect($availPlus.isEnabled()).toBeFalsy();
      // decrement availability
      $availMinus.click();
      $availMinus.click();
      $availMinus.click();
      $availMinus.click();
      $availMinus.click();
      expect($availMinus.isEnabled()).toBeTruthy();
      $availMinus.click();
      expect($avail.getText()).toBe('Sun');
      expect($availMinus.isEnabled()).toBeFalsy();
    });
  });
});