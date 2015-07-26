var $ = require('jquery');

function Preview($item, options) {
  this._init(
    $item,
    $item.children('.preview:first'),
    options
  );
}

Preview.prototype = {
  getIndex: function () {
    return this.$item.index();
  },

  expand: function (windowSize) {
    setTimeout($.proxy(function () {
      this._setHeight(windowSize);
      //this.positionPreview();
    }, this), 25);
  },

  collapse: function () {
    setTimeout($.proxy(function () {
      this._resetHeight();
    }, this), 25);
  },

  _init: function ($item, $preview, settings) {
    this.$item = $item;
    this.$preview = $preview;
    this.settings = settings;
    this._setupTransition();
  },

  _setupTransition: function () {
    this.$preview.css('transition', 'height ' + this.settings.speed + 'ms ' + this.settings.easing);
    this.$item.css('transition', 'height ' + this.settings.speed + 'ms ' + this.settings.easing);
  },

  _setHeight: function (windowSize) {
    var heights = this._calculateHeights(windowSize);

    this.$preview.css('height', heights.preview);
    this.$item.css('height', heights.item);
  },

  _calculateHeights: function (windowSize) {
    var heightPreview = windowSize.height - this.$item.data('height') - this.settings.margin,
      itemHeight = windowSize.height;

    if (heightPreview < this.settings.minHeight) {
      heightPreview = this.settings.minHeight;
      itemHeight = this.settings.minHeight + this.$item.data('height') + this.settings.margin;
    }

    return {
      preview: heightPreview,
      item: itemHeight
    };
  },

  _resetHeight: function () {
    this.$preview.css('height', 0);
    this.$item.css('height', this.$item.data('height'));
  }
};

module.exports = {
  create: function ($item, options) {
    return new Preview($item, options);
  }
};
