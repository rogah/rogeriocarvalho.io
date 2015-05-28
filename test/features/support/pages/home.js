'use strict';

var homePage = {

  title: 'Rogerio Carvalho',

  path: '/',

  assertContent: function (callback) {
    this.browser.text('#headline h1').should.equal('rogeriocarvalho');
    callback();
  }
};

module.exports.page = homePage;
