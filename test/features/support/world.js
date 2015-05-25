'use strict';

// force the test environment to 'test'
process.env.NODE_ENV = 'test';

var http = require('http'),
  zombie = require('zombie'),
  app = require('../../../src/app');

var PageFactory = require('./page-factory').PageFactory;

require('should');

var World = function World(callback) {

  var browser = new zombie(),
    server = http.createServer(app),
    factory = new PageFactory(server, browser);

  this.browser = browser;

  this.startServer = function (callback) {
    this.server = server.listen(9001, 'localhost', callback);
  };

  this.stopServer = function (callback) {
    this.server.close(callback);
  };

  this.page = function (pageName) {
    return factory.create(pageName);
  };

  callback();
};

exports.World = World;
