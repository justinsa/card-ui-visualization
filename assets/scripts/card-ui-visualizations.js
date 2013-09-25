$(function() {
  var CARD_DATA_TEMPLATE = '<img class="%s" src="%s" alt="%s" />';
  var CARD_ADD_TEMPLATE = '<a class="card add" href="%s"></a>';

  $('.card-block').each(function (index, block) {
    var block = $(this);
    var options = {
      'add-count': block.attr('add-count') ? parseInt(block.attr('add-count')) : 1,
      'row-fill': block.hasClass('row-fill'),
      'row-size': block.attr('data-row-size') ? parseInt(block.attr('data-row-size')) : 10,
      'stack': block.hasClass('stack'),
      'stack-descend': block.hasClass('stack-descend'),
      'data': block.attr('data-set')
    };
    if (options.data === undefined) {
      // no data set provided ergo nothing to display
      return;
    }
    options.data = window[options.data];
    var block = $(this);
    _.each(options.data, function (element) {

    });
  });

  $('.card-ring').each(function (index, ring) {
    ring = $(ring);
    var options = {
      'add-count': ring.attr('add-count') ? parseInt(ring.attr('add-count')) : 1,
      'clockwise': ring.hasClass('clockwise'),
      'ring-fill': ring.hasClass('ring-fill'),
      'ring-size': ring.attr('data-ring-size') ? parseInt(ring.attr('data-ring-size')) : 0,
      'data': ring.attr('data-set')
    };
    var diameter = ring.innerWidth();
    var clockwise = ring.hasClass('clockwise');
    var radius = diameter / 2;
    var children = ring.children();
    var size = ring.attr('data-ring-size');
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