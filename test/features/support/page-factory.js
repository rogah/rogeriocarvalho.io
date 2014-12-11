'use strict';

var util = require('./util');

var PageFactory = function (server, browser) {
  this.server = server;
  this.browser = browser;
};

PageFactory.prototype.create = function (pageName) {
  var pageBase = require('./page-base').pageBase,
    page = require('./pages/' + pageName).page;

  return util.mixin(page, pageBase, {
    server: this.server,
    browser: this.browser
  });
};

module.exports.PageFactory = PageFactory;
