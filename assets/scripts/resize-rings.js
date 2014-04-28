'use-strict';
window.resizeRings = function (width, height) {
  var cardRingDivs = document.getElementsByClassName('card-ring');
  _.each(cardRingDivs, function(div) {
    while (div.hasChildNodes()) {
      div.removeChild(div.lastChild);
    }
  });
  $('.card-ring').css({'height': height, 'width': width});
  $('.card-ring').each(function() { window['card-ui-visualizations']['card-ring'](this); });
};
