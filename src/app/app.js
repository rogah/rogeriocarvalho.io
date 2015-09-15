'use strict';

var $ = require('jquery'),
  angular = require('angular');

require('fastclick');
require('foundation');

$(document).foundation();

$(function () {
  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

angular.module('rogeriocarvalho.io', [])
  .controller('SiteController', function () {})
  .directive('skillChart', require('./components/charts/skill-chart/directive'))
  .directive('skillSet', require('./components/modals/skill-set/directive'));
