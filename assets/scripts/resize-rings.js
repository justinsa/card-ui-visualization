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
    resizeRings(420, 300);
  });

  $('#shortWide').on('click', function(){
    resizeRings(390, 330);
  });

  $('#circle').on('click', function(){
    resizeRings(360, 360);
  });

  $('#shortNarrow').on('click', function(){
    resizeRings(330, 390);
  });

  $('#longNarrow').on('click', function(){
    resizeRings(300, 420);
  });

});