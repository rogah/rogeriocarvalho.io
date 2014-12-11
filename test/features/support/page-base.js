'use strict';

module.exports.pageBase = {

  visit: function (callback) {
    this.browser.visit('http://' + this.server.address().address + ':' + this.server.address().port + this.path, callback);
  }
};
