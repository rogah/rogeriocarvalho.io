'use strict';

var homePage = {

  title: 'Rogerio Carvalho',

  path: '/about',

  assertContent: function (callback) {
    this.browser.text('header h1').should.equal('rogeriocarvalho');
    callback();
  }
};

module.exports.page = homePage;
