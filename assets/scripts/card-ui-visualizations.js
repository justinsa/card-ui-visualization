$(function() {
  var CARD_DATA_TEMPLATE = '<img class="%s" src="%s" alt="%s" />';
  var CARD_ADD_TEMPLATE = '<a class="card add" href="%s"></a>';

  $('.card-block').each(function (index, block) {
    var options = {
      'add-count': $(this).attr('add-count') || 1,
      'row-fill': $(this).hasClass('row-fill'),
      'row-size': $(this).attr('data-row-size') || 10,
      'stack': $(this).hasClass('stack'),
      'stack-descend': $(this).hasClass('stack-descend'),
      'data': $(this).attr('data-set')
    };
    if (options.data === undefined) {
      // no data set provided so nothing to display
      return;
    }
    options.data = window[options.data];
    var root = $(this);
  });

  $('.card-ring').each(function (index, ring) {
    var options = {
      'add-count': $(this).attr('add-count') || 1,
      'clockwise': $(this).hasClass('clockwise'),
      'ring-fill': $(this).hasClass('ring-fill'),
      'ring-size': $(this).attr('data-ring-size') || 'dynamic',
      'data': []
    };
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