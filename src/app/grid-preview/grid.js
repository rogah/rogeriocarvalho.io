var $ = require('jquery'),
  preview = require('./preview');

module.exports = (function () {

  var $grid = null,
    $items = null,
    $window = null,
    windowSize = null,
    currentIndex = -1,
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
      $item.data('height', $item.height())
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
    currentIndex = previewItem.getIndex();
    previewItem.expand(windowSize);
  }

  function collapse($item) {
    var previewItem = preview.create($item, settings);
    previewItem.collapse();
    currentIndex = -1;
  }

  return {
    init: init
  };
})();
