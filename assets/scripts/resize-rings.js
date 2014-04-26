$( document ).ready(function() {

  function resizeRings(width, height){
    var cardRingDivs = document.getElementsByClassName('card-ring');
    _.each(cardRingDivs, function(div){
      while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
      }
    })
    $('.card-ring').css({'height': height, 'width': width});
    $('.card-ring').each(function() { window['card-ui-visualizations']['card-ring'](this); });
  }

  $('#longWide').on('click', function(){
    resizeRings(440, 320);
  });

  $('#shortWide').on('click', function(){
    resizeRings(410, 350);
  });

  $('#circle').on('click', function(){
    resizeRings(380, 380);
  });

  $('#shortNarrow').on('click', function(){
    resizeRings(350, 410);
  });

  $('#longNarrow').on('click', function(){
    resizeRings(320, 440);
  });

});