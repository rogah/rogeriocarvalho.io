'use strict';

var homePage = {

  title: 'Rogerio Carvalho',

  path: '/',

  assertContent: function (callback) {
    this.browser.text('body').should.equal('About Rogerio Carvalho.');
    callback();
  }
};

module.exports.page = homePage;
