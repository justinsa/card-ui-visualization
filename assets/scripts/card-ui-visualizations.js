$(function() {
  $('.card-ring').each(function (index, ring) {
    var diameter = $(ring).innerWidth();
    var clockwise = $(ring).hasClass('clockwise');
    var radius = diameter / 2;
    var children = $(ring).children();
    var size = $(ring).attr('data-ring-size');
    var count = size === undefined ? children.length : parseInt(size);
    var theta = (clockwise ? 1 : -1) * 2 * Math.PI / count;
    var thetaOffset = -(Math.PI / 2);
    children.each(function (index, node) {
      var offset = $(node).outerWidth() / 2;
      var x = (radius - offset) + (radius * Math.cos(thetaOffset + (theta * (index + 1))));
      var y = (radius - offset) + (radius * Math.sin(thetaOffset + (theta * (index + 1))));
      $(node).css('left', x);
      $(node).css('top', y);
    });
  });
});