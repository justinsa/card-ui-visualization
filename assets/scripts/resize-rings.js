$( document ).ready(function() {

  function resizeRings(width, height){
    $('.card-ring').css({'height': height, 'width': width});
    $('.card-ring').each(function() { window['card-ui-visualizations']['card-ring'](this); });
  }

  $('#longWide').on('click', function(){
    resizeRings(300, 300)
  });

});