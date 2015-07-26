var $ = require('jquery'),
  preview = require('./preview');

module.exports = (function () {

  var $grid = null,
    $items = null,
    $window = null,
    windowSize = null,
    currentIndex = -1,
    currentOffsetTop = -1,
    extraScroll = 0,
    settings = {
      minHeight: 500,
      speed: 350,
      easing: 'ease',
      margin: 10
    };

  function init(grid) {
    $grid = $(grid);

    $items = $grid.children('li');

    $items.each(function () {
      var $item = $(this);
      $item
        .data('offsetTop', $item.offset().top)
        .data('height', $item.outerHeight())
        .on('click', 'skill-chart', function () {
          if (currentIndex === $item.index()) {
            collapse($item);
          } else {
            expand($item);
          }
          return false;
        });
    });

    $window = $(window);

    windowSize = getWindowSize();
  }

  function getWindowSize() {
    return {
      width: $window.width(),
      height: $window.height()
    };
  }

  function expand($item) {
    var previewItem = preview.create($item, settings);

    var index = previewItem.getIndex(),
      offsetTop = previewItem.getOffsetTop();

    if (currentIndex !== index) {
      var $currentItem = $items.eq(currentIndex);
      collapse($currentItem);

      if (offsetTop > currentOffsetTop) {
        extraScroll = $currentItem.outerHeight();
      }
    }

    currentIndex = index;
    currentOffsetTop = offsetTop;

    previewItem.setScroll(0);
    previewItem.expand(windowSize);
  }

  function collapse($item) {
    var previewItem = preview.create($item, settings);
    previewItem.collapse();
    currentIndex = -1;
    currentOffsetTop = -1;
  }

  return {
    init: init
  };
})();
