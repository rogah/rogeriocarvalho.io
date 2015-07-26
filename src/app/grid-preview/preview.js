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

  getOffsetTop: function () {
    return this.$item.offset().top;
  },

  getPreviewOffsetTop: function () {
    return this.$preview.offset().top;
  },

  setScroll: function (value) {
    this.scrollExtra = 0;
  },

  expand: function (windowSize) {
    setTimeout($.proxy(function () {
      this._setHeight(windowSize);
      this._scrollPosition(windowSize);
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
    this.height = $item.height();
    this.previewHeight = $preview.height();
    this.scrollExtra = 0;
    this._setupTransition();
  },

  _setupTransition: function () {
    this.$preview.css('transition', 'height ' + this.settings.speed + 'ms ' + this.settings.easing);
    this.$item.css('transition', 'height ' + this.settings.speed + 'ms ' + this.settings.easing);
  },

  _setHeight: function (windowSize) {
    this._calculateHeights(windowSize);
    this.$preview.css('height', this.previewHeight);
    this.$item.css('height', this.height);
  },

  _calculateHeights: function (windowSize) {
    var heightPreview = windowSize.height - this.$item.data('height') - this.settings.margin,
      itemHeight = windowSize.height;

    if (heightPreview < this.settings.minHeight) {
      heightPreview = this.settings.minHeight;
      itemHeight = this.settings.minHeight + this.$item.data('height') + this.settings.margin;
    }

    this.previewHeight = heightPreview;
    this.height = itemHeight;
  },

  _resetHeight: function () {
    this.$preview.css('height', 0);
    this.$item.css('height', this.$item.data('height'));
  },

  _scrollPosition: function (windowSize) {
    var offsetTop = this.$item.data('offsetTop'),
      previewOffsetTop = this.getPreviewOffsetTop(),
      scrollTo = 0;

    console.log(this.height);

    if (this.previewHeight + this.$item.data('height') + this.settings.margin <= windowSize.height) {
      scrollTo = offsetTop;
    } else if (this.previewHeight < windowSize.height) {
      scrollTo = (previewOffsetTop - this.scrollExtra) - (windowSize.height - this.previewHeight);
    } else {
      scrollTo = (previewOffsetTop - this.scrollExtra);
    }

    $('html, body').animate({
      scrollTop: scrollTo
    }, this.settings.speed);
  }
};

module.exports = {
  create: function ($item, options) {
    return new Preview($item, options);
  }
};
