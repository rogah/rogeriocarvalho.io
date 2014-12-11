'use strict';

module.exports = function () {

  this.Before(function (callback) {
    this.startServer(callback);
  });

  this.After(function (callback) {
    this.stopServer(callback);
  });
};
