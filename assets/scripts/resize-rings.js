$( document ).ready(function() {

  function resizeRings(width, height){
    alert(width);
  }

  $('#longWide').on('click', function(){
    resizeRings(100,100)
  });

});