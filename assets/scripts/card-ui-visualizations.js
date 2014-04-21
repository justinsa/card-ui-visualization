'use-strict';
/****************************************************************************
* Card UI Visualizations v0.0.1
* Justin W. Saunders (github: justinsa)
* License: Apache License Version 2.0, January 2004 (http://www.apache.org/licenses/)
* 
* Data Set Object Format:
*   {
*     "type": ["class", ...],
*     "img-uri": "uri/to/img/src",
*     "title": "object title",
*     "html-description": "descriptive content"
*   }
* Value Description:
*   "type" :=
*     There is only one value that has a special meaning in the type array: "add".
*     "add" is used internally to specify Add button placement in the visualization.
*     You can use this to your advantage if you want to specify Add button placement.
*     All values in the type array are appended to the class attribute of the mark-up.
*   "img-uri" :=
*     This is the location of the image source for the card. The value is directly set
*     as the src attribute of the img tag.
*   "title" :=
*     This is the title for the card. The value is used as the alt attribute of the img
*     tag and as the header of the element's popover.
*   "html-description" :=
*     This is an unsafe HTML description for the card. The value is presented as the
*     body of the element's popover.
*
****************************************************************************/
window['card-ui-visualizations'] = {
  'card-block': function (element) {
    var $block = $(element);
    var options = {
      'add-click-callback': $block.attr('data-add-click-callback'),
      'add-count': $block.attr('data-add-count') ? parseInt($block.attr('data-add-count')) : null,
      'dynamic-wrapping': $block.hasClass('dynamic-wrapping'),
      'row-fill': $block.hasClass('row-fill'),
      'row-size': $block.attr('data-row-size') ? parseInt($block.attr('data-row-size')) : 10,
      'stack': $block.hasClass('stack'),
      'stack-card-offset': $block.attr('data-stack-card-offset') ? parseInt($block.attr('data-stack-card-offset')) : 0,
      'stack-descend': $block.hasClass('stack-descend'),
      'data': $block.attr('data-set')
    };
    if (options.data === undefined) {
      // no data set provided ergo nothing to display
      return;
    }
    if (options['add-click-callback'] === undefined) {
      options['add-click-callback'] = _.identity;
    }
    // argument precedence
    // dynamic-wrapping and stack are not compatible settings - stack takes precedence
    if (options['stack'] === true) {
      options['dynamic-wrapping'] = false;
    }
    // dynamic-wrapping is not compatible with row-fill and row-size settings - dynamic-wrapping takes precendence
    if (options['dynamic-wrapping'] === true) {
      options['row-fill'] = false;
      options['row-size'] = null;
    }
   
    // create shallow copy of array
    options.data = _.clone(window[options.data]);
    options['original-data-length'] = options.data.length;

    // add Add objects to array
    var counter = 1;
    if (options['dynamic-wrapping'] || options['add-count'] !== null) {
      counter = (options['add-count'] == null) ? 1 : options['add-count'];
    } else if (options['row-fill'] === true) {
      counter = options['row-size'] - (options['original-data-length'] % options['row-size']);
      if (counter <= 0) {
        counter = 1;
      }
    }
    for (var i = 0; i < counter; ++i) {
      options.data.push({ "type":["add"] });
    }
    options['data-length'] = options.data.length;

    // generate mark-up
    // set initial container to block for dynamic-wrapping case
    var $container = $block;
    _.each(options.data, function (element, index) {
      if (!options['dynamic-wrapping'] && (index % options['row-size'] === 0)) {
        $container = $('<div>', { class: 'card-block-row' });
        $block.append($container);
        if (options['stack'] === true) {
          $block.append($('<div>', { class: 'clearfix' }));
        }
      }
      element['type'].push('card');
      if (options['stack-descend'] === true) {
        element['type'].push('descend');
      }
      var $node = null;
      if (_.contains(element.type, 'add')) {
        // Add button
        $node = $('<button>', { class: element['type'].join(' ') });
        $node.click(function (event) {
          window[options['add-click-callback']]($node);
        });
      } else {
        // data node
        $node = $('<img>', { class: element['type'].join(' '), src: element['img-uri'], alt: element['title'] });
        if (element['title'] && element['html-description']) {
          // add Bootstrap popover if there is a description provided
          $node.popover({
            animation: true,
            content: element['html-description'],
            html: true,
            placement: 'auto',
            title: element['title'],
            trigger: 'hover'
          });
        }
      }
      if (options['stack'] === true) {
        if (options['stack-descend'] === false) {
          $node.attr('style', _.str.sprintf('left: %dpx;', (options['stack-card-offset'] * index)));
        } else {
          $node.attr('style', _.str.sprintf('left: %dpx; z-index: %d', (options['stack-card-offset'] * index), (options['data-length'] - 1 - index)));
        }
      }
      $container.append($node);
    });
  },

  'card-ring': function (element) {
    $ring = $(element);
    var options = {
      'add-click-callback': $ring.attr('data-add-click-callback'),
      'add-count': $ring.attr('data-add-count') ? parseInt($ring.attr('data-add-count')) : 1,
      'clockwise': $ring.hasClass('clockwise'),
      'ring-fill': $ring.hasClass('ring-fill'),
      'ring-size': $ring.attr('data-ring-size') ? parseInt($ring.attr('data-ring-size')) : 0,
      'data': $ring.attr('data-set')
    };
    if (options['add-click-callback'] === undefined) {
      options['add-click-callback'] = _.identity;
    }

    // create shallow copy of array
    options.data = _.clone(window[options.data]);
    options['original-data-length'] = options.data.length;

    // add Add objects to array
    var counter = options['add-count'];
    if (options['ring-fill'] === true) {
      counter = options['ring-size'] - options['original-data-length'] % options['ring-size'];
    }
    for (var i = 0; i < counter; ++i) {
      options.data.push({ "type":["add"] });
    }
    options['data-length'] = options.data.length;

    if (options['ring-size'] <= 0) {
      options['ring-size'] = options['data-length'];
    }

    // CHANGE: VALUE MUST ALSO FACTOR IN HEIGHT
    var radius = $ring.innerWidth() / 2;
    var theta = (options['clockwise'] === true ? 1 : -1) * 2 * Math.PI / options['ring-size'];
    var thetaOffset = -(Math.PI / 2);

    // generate mark-up
    _.each(options.data, function (element, index) {
      element['type'].push('card');
      var $node = null;
      if (_.contains(element.type, 'add')) {
        // Add button
        $node = $('<button>', { class: element['type'].join(' ') });
        $node.click(function (event) {
          window[options['add-click-callback']]($node);
        });
      } else {
        // data node
        $node = $('<img>', { class: element['type'].join(' '), src: element['img-uri'], alt: element['title'] });
        if (element['title'] && element['html-description']) {
          // add Bootstrap popover if there is a description provided
          $node.popover({
            animation: true,
            content: element['html-description'],
            html: true,
            placement: 'auto',
            title: element['title'],
            trigger: 'hover'
          });
        }
      }
      $ring.append($node);
      var offset = $node.outerWidth() / 2;
      var x = (radius - offset) + (radius * Math.cos(thetaOffset + (theta * (index + 1))));
      var y = (radius - offset) + (radius * Math.sin(thetaOffset + (theta * (index + 1))));
      $node.css('left', x);
      $node.css('top', y);
    });
  }
};